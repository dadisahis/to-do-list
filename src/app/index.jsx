import { store } from "./store/index";

import React from "react";
import ReactDom from "react-dom";
import { Main } from "./components/Main";

ReactDom.render(<Main />, document.getElementById("app"));
