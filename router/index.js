import { h, app } from "hyperapp"

import { create, listen, Link, replace, Routes } from "./router"
import "./index.css"

const router = create()

const state = {
  router: router.state,
  users: {}
}

const actions = {
  router: router.actions,
  users: {
    set: user => ({ [user.id]: user }),
    fetch: id => (state, actions) => {
      if (state[id]) {
        return
      }

      // simulate fetching from a database
      setTimeout(() => {
        actions.set({ id, name: "User " + id })
      }, 1000)

      return { [id]: { loading: true } }
    }
  },
  init: () => (_, actions) => {
    listen("/users/:id", ({ params }) => {
      if (params.id) {
        actions.users.fetch(params.id)
      }
    })

    actions.router.init()
  }
}

const User = ({ state, match: { params } }) => {
  const user = state.users[params.id]
  if (!user || user.loading) {
    return (
      <div>
        <h1>Current location: {state.router.location}</h1>
        <div>Loading...</div>
        <Link href="/" class="back">
          Back
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h1>Current location: {state.router.location}</h1>
      <h2>User ID {params.id}</h2>
      <div>Name: {user.name}</div>
      <Link href="/" class="back">
        Back
      </Link>
    </div>
  )
}

const Index = ({ state, actions }) => (
  <div>
    <h1>Current location: {state.router.location}</h1>
    <h2>Users</h2>
    <ul>
      <li>
        <Link href="/users/1">User 1</Link>
      </li>
      <li>
        <Link href="/users/2">User 2</Link>
      </li>
      <li>
        <Link href="/does/not/exist">Link with error</Link>
      </li>
    </ul>
  </div>
)

const Error404 = ({ match }) => (
  <div>
    <h1>Current location: {state.router.location}</h1>
    <h2>404: no page found!</h2>
    <Link href="/" class="back">
      Back
    </Link>
  </div>
)

const view = (state, actions) =>
  Routes({
    state,
    actions,
    routes: [
      { path: "/users/:id", view: User },
      { path: "/", view: Index, exact: true },
      { path: "*", view: Error404 }
    ]
  })

app(state, actions, view, document.body).init()
