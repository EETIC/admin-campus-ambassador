import { useState, useEffect } from 'react'
import { Header } from '../components'
import AppWrap from "../containers/Layout"
import { auth } from '../firebase/config'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const Navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        setLoading(false)
      } else {
        // console.log('No user')
        Navigate('/login')
        setLoading(false)
      }
    })
    return unsubscribe
  }, [])

  const logout = async () => {
    await signOut(auth)
      .catch((err) => {
        setError(err.message)
        console.log(err.message)
        setLoading(false)
      })
      Navigate('/login')
  }

  return (
    <div className="flex flex-col m-5">
      <Header category={'User'} title={'Profile'} />
      <div className="flex flex-col m-5">
        <div className="flex flex-col m-5">
          {/* <h3 className="text-2xl font-bold">Name: {user.}</h3> */}
          <h3 className="text-2xl font-bold">Email: {user.email}</h3>

        </div>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>Logout</button>
      </div>
    </div>
  )
}

export default AppWrap(Profile)