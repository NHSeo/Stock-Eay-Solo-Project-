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

function* increaseItemQuantity(action) {
    try {
        yield axios.put(`/api/items/increase/${action.payload}`);
        yield put({ type: 'FETCH_ITEMS' });
    } catch (error) {
        console.error('Increase item quantity failed', error);
    }
}

function* decreaseItemQuantity(action) {
    try {
        yield axios.put(`/api/items/decrease/${action.payload}`);
        yield put({ type: 'FETCH_ITEMS' });
    } catch (error) {
        console.error('Decrease item quantity failed', error);
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

function* updateItemSaga(action) {
    try {
        if (action.payload.quantityChange > 0) {
            yield put({ type: 'INCREASE_ITEM_QUANTITY', payload: action.payload.id });
        } else if (action.payload.quantityChange < 0) {
            yield put({ type: 'DECREASE_ITEM_QUANTITY', payload: action.payload.id });
        }
        yield put({ type: 'FETCH_ITEMS' });
    } catch (error) {
        console.error('Failed to update item:', error);
    }
}

function* itemsSaga() {
    yield takeLatest('FETCH_ITEMS', fetchItems);
    yield takeLatest('INCREASE_ITEM_QUANTITY', increaseItemQuantity);
    yield takeLatest('DECREASE_ITEM_QUANTITY', decreaseItemQuantity);
    yield takeLatest('ADD_ITEM', addItem);
    yield takeLatest('DELETE_ITEM', deleteItem);
    yield takeLatest('EDIT_ITEM', editItem);
    yield takeLatest('UPDATE_ITEM', updateItemSaga);
}

export default itemsSaga;
