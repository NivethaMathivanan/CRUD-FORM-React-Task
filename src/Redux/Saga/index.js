import { all } from "redux-saga/effects";
import { StudentWatcherSaga } from "./ComponentSaga/ComponentSaga";

function* rootSaga() {
    // console.log("rootSaga");
    yield all([StudentWatcherSaga()])

}
export default rootSaga;