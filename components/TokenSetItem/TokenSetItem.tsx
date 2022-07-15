import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { CheckIcon } from '@radix-ui/react-icons';
import Checkbox from '../Checkbox';
import Box from '../Box';
import IconGrabber from '@/icons/grabber.svg';
import { StyledGrabber } from './StyledGrabber';
import { StyledCheckbox } from './StyledCheckbox';
import { StyledButton } from './StyledButton';
import { StyledWrapper } from './StyledWrapper';
import IconIndeterminateAlt from '../../icons/indeterminate-alt.svg';
import { TreeItem } from '../tokenset';

export type TokenSetItemProps = {
  item: TreeItem;
  isCollapsed?: boolean;
  isActive?: boolean;
  onClick: (item: TreeItem) => void;
  isChecked: boolean | 'indeterminate';
  onCollapse?: (itemPath: string) => void;
  onCheck: (checked: boolean, item: TreeItem) => void;
};

export function TokenSetItem({
  item,
  onClick,
  isActive = false,
  isChecked,
  onCheck,
}: TokenSetItemProps) {
  const tokenSetStatus = 'true';

  const handleClick = useCallback(() => {
    onClick(item);
  }, [item, onClick]);

  // const handleRename = useCallback(() => {
  //   onRename(item.path);
  // }, [item.path, onRename]);

  // const handleDelete = useCallback(() => {
  //   onDelete(item.path);
  // }, [item.path, onDelete]);

  // const handleDuplicate = useCallback(() => {
  //   onDuplicate(item.path);
  // }, [item.path, onDuplicate]);

  // const handleTreatAsSource = useCallback(() => {
  //   onTreatAsSource(item.path);
  // }, [item.path, onTreatAsSource]);

  const handleCheckedChange = useCallback(() => {
    onCheck(!isChecked, item);
  }, [item, isChecked, onCheck]);


  const renderIcon = useCallback((checked: typeof isChecked, fallbackIcon: React.ReactNode) => {
    if (tokenSetStatus === tokenSetStatus) {
      return <IconIndeterminateAlt />;
    }
    return fallbackIcon;
  }, [tokenSetStatus]);

  return (
    <StyledWrapper>
        <StyledButton
          itemType="folder"
          type="button"
          isActive={isActive}
          onClick={handleClick}
        >
          <Box
            css={{
              paddingLeft: `${5 * item.level}px`,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color: '$textMuted',
              fontWeight: '$normal',
              userSelect: 'none',
            }}
          >
            {item.label}
          </Box>
        </StyledButton>
      <StyledCheckbox checked={isChecked}>
        <Checkbox
          id={item.path}
          checked={isChecked}
          renderIcon={renderIcon}
          onCheckedChange={handleCheckedChange}
        />
      </StyledCheckbox>
    </StyledWrapper>
  );
}
