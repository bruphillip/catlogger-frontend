/* eslint-disable react/function-component-definition */
/* eslint-disable react/display-name */
/* eslint-disable-next-line react/function-component-definition */

import { useMemo } from 'react'
import { RouteObject, RouterProvider } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'

import { flatten } from 'lodash'

type RouterCompilerProps = {
  routes: RouteObject[]
}

export function RouterCompiler({ routes }: RouterCompilerProps) {
  return () => {
    const compiled = useMemo(
      () => createBrowserRouter(flatten(routes)),
      [routes]
    )

    return <RouterProvider router={compiled} />
  }
}
