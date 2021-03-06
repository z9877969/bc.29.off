import { configureStore, combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterReducer";
import stepReducer from "./step/stepSlice";
import todos from "./todo/todoReducer";
import filter from "./filter/filterReducer";
import userReducer from "./user/userReducer";
import lang from './lang/langSlice';

const middlewareTransformTodosObj = (store) => (next) => (action) => {
  if (action.type === "getTodosSuccess") {
    const payload = Object.entries(action.payload).map(([id, data]) => ({
      ...data,
      id,
    }));
    action.payload = payload;
  }
  next(action);
};

const rootReducer = combineReducers({
  user: userReducer,
  counter: counterReducer,
  step: stepReducer,
  todos,
  filter,
  lang
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewareTransformTodosObj),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
