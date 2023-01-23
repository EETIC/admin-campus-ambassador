import { useState, useEffect } from 'react'
import { db, auth } from '../firebase/config'
import { collection, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import AppWrap from '../containers/Layout'
import { onAuthStateChanged } from 'firebase/auth'

const AddCA = () => {
  // const [doc, setDoc] = useState({
  //   name: '',
  //   email: '',
  //   college: '',
  //   ref_code: '',
  //   credit: 0,
  // })
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newCollege, setNewCollege] = useState('')
  const [newRefCode, setNewRefCode] = useState('')
  const [newCredit, setNewCredit] = useState(0)

  const caCollectionRef = collection(db, 'ca')

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target

    switch (name) {
      case 'name':
        setNewName(value)
        break
      case 'email':
        setNewEmail(value)
        break
      case 'college':
        setNewCollege(value)
        break
      case 'ref_code':
        setNewRefCode(value)
        break
      case 'credit':
        setNewCredit(value)
        break
      default:
        break
    }

    // setDoc({ ...doc, [name]: value })
  }

  const addCA = async () => {
    await addDoc(caCollectionRef, 
      {
        name: newName,
        email: newEmail,
        college: newCollege,
        ref_code: newRefCode,
        credit: newCredit,
      });
  }

  const handleSubmit = (e) => {
    addCA()
    e.preventDefault()
    navigate('/list')
  }

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
      <h1 className="text-2xl font-bold">Edit Campus Ambassador</h1>
      <form className="flex flex-col">
        <label className="mt-4">
          Name
        </label>
        <input
          className="border border-gray-400 p-2 rounded"
          type="text"
          name="name"
          value={newName}
          onChange={handleChange}
        />
        <label className="mt-4">
          Email
        </label>
        <input
          className="border border-gray-400 p-2 rounded"
          type="email"
          name="email"
          value={newEmail}
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
          value={newCollege}
          onChange={handleChange}
        />
        <label className="mt-4">
          Referral Code
        </label>
        <input
          className="border border-gray-400 p-2 rounded"
          type="text"
          name="ref_code"
          value={newRefCode}
          onChange={handleChange}
        />
        <label className="mt-4">
          Credits
        </label>
        <input
          className="border border-gray-400 p-2 rounded"
          type="number"
          name="credit"
          value={newCredit}
          onChange={handleChange}
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleSubmit}>
          Submit
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={() => navigate('/list')}>
          Cancel
        </button>
      </form>
    </div >
  )
}

export default AppWrap(AddCA)