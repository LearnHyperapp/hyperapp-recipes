import { h, app } from "hyperapp"

const state = {
  todos: [],
  input: ""
}

const actions = {
  add: name => state => ({ todos: state.todos.concat({ name }), input: "" }),
  toggle: id => state => ({
    todos: state.todos.map(
      (t, i) => (i === id ? { name: t.name, done: !t.done } : t)
    )
  }),
  remove: id => state => ({ todos: state.todos.filter((t, i) => i !== id) }),
  input: input => () => ({ input })
}

const Todo = ({ item, id, actions }) => (
  <div class={item.done ? "item done" : "item"}>
    <span onclick={() => actions.toggle(id)}>{item.name}</span>
    <button onclick={() => actions.remove(id)}>-</button>
  </div>
)

const view = (state, actions) => (
  <main>
    <h1>Todo list</h1>
    <input
      type="text"
      class="input"
      value={state.input}
      onkeyup={e => (e.keyCode === 13 ? actions.add(state.input) : "")}
      oninput={e => actions.input(e.target.value)}
      placeholder="Enter item..."
    />
    {state.todos.map((item, id) => Todo({ item, id, actions }))}
  </main>
)

app(state, actions, view, document.body)
