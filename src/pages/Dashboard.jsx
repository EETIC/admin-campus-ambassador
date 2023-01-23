import { Header } from "../components"
import AppWrap from "../containers/Layout"
import { useState, useEffect } from "react"
import { db } from "../firebase/config"
import { collection, getDocs } from "firebase/firestore"
import { auth } from "../firebase/config"
import { onAuthStateChanged } from "firebase/auth"
import { useNavigate } from "react-router-dom"


const Dashboard = () => {

  // const [docs, setDocs] = useState([])
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState(null)

  // const caCollectionRef = collection(db, 'ca')

  // useEffect(() => {
  //   const getCA = async () => {
  //     const data = await getDocs(caCollectionRef)
  //       .catch((err) => {
  //         setError(err.message)
  //         setLoading(false)
  //       })
  //     console.log(data)
  //     setDocs(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
  //     setLoading(false)
  //   }
  //   getCA()
  // }, [])

  // console.log(docs)

  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        // window.location.href = '/login'
        navigate('/login')
      }
    })
  }, [])

  return (
    <div className="flex flex-col m-5">
      <Header category={'Welcome'} title={'Dashboard'} />

    </div>
  )
}

export default AppWrap(Dashboard)