export const firstWhere = (items, key, value) => {
  const result = items.filter(item => item[key] === value)
  return result.length ? result[0] : null
}
