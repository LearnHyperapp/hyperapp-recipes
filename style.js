import { h, app } from "hyperapp"

const state = {
  count: 0
}

const actions = {
  down: () => state => ({ count: state.count - 1 }),
  up: () => state => ({ count: state.count + 1 })
}

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
}

const countStyle = {
  color: "#00caff",
  margin: 0,

  "font-weight": 100,
  "font-size": "8em"
}

const buttonStyle = {
  background: "#111",
  "border-radius": "0px",
  border: "1px solid #00caff",
  color: "#00caff",

  "font-size": "2em",
  "font-weight": 100,

  margin: "2rem",

  outline: "none",
  padding: "5px 15px"
}

const view = (state, actions) => (
  <main style={mainStyle}>
    <button style={buttonStyle} onclick={actions.down}>
      -
    </button>
    <h1 style={countStyle}>{state.count}</h1>
    <button style={buttonStyle} onclick={actions.up}>
      +
    </button>
  </main>
)

const main = app(state, actions, view, document.body)
