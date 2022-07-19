import React, { useState, useEffect, MouseEvent, useCallback } from "react";
import { Provider, useSelector, useDispatch } from 'react-redux';

import NodeFlower from "./NodeFlower";
import { updateActiveTheme, updateAvailableThemes, updateUsedTokenSet } from "../store/themeTokenSetState";
import Theme from "./Theme";

export type HomeProps = {
  tokenArray: any;
  activeTheme: string;
  availableThemes: string;
  usedTokenSet: object;
}

export default function Home({
  tokenArray,
  activeTheme,
  availableThemes,
  usedTokenSet,
}: HomeProps) {
  const dispatch = useDispatch();
  console.log('availableThemes', availableThemes, activeTheme);
  let themes;
  if(availableThemes === ''){
    themes = availableThemes.split('');
  } else {
    themes = availableThemes.split('---').map(theme => {
      return JSON.parse(theme);
    });
  }
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
