import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth.js'
import { login, logout } from './features/auth/authSlice.js'
import { Footer, Header } from './components/index.js'
import { Outlet } from 'react-router-dom'
import { clearPost } from './features/post/postSlice.js'

function App() {

  const [loading, setLoading] = useState(true) // initial loading is true . will change when useEffect job done
  const dispatch = useDispatch()


  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
          dispatch(clearPost())
        }

      })
      .finally(() => setLoading(false))

  }, [])


  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>

  ) : <div className='flex justify-center items-center h-screen font-semibold text-4xl ' >loading...</div>

}

export default App
