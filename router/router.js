import { h } from "hyperapp"

/**
 * Utilities
 */

function clearSlashes(path) {
  return path.substring(
    path.startsWith("/") ? 1 : 0,
    path.length - (path.endsWith("/") ? 1 : 0)
  )
}

function getMatch(location, path, exact) {
  const params = {}
  if (location === path) {
    return { location, path, params }
  }

  if (path === "*") {
    return { location, path, params }
  }

  const locations = clearSlashes(location).split("/")
  const paths = clearSlashes(path).split("/")

  if (
    paths.length > locations.length ||
    (exact && paths.length < locations.length)
  ) {
    return null
  }

  for (let i = 0; i < paths.length; i++) {
    const segment = paths[i]
    const loc = locations[i]
    if (segment.startsWith(":")) {
      params[segment.substring(1)] = loc
    } else if (segment !== "*" && segment !== loc) {
      return null
    }
  }

  return { location, path, params }
}

const LISTENERS = []

/**
 * Exports
 */

export function create() {
  return {
    state: {
      location: null
    },
    actions: {
      update: () => ({ location: window.location.pathname }),
      init: () => (_, actions) => {
        LISTENERS.push(actions.update)
        return { location: window.location.pathname }
      }
    }
  }
}

export function push(url) {
  history.pushState(null, null, url)
  LISTENERS.forEach(u => u())
}

export function pop() {
  history.popState()
  LISTENERS.forEach(u => u())
}

export function replace(url) {
  history.replaceState(null, null, url)
  LISTENERS.forEach(u => u())
}

export function listen(path, listener, exact) {
  LISTENERS.push(() => {
    const result = getMatch(window.location.pathname, path, exact)
    if (result) {
      listener(result)
    }
  })
}

export function Link(props, children) {
  if (!props.onclick) {
    props.onclick = e => {
      e.preventDefault()
      push(props.href)
    }
  }
  return h("a", props, children)
}

export function Routes(props) {
  const { routes, ...rest } = props
  return routes.reduce((prev, next) => {
    if (prev) {
      return prev
    }
    const match = getMatch(location.pathname, next.path, next.exact)
    return match ? next.view({ ...rest, match }) : null
  }, null)
}
