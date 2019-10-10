/*** examples/src/index.js ***/
import React from "react";
import { render } from "react-dom";
import { Demo1, Demo2 } from "../../src";
const App = () => (
  <div>
    <Demo1 />
    <Demo2 />
  </div>
);
render(<App />, document.getElementById("root"));
