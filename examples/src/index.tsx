/*** examples/src/index.js ***/
import React from "react";
import ReactDOM from "react-dom";
import { TextPopconfirm } from "../../src";

const App = () => (
  <div style={{ padding: 100 }}>
    <TextPopconfirm />
  </div>
);
ReactDOM.render(<App />, document.getElementById("root"));
