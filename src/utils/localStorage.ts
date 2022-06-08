export function get(key: string) {
  let data = null
  try {
    let lkey = localStorage.getItem(key) || ''
    data = JSON.parse(lkey)
  } catch (e) {
    return null
  }
  return data
}

export function set(key: string, value: string | object) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function clear() {
  localStorage.clear()
}
