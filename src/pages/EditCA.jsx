import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { db, auth } from '../firebase/config'
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import AppWrap from '../containers/Layout'
import { onAuthStateChanged } from 'firebase/auth'
import { Sidebar } from '../components'

const EditCA = () => {
  const { id } = useParams()
  console.log(id)

  const navigate = useNavigate()

  const [docs, setDocs] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    college: '',
    ref_code: '',
    credit: '',
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const caCollectionRef = collection(db, 'ca')

  useEffect(() => {
    const getCA = async () => {
      const data = await getDocs(caCollectionRef)
        .catch((err) => {
          setError(err.message)
          console.log(err.message)
          setLoading(false)
        })
      const doc = data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      // console.log(doc)
      setDocs(doc.filter(doc => doc.ref_code === id)[0])
      setLoading(false)
    }

    onAuthStateChanged(auth, (user) => {
      if (!user) {
        // window.location.href = '/login'
        navigate('/login')
      } else {
        getCA()
      }
    })


  }, [])

  console.log(docs)

  const handleChange = (e) => {
    const { name, value } = e.target
    setDocs({ ...docs, [name]: value })
  }

  const updateCA = async () => {
    const caRef = doc(db, 'ca', docs.id)
    await updateDoc(caRef, docs);
  }

  const handleSubmit = (e) => {
    updateCA()
    e.preventDefault()
    navigate('/list')
  }

  const handleDelete = () => {
    const caRef = doc(db, 'ca', docs.id)
    deleteDoc(caRef)
    navigate('/list')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="flex flex-col justify-center items-center">
          {/* <h1 className="text-2xl font-bold">Loading...</h1> */}
          {/* <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12"></div> */}
          <div className="shapes"></div>
        </div>
      </div>
    )
  } else if (error) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold">Error: {error}</h1>
        </div>
      </div>
    )
  }

  return (
    <div className='flex'>
      <Sidebar />
      <div className="flex flex-col m-5">
        <h1 className="text-2xl font-bold">Edit Campus Ambassador</h1>
        {/* {docs && docs.map(doc => ( */}
        <form className="flex flex-col">
          <label className="mt-4">
            Name
          </label>
          <input
            className="border border-gray-400 p-2 rounded"
            type="text"
            name="name"
            value={docs.name}
            onChange={handleChange}
          />
          <label className="mt-4">
            Email
          </label>
          <input
            className="border border-gray-400 p-2 rounded"
            type="email"
            name="email"
            value={docs.email}
            onChange={handleChange}
          />
          {/* <label className="mt-4">
          Phone
        </label>
          <input
            className="border border-gray-400 p-2 rounded"
            type="tel"
            name="phone"
            value={doc.phone}
          /> */}
          <label className="mt-4">
            College
          </label>
          <input
            className="border border-gray-400 p-2 rounded"
            type="text"
            name="college"
            value={docs.college}
            onChange={handleChange}
          />
          <label className="mt-4">
            Referral Code
          </label>
          <input
            className="border border-gray-400 p-2 rounded"
            type="text"
            name="ref_code"
            value={docs.ref_code}
            onChange={handleChange}
          />
          <label className="mt-4">
            Credits
          </label>
          <input
            className="border border-gray-400 p-2 rounded"
            type="number"
            name="credit"
            value={docs.credit}
            onChange={handleChange}
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4  ml-2 mr-2" onClick={handleSubmit}>
            Submit
          </button>
          <div className='flex flex-row justify-around '>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 w-full ml-2 mr-2 " onClick={() => navigate('/list')}>
              Back
            </button>
            <button className="border border-red-600 hover:bg-red-700 hover:text-white text-red-600 font-bold py-2 px-4 rounded mt-4 w-full ml-2 mr-2" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </form>
        {/* ))} */}
      </div>
    </div>
  )
}

export default EditCA