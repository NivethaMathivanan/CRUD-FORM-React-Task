import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../../Type/type';

import { getAllFail, getAllSuc, postFail, postSuc, deleteFail, deleteSuc,updateSuc,updateFail, getIdSuc, getIdFail } from '../../Action/action';
import { deleteItem, getAll, getItem, postItem, putItem } from '../../../Services/mockApi';

function* getApi() {
    try {
    const res = yield call(getAll);
    if (res.status === 200) {
        yield put(getAllSuc(res.data));
    } else {
        yield put(getAllFail("get failed"));
    }
    } catch (error) {
        yield put(getAllFail(error.message));
    }
}

function* postApi({ payload }) {
    try {
    const res = yield call(postItem, payload);
    if (res.status === 201) {
        yield put(postSuc(res.data));
    } else {
        yield put(postFail("Post request failed"));
    }
    } catch (error) {
        yield put(postFail(error.message));
    }
}
function* deleteApi({ payload }) {
    try {
    const res = yield call(deleteItem, payload);
    if (res.status === 200) {
        yield put(deleteSuc(payload));
    } else {
        yield put(deleteFail("Delete request failed"));
    }
    } catch (error) {
        yield put(deleteFail(error.message));
    }
}
function* getIdApi(action ) {
    try {
        
        const res = yield call(getItem,action.payload);
        if (res.status === 200) {
            yield put(getIdSuc(res.data));
        } else {
            yield put(getIdFail("getId request failed"));
        }
    } catch (error) {
        yield put(getIdFail(error.message));
    }
}
function* updateApi({payload}) {
    try {
       
        const res = yield call(putItem,payload,payload.id);
            // yield put(updateSuc(res));
            if(res.status===200){
                yield put (updateSuc(res.data))
            }else{
                yield put(updateFail("updated fail "))
            }
    }
     catch (error) {
        yield put(updateFail(error.message));
    }
}

export function* StudentWatcherSaga() {
    yield takeLatest(types.GET_ALL_REQ, getApi);
    yield takeLatest(types.POST_REQ, postApi);
    yield takeLatest(types.DELETE_REQ, deleteApi);
    yield takeLatest(types.UPDATE_REQ, updateApi);
    yield takeLatest(types.GET_ID_REQ, getIdApi);
}
