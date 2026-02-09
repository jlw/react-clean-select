export const debounce = (fn, delay = 0) => {
  let timerId

  return (...args) => {
    if (timerId) {
      clearTimeout(timerId)
    }
    timerId = setTimeout(() => {
      fn(...args)
      timerId = null
    }, delay)
  }
}

export const getByPath = (object, path) => {
  if (!path) {
    return
  }

  return path.split('.').reduce((acc, value) => acc[value], object)
}

export const getOptionSlug = (option, props) => {
  const value = getByPath(option, props.valueField)

  return String(value).replaceAll(/[^a-zA-Z0-9]/g, '-')
}

export const getProp = (object, path, defaultValue) => {
  if (!path) {
    return object
  }

  const normalizedPath = Array.isArray(path) ? path : path.split('.').filter((option) => option.length)

  if (!normalizedPath.length) {
    return object === undefined ? defaultValue : object
  }

  return getProp(object[normalizedPath.shift()], normalizedPath, defaultValue)
}

export const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b)

export const isomorphicWindow = () => {
  if (typeof window === 'undefined') {
    global.window = {}
  }

  return window
}

export const valueExistInSelected = (value, values, props) =>
  !!values.find((val) => getByPath(val, props.valueField) === value || getByPath(val, props.labelField) === value)
