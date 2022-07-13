import React from "react";
import { TokenTypes } from "../constants/TokenTypes";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./DropdownMenu";
import { Flex } from "./Flex";
import Text  from './Text';
import TreeItem from "./TreeItem";
import { styled } from "../stitches.config";
import IconToggleableDisclosure from "./IconToggleableDisclosure";
import Box from "./Box";
import Heading from "./Heading";
import TokenSetList from './TokenSetList';

const ThemeDropdownLabel = styled(Text, {
  marginRight: '$2',
});

export default function Theme(){
  return (
    <Box css={{ justifyContent: 'space-between', alignItems: 'center', width: '200px' }}>
      <Heading muted size="small">Theme</Heading>
      <Flex alignItems="center" css={{ flexShrink: 0 }}>
        <DropdownMenu>
          <DropdownMenuTrigger data-cy="themeselector-dropdown">
            <Flex>
              <ThemeDropdownLabel size="small">Light</ThemeDropdownLabel>
              <IconToggleableDisclosure />
            </Flex>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" css={{ minWidth: '180px' }}>
            <DropdownMenuRadioGroup >
              <DropdownMenuRadioItem value="" disabled={false}>
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
      <TokenSetList />
    </Box>
  )
}