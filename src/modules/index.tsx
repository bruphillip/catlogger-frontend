import 'styles/styles.css'
import { RouteObject } from 'react-router'

import { RouterCompiler } from 'provider/router/RouterCompiler'

import CatLogger from './Catlogger'
import CreateUser from './CreateUser'
import Login from './Login'

const routes = [Login, CreateUser, CatLogger] as RouteObject[]

export default RouterCompiler({ routes })
