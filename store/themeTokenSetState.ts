import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeTokenSetState {
  activeTheme: string,
  availableThemes: object[],
  usedTokenSet: object,
	activeTokenSet: string,
	collapsedTokenSets: string[],
}

const initialState: ThemeTokenSetState = {
	activeTheme: null,
	availableThemes: [],
	usedTokenSet: {
		global: 'disabled',
	},
	activeTokenSet: "",
	collapsedTokenSets: []
}

const themeTokenSetState = createSlice({
	name: 'ThemeTokenSetState',
	initialState: initialState,
	reducers: {
		updateActiveTheme(state, action: PayloadAction<{activeTheme: string}>) {
			state.activeTheme = action.payload.activeTheme;
		},
    updateAvailableThemes(state, action: PayloadAction<{availableThemes: object[]}>) {
			state.availableThemes = action.payload.availableThemes;
		},
    updateUsedTokenSet(state, action: PayloadAction<{usedTokenSet: object}>) {
			state.usedTokenSet = action.payload.usedTokenSet;
		},
		updateActiveTokenSet(state, action: PayloadAction<{activeTokenSet: string}>){
			state.activeTokenSet = action.payload.activeTokenSet;
		},
		updateCollapsedTokenSets(state, action: PayloadAction<{collapsedTokenSet: string[]}>){
			state.collapsedTokenSets = action.payload.collapsedTokenSet;
		}
	},
})

export const {
	updateActiveTheme,
  updateAvailableThemes,
  updateUsedTokenSet,
	updateActiveTokenSet,
	updateCollapsedTokenSets,
} = themeTokenSetState.actions;
export default themeTokenSetState;