import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Book, BookCollectionState, Profile } from "../../../../types";
import { getProfile } from "../services/authService";
import { addBookToCollection, removeBookFromCollection } from '../services/bookCollService';
import { deleteABook } from "./bookReducer";

const initialState: BookCollectionState = {
  bookCollection: []
}

export const deleteBookThunk = createAsyncThunk(
  'deleteBook/removeBookFromCollection',
  async (bookId: string, { dispatch }) => {
    await dispatch(deleteABook(bookId));
    return bookId;
  }
);

const bookCollectionSlice = createSlice({
  name: 'bookCollection',
  initialState,
  reducers: {
    setBookCollection: (state, action) => {
      state.bookCollection = action.payload
    },
    updateBookCollection: (state, action) => {
      const { book, actionType } = action.payload;
      if (actionType === 'add') {
        state.bookCollection = book.bookCollection;
      } else if (actionType === 'remove') {
        state.bookCollection = state.bookCollection.filter(b => b._id !== book._id);
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(deleteBookThunk.fulfilled, (state, action: { payload: string }) => {
      const bookId = action.payload;
      state.bookCollection = state.bookCollection.filter(book => book._id !== bookId);
    });
  }
})

export const { setBookCollection, updateBookCollection } = bookCollectionSlice.actions


export const fetchBookCollection = () => {
  return async (dispatch: (action: { type: string; payload: Book[] }) => void) => {
    try {
      const profile: Profile = await getProfile()
      const bookCollection = profile.bookCollection || []
      dispatch(setBookCollection(bookCollection))
    } catch (error) {
      console.error('Error fetching book collection:', error)
      throw error
    }
  }
}

export const addABookToCollection = (bookId: string) => {
  return async (dispatch: (action: { type: string; payload: string }) => void) => {
    try {
      const book = await addBookToCollection(bookId)
      dispatch(updateBookCollection({ book, actionType: 'add' }))
    } catch (error) {
      console.error('Error adding book to collection:', error)
      throw error
    }
  }
}

export const removeABookFromCollection = (bookId: string) => {
  return async (dispatch: (action: { type: string; payload: string }) => void) => {
    try {
      const book = await removeBookFromCollection(bookId)
      dispatch(updateBookCollection({ book, actionType: 'remove' }))
    } catch (error) {
      console.error('Error removing book from collection:', error)
      throw error
    }
  }
}

export default bookCollectionSlice.reducer