import { StrictMode } from "react";
import ReactDOM from "react-dom";

import TaskTracker from "./TaskTracker";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <TaskTracker />
  </StrictMode>,
  rootElement
);
