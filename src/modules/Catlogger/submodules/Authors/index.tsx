import route from 'constants/route'
import { RouterBuilder } from 'provider/router/RouterBuilder'

function Author() {
  return <div className="my-5 h-96 bg-slate-600 rounded-xl">Autores</div>
}

export default RouterBuilder(Author, route.CATLOGGER.SUBROUTES.AUTHORS, [])
