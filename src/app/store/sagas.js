import { take, put, select } from "redux-saga/effects";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { history } from "./history";

import * as mutations from "./mutations";

const url = "http://localhost:8888";

export function* taskCreationSaga() {
  while (true) {
    const { groupID } = yield take(mutations.REQUEST_TASK_CREATION);
    const ownerID = "U1";
    const taskID = uuid();
    yield put(mutations.createTask(taskID, groupID, ownerID));
    const { res } = yield axios.post(url + `/task/new`, {
      task: {
        id: taskID,
        group: groupID,
        owner: ownerID,
        isComplete: false,
        name: "new task",
      },
    });

    console.info("Got Group ID ", groupID);
  }
}

export function* taskModificationSaga() {
  while (true) {
    const task = yield take([
      mutations.SET_TASK_COMPLETE,
      mutations.SET_TASK_GROUP,
      mutations.SET_TASK_NAME,
    ]);
    axios.post(url + `/task/update`, {
      task: {
        id: task.taskID,
        group: task.groupID,
        name: task.name,
        isComplete: task.isComplete,
      },
    });
  }
}

export function* userAuthenticationSaga() {
  while (true) {
    const { username, password } = yield take(
      mutations.REQUEST_AUTHENTICATE_USER
    );
    try {
      const { data } = yield axios.post(url + "/authenticate", {
        username,
        password,
      });
      console.log(data);
      if (!data) {
        throw new Error();
      }
      console.log("Authenticated", data);
      yield put(mutations.setState(data.state));
      yield put(mutations.processstAuthenticateUser(mutations.AUTHENTICATED));
      history.push("/dashboard");
    } catch (e) {
      console.log("Cant authenticate");
      yield put(
        mutations.processstAuthenticateUser(mutations.NOT_AUTHENTICATED)
      );
    }
  }
}
