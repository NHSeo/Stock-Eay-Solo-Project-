import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchItems() {
  try {
    const response = yield axios.get('/api/items');
    yield put({ type: 'SET_ITEMS', payload: response.data });
  } catch (error) {
    console.error('Fetch items failed', error);
  }
}

function* addItem(action) {
  try {
    yield axios.post('/api/items', action.payload);
    yield put({ type: 'FETCH_ITEMS' });
  } catch (error) {
    console.error('Add item failed', error);
  }
}

function* editItem(action) {
    try {
      yield axios.put(`/api/items/${action.payload.id}`, action.payload);
      yield put({ type: 'FETCH_ITEMS' });
    } catch (error) {
      console.error('Edit item failed', error);
    }
  }

function* deleteItem(action) {
  try {
    yield axios.delete(`/api/items/${action.payload}`);
    yield put({ type: 'FETCH_ITEMS' });
  } catch (error) {
    console.error('Delete item failed', error);
  }
}

function* itemsSaga() {
  yield takeLatest('FETCH_ITEMS', fetchItems);
  yield takeLatest('ADD_ITEM', addItem);
  yield takeLatest('DELETE_ITEM', deleteItem);
  yield takeLatest('EDIT_ITEM', editItem);
}

export default itemsSaga;
