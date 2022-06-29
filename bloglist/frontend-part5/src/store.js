import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
const store = configureStore({
  reducer: {
    // blogs: blogReducer,
    notification: notificationReducer,
  },
});

export default store;
