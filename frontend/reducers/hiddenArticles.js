import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value: [],
}

export const hiddenArticleSlice = createSlice({
	name: 'hiddenArticles',
	initialState,
	reducers: {

		/**
		 * Description :
		 * hide an article
		 * 
		 * @param {object} state the local storage value
		 * @param {any} action the article that the user wants to hide
		 */
		addTabArticle: (state, action) => {
			state.value.push(action.payload); // add an article to hide local storage
		},
	},
});

export const { addTabArticle} = hiddenArticleSlice.actions;
export default hiddenArticleSlice.reducer;
