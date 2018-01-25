import { h, app } from "hyperapp";

const state = {
  count: 0
};

const actions = {
  down: () => state => ({ count: state.count - 1 }),
  up: () => state => ({ count: state.count + 1 })
};

// logs the state before each render
const view = (state, actions) =>
  console.log(state) && (
    <main>
      <h1>{state.count}</h1>
      <button onclick={actions.down}>-</button>
      <button onclick={actions.up}>+</button>
    </main>
  );

const main = app(state, actions, view, document.body);
