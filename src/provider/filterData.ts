import { filter, get } from 'lodash'

function hasMatch<T>(item: T, field: keyof T, search: string) {
  return get(item, field, '').toLowerCase().includes(search.toLowerCase())
}

export function filterData<T>(
  list: T[] | undefined,
  fields: (keyof T)[],
  search: string
) {
  if (!search) return list

  const filtered = filter(list, item =>
    fields.some(field => hasMatch(item, field as any, search))
  )
  return filtered
}
