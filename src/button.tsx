import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";

export default singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Button
});

export function Button(props) {
  return <button>Extension magic!</button>;
}
