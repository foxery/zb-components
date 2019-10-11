/*** examples/src/index.js ***/
import React from "react";
import { render } from "react-dom";
import { TextPopconfirm } from "../../src";

import "antd/dist/antd.css";

const App = () => (
  <div style={{ padding: 50 }}>
    <TextPopconfirm />
  </div>
);
render(<App />, document.getElementById("root"));
