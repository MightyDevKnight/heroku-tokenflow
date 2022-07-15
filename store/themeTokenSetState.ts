import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeTokenSetState {
  activeTheme: string,
  availableThemes: AvailableTheme[],
  usedTokenSet: object,
	activeTokenSet: string,
	collapsedTokenSets: string[],
}
interface AvailableTheme {
	value: string,
	label: string,
}

const initialState: ThemeTokenSetState = {
	activeTheme: null,
	availableThemes: [{
		value: '',
		label: '',
	}],
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
    updateAvailableThemes(state, action: PayloadAction<{availableThemes: AvailableTheme[]}>) {
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