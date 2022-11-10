import route from 'constants/route'
import { RouterBuilder } from 'provider/router/RouterBuilder'

function Publishers() {
  return <div className="my-5 h-96 bg-slate-600 rounded-xl">Editoras</div>
}

export default RouterBuilder(
  Publishers,
  route.CATLOGGER.SUBROUTES.PUBLISHERS,
  []
)
