import React, { useCallback, useEffect } from 'react';
import compact from 'just-compact';
import { useDispatch, useSelector } from 'react-redux';
import {
  Reorder, useDragControls, useMotionValue,
} from 'framer-motion';
import Box from './Box';
import { Dispatch } from '../store';
import { TokenSetItem } from './TokenSetItem';
import { TokenSetStatus } from '../constants/TokenSetStatus';
import { TokenSetListOrTree } from './TokenSetListOrTree';
import { useRaisedShadow } from './use-raised-shadow';
import { tokenSetListToList, TreeItem } from '../utils/tokenset';
import { updateActiveTheme, updateAvailableThemes, updateUsedTokenSet } from "../store/themeTokenSetState";

type ExtendedTreeItem = TreeItem & {
  tokenSets: string[];
};
type TreeRenderFunction = (props: React.PropsWithChildren<{
  item: ExtendedTreeItem
}>) => React.ReactNode;
type Props = {
  tokenSets: string[];
};

function TokenSetListItem({ item, children }: Parameters<TreeRenderFunction>[0]) {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const controls = useDragControls();
  const editProhibited = useSelector(editProhibitedSelector);
  const contextValue = React.useMemo(() => ({ controls }), [controls]);

  return (
      <DragControlsContext.Provider value={contextValue}>
        <Reorder.Item
          dragListener={false}
          dragControls={controls}
          value={item}
          style={{ boxShadow, y }}
        >
          {children}
        </Reorder.Item>
      </DragControlsContext.Provider>
    )
}

export function TokenSetListItemContent({ item }: Parameters<TreeRenderFunction>[0]) {
  const { confirm } = useConfirm();
  const dragContext = React.useContext(DragControlsContext);
  const activeTokenSet = useSelector(activeTokenSetSelector);
  const usedTokenSet = useSelector(usedTokenSetSelector);
  const editProhibited = useSelector(editProhibitedSelector);
  const hasUnsavedChanges = useSelector(hasUnsavedChangesSelector);
  const dispatch = useDispatch();

  const handleClick = useCallback(async (set: TreeItem) => {
    if (set.isLeaf) {
          dispatch.tokenState.setActiveTokenSet(set.path);
          item.saveScrollPositionSet(activeTokenSet);
        }
  }, [dispatch, item, activeTokenSet]);

  const handleCheckedChange = useCallback((checked: boolean, item: TreeItem) => {
    dispatch.tokenState.toggleUsedTokenSet(item.path);
  }, [dispatch]);

  const handleTreatAsSource = useCallback((tokenSetPath: string) => {
    dispatch.tokenState.toggleTreatAsSource(tokenSetPath);
  }, [dispatch]);

  const handleDragStart = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    dragContext.controls?.start(event);
  }, [dragContext.controls]);

  return (
    <TokenSetItem
      key={item.key}
      isActive={activeTokenSet === item.path}
      onClick={handleClick}
      isChecked={usedTokenSet?.[item.path] === TokenSetStatus.ENABLED || (
        usedTokenSet?.[item.path] === TokenSetStatus.SOURCE ? 'indeterminate' : false
      )}
      item={item}
      onCheck={handleCheckedChange}
      canEdit={!editProhibited}
      canReorder={!editProhibited}
      canDelete={!editProhibited || Object.keys(item.tokenSets).length > 1}
      onRename={item.onRename}
      onDelete={item.onDelete}
      onDuplicate={item.onDuplicate}
      onDragStart={handleDragStart}
      onTreatAsSource={handleTreatAsSource}
    />
  );
}
export default function TokenSetList({
  tokenSets,
  onRename,
  onDelete,
  onReorder,
  onDuplicate,
  saveScrollPositionSet,
}: Props) {
  const [items, setItems] = React.useState(tokenSetListToList(tokenSets));

  const mappedItems = React.useMemo(() => (
    items.map<ExtendedTreeItem>((item) => ({
      ...item,
      tokenSets,
      onRename,
      onDelete,
      onDuplicate,
      saveScrollPositionSet,
    } as unknown as ExtendedTreeItem))
  ), [items, tokenSets, onRename, onDelete, onDuplicate, saveScrollPositionSet]);

  const handleReorder = React.useCallback((reorderedItems: ExtendedTreeItem[]) => {
    const nextItems = compact(
      reorderedItems.map((item) => (
        items.find(({ key }) => item.key === key)
      )),
    );
    onReorder(nextItems.map(({ path }) => path));
    setItems(nextItems);
  }, [items, onReorder]);

  useEffect(() => {
    setItems(tokenSetListToList(tokenSets));
  }, [tokenSets]);

  // TODO: Handle reorder at end doesnt work yet
  return (
    <Box>
      <Reorder.Group axis="y" layoutScroll values={mappedItems} onReorder={handleReorder}>
        <TokenSetListOrTree<ExtendedTreeItem>
          displayType="list"
          items={mappedItems}
          renderItem={TokenSetListItem}
          renderItemContent={TokenSetListItemContent}
        />
      </Reorder.Group>
    </Box>
  );
}
