import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: [],
};

export const bookmarksSlice = createSlice({
	name: 'bookmarks',
	initialState,
	reducers: {

		/**
		 * Description :
		 * add a bookmark to bookmarks local storage
		 * 
		 * @param {object} state the local storage value
		 * @param {any} action the bookmark that the user wants to add
		 */
		addBookmark: (state, action) => {
			state.value.push(action.payload);
		},

		/**
		 * Description :
		 * delete a bookmark to bookmarks local storage
		 * 
		 * @param {object} state the local storage value
		 * @param {any} action the bookmark that the user wants to delete
		 */
		removeBookmark: (state, action) => {
			state.value = state.value.filter(bookmark => bookmark.title !== action.payload.title);
		},

		/**
		 * Description :
		 * delete all bookmarks to bookmarks local storage
		 * 
		 * @param {object} state the local storage value
		 */
		removeAllBookmark: (state) => {
			state.value = []; // reset the local storage
		},
	},
});

export const { addBookmark, removeBookmark, removeAllBookmark } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
