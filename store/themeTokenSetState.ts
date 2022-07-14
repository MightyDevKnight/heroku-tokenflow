import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeTokenSetState {
  activeTheme: string,
  availableThemes: object[],
  usedTokenSet: object,
}

const initialState: ThemeTokenSetState = {
	activeTheme: null,
  availableThemes: [],
  usedTokenSet: {
    global: 'disabled',
  },
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
	},
})

export const {
	updateActiveTheme,
  updateAvailableThemes,
  updateUsedTokenSet,
} = themeTokenSetState.actions;
export default themeTokenSetState;