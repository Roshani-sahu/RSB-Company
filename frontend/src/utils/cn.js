const flatten = (input) => {
  if (!input) {
    return []
  }

  if (typeof input === 'string') {
    return [input]
  }

  if (Array.isArray(input)) {
    return input.flatMap((item) => flatten(item))
  }

  if (typeof input === 'object') {
    return Object.entries(input)
      .filter(([, value]) => Boolean(value))
      .map(([key]) => key)
  }

  return []
}

export const cn = (...inputs) => flatten(inputs).join(' ').trim()
