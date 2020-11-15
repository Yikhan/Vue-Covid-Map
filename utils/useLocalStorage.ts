function parse (str: string): object {
  let value
  try {
    value = JSON.parse(str)
  } catch {
    value = null
  }
  return value
}

function stringify (obj: object): string | null {
  let value
  try {
    value = JSON.stringify(obj)
  } catch {
    value = null
  }
  return value
}

export default function useLocalStorage () {
  function setItem (key: string, value: object) {
    const result: string | null = stringify(value)
    if (result) {
      window.localStorage.setItem(key, result)
    }
  }

  function getItem (key: string): object {
    const value: string | null = window.localStorage.getItem(key)
    let result: object = {}
    if (value) {
      result = parse(value)
    }
    return result
  }

  function removeItem (key: string) {
    if(!key) return
    window.localStorage.removeItem(key)
  }

  return {
    setItem,
    getItem,
    removeItem
  }
}