import { h, app } from "hyperapp"

import "./index.css"

const createLogger = () => {
  return {
    state: {
      logs: []
    },
    actions: {
      log: message => state => ({
        logs: state.logs.concat("[" + new Date().toUTCString() + "] " + message)
      })
    }
  }
}

const createSlice1 = () => {
  let logger
  return {
    state: {},
    actions: {
      init: dependencies => {
        logger = dependencies.logger
      },
      action1: () => {
        logger.log("slice1.action1()")
      },
      action2: () => {
        logger.log("slice1.action2()")
      }
    }
  }
}

const createSlice2 = () => {
  let logger, slice1
  return {
    state: {},
    actions: {
      init: dependencies => {
        logger = dependencies.logger
        slice1 = dependencies.slice1
      },
      action1: () => {
        slice1.action1()
        logger.log("slice2.action1()")
      },
      action2: () => {
        slice1.action2()
        logger.log("slice2.action2()")
      }
    }
  }
}

const logger = createLogger()
const slice1 = createSlice1()
const slice2 = createSlice2()

const state = {
  logger: logger.state,
  slice1: slice1.state,
  slice2: slice2.state
}

const actions = {
  logger: logger.actions,
  slice1: slice1.actions,
  slice2: slice2.actions,

  // inject all the dependencies between modules/slices
  init: () => (_, actions) => {
    actions.slice1.init(actions)
    actions.slice2.init(actions)
  }
}

const view = (state, actions) => (
  <main>
    <h1>Dependencies between slices</h1>
    <div class="content">
      <h2>Slice 1</h2>
      <div class="buttons">
        <button onclick={actions.slice1.action1}>Action 1</button>
        <button onclick={actions.slice1.action2}>Action 2</button>
      </div>
      <h2>Slice 2</h2>
      <div class="buttons">
        <button onclick={actions.slice2.action1}>Action 1</button>
        <button onclick={actions.slice2.action2}>Action 2</button>
      </div>
      <h2>Log</h2>
      <div class="log">
        {state.logger.logs.map(message => <span>{message}</span>)}
      </div>
    </div>
  </main>
)

app(state, actions, view, document.body).init()
