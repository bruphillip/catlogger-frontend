import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import { HydrateProvider } from 'store/config/HydrateProvider'

import App from './modules'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <div className="scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100">
    <HydrateProvider>
      <App />
    </HydrateProvider>
    <ToastContainer theme="dark" />
  </div>
)
