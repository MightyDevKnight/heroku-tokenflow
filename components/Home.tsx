import React, { useState, useEffect, MouseEvent, useCallback } from "react";
import { Provider, useSelector, useDispatch } from 'react-redux';

import ReactFlow, {
  isEdge,
  addEdge,
  Controls,
  Node,
  FlowElement,
  OnLoadParams,
  Elements,
  SnapGrid,
  Connection,
  Background,
  Edge,
  isNode,
  ReactFlowProvider,
  updateEdge,
  getIncomers,
  getConnectedEdges,
  getOutgoers,
  applyNodeChanges,
  applyEdgeChanges,
} from "react-flow-renderer";

import ColorSelectorNode from "./ColorSelectorNode";
import ParentNode from "./ParentNode";
import GroupNode from "./GroupNode";
import { getFlowData } from "./initialElements";
import Theme from "./Theme";
import store, { RootState } from "../store";
import { ThemeDataTypes } from '../utils/types';
import NodeFlower from "./NodeFlower";
import { updateActiveTheme, updateAvailableThemes, updateUsedTokenSet } from "../store/themeTokenSetState";

export type HomeProps = {
  tokenArray: any;
  activeTheme: string;
  availableThemes: string;
  usedTokenSet: string;
}

export default function Home({
  tokenArray,
  activeTheme,
  availableThemes,
  usedTokenSet,
}: HomeProps) {
  const dispatch = useDispatch();
  const themes = availableThemes.split('---').map(theme => {
    return JSON.parse(theme);
  });
  useEffect(() => {
    dispatch(updateActiveTheme({activeTheme: activeTheme}));
    dispatch(updateAvailableThemes({availableThemes: themes}));
    dispatch(updateUsedTokenSet({usedTokenSet: usedTokenSet}));
  },[activeTheme, dispatch, themes, usedTokenSet]);
  return (
    <>
    <div style={{ display: 'flex'}}>
      <Theme />
      <NodeFlower 
        tokenArray={tokenArray}
      />
    </div>
    </>
  );
}
