import { h, app } from "hyperapp";

const state = {
  count: 0
};

const actions = {
  down: () => state => ({ count: state.count - 1 }),
  up: () => state => ({ count: state.count + 1 })
};

const mainStyle = {
  "background-color": "#111",
  "font-family": "Helvetica Neue, sans-serif",

  height: "100vh",
  margin: 0,
  padding: 0,

  "justify-content": "center",
  "align-items": "center",
  "text-align": "center",

  display: "flex"
};

const countStyle = {
  color: "#00caff",
  margin: 0,

  "font-weight": 100,
  "font-size": "8em"
};

const view = (state, actions) => (
  <main style={mainStyle}>
    <h1 style={countStyle}>{state.count}</h1>
    <button onclick={actions.down}>-</button>
    <button onclick={actions.up}>+</button>
  </main>
);

const main = app(state, actions, view, document.body);
