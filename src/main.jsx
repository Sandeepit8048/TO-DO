import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AllTasks from './pages/AllTasks.jsx'
import { Provider } from 'react-redux'
import store from './redux/Store.jsx'
import Login from './Components/Login.jsx'
import Signup from './Components/Signup.jsx'
// import Nav from './components/Nav.jsx'/

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
            {/* <Route path="Nav" element={<Nav/>} /> */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='alltasks' element={<AllTasks />} />
            <Route path='Signup' element={<Signup />} />

            <Route path='Login' element={<Login />} />


          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
