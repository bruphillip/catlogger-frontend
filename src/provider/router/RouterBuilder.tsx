import { flatten } from 'lodash'

import { EnhancedRouter, EnchancedRouterProps } from './EnhancedRoute'

export type RouterBuilderReturn = {
  path: string
  element: React.ReactElement
  children?: RouterBuilderReturn | RouterBuilderReturn[]
  actions?: any
  caseSensitive?: boolean
}

export function RouterBuilder(
  Component: Function,
  path: string | string[],
  children?: RouterBuilderReturn[],
  actions?: EnchancedRouterProps['actions']
): RouterBuilderReturn

export function RouterBuilder(
  Component: Function,
  path: string | string[],
  children?: RouterBuilderReturn[],
  actions?: EnchancedRouterProps['actions']
): RouterBuilderReturn[]

export function RouterBuilder(
  Component: Function,
  path: string | string[],
  children?: RouterBuilderReturn[],
  actions?: EnchancedRouterProps['actions']
): RouterBuilderReturn | RouterBuilderReturn[] {
  const Enhanced = (
    <EnhancedRouter actions={actions}>
      <Component />
    </EnhancedRouter>
  )

  if (path instanceof Array) {
    return path.map(singlePath => ({
      path: singlePath,
      element: Enhanced,
      children: flatten(children) as RouterBuilderReturn[],
      caseSensitive: true
    }))
  }

  return {
    path,
    caseSensitive: true,
    element: Enhanced,
    children: flatten(children) as RouterBuilderReturn[]
  }
}
