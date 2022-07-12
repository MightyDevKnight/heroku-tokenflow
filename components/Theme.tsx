import React from "react";
import { TokenTypes } from "../constants/TokenTypes";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./DropdownMenu";
import { Flex } from "./Flex";
import Text  from './Text';
import TreeItem from "./TreeItem";
import { styled } from "../stitches.config";
import IconToggleableDisclosure from "./IconToggleableDisclosure";

const ThemeDropdownLabel = styled(Text, {
  marginRight: '$2',
});

export default function Theme(){
  return (
    <>
    <div>
    <Flex alignItems="center" css={{ flexShrink: 0 }}>
      <DropdownMenu>
        <DropdownMenuTrigger data-cy="themeselector-dropdown">
          <Flex>
          <ThemeDropdownLabel muted size="small">Theme:</ThemeDropdownLabel>
          <Text size="small">Light</Text>
          </Flex>
          <IconToggleableDisclosure />
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" css={{ minWidth: '180px' }}>
          <DropdownMenuRadioGroup >
            <DropdownMenuRadioItem value="" disabled={true}>
              <Text>No themes</Text>
            </DropdownMenuRadioItem>
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
    </div>
    </>
  )
}