import React, { useCallback, useMemo } from "react";
import { TokenTypes } from "../constants/TokenTypes";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuItemIndicator, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./DropdownMenu";
import { Flex } from "./Flex";
import Text  from './Text';
import TreeItem from "./TreeItem";
import { styled } from "../stitches.config";
import IconToggleableDisclosure from "./IconToggleableDisclosure";
import Box from "./Box";
import Heading from "./Heading";
import { CheckIcon } from "@radix-ui/react-icons";

const ThemeDropdownLabel = styled(Text, {
  marginRight: '$2',
});

export type ThemeData = {
  activeTheme: string,
  availableThemes: string,
  usedTokenSet: string,
}

export default function Theme({
  activeTheme,
  availableThemes,
  usedTokenSet,
}: ThemeData){
  
  const themes = availableThemes.split('---').map(theme => {
    return JSON.parse(theme);
  });
  const activeThemeLabel = useMemo(() => {
    if (activeTheme) {
      const themeOption = themes.find(({ value }) => value  === activeTheme);
      return themeOption ? themeOption.label : 'Unknown';
    }
    return 'None';
  }, [activeTheme, themes]);

  // const handleSelectTheme = useCallback((themeId: string) => {
  //   dispatch.tokenState.setActiveTheme((activeTheme === themeId) ? null : themeId);
  // }, [dispatch, activeTheme]);

  const availableThemeOptions = useMemo(() => (
    themes.map(({ label, value }) => {
      // const handleSelect = () => handleSelectTheme(value);

      return (
        <DropdownMenuRadioItem
          key={value}
          value={value}
          data-cy={`themeselector--themeoptions--${value}`}
          // @README we can disable this because we are using Memo for the whole list anyways
          // eslint-disable-next-line react/jsx-no-bind
          // onSelect={handleSelect}
        >
          <DropdownMenuItemIndicator>
            <CheckIcon />
          </DropdownMenuItemIndicator>
          {label}
        </DropdownMenuRadioItem>
      );
    })
  ), [themes]);

  return (
    <Box css={{ justifyContent: 'space-between', alignItems: 'center', width: '200px' }}>
      <Heading muted size="small">Theme</Heading>
      <Flex alignItems="center" css={{ flexShrink: 0 }}>
        <DropdownMenu>
          <DropdownMenuTrigger data-cy="themeselector-dropdown">
            <Flex>
              <ThemeDropdownLabel size="small">{activeThemeLabel}</ThemeDropdownLabel>
              <IconToggleableDisclosure />
            </Flex>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" css={{ minWidth: '180px' }}>
          <DropdownMenuRadioGroup value={activeTheme ?? ''}>
            {themes.length === 0 && (
              <DropdownMenuRadioItem value="" disabled={!activeTheme}>
                <Text>No themes</Text>
              </DropdownMenuRadioItem>
            )}
            {availableThemeOptions}
          </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              css={{
                paddingLeft: '$6', fontSize: '$small', display: 'flex', justifyContent: 'space-between',
              }}
              disabled={false}
            >
              <span>Manage themes</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Flex>
      <div>Types</div>
      <div>
        {Object.values(TokenTypes)?.map((_tokenType) => (
          <TreeItem tokenType={_tokenType} key={_tokenType}/>
        ))}
      </div>
    </Box>
  )
}