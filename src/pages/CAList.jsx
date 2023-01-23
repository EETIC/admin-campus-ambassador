import { useState, useEffect } from 'react'
import { Header, Sidebar } from '../components'
import { Link } from 'react-router-dom'
import { db, auth } from '../firebase/config'
import { collection, getDocs } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import '../App.css'
import AppWrap from '../containers/Layout'
import { useNavigate } from 'react-router-dom'

const CAList = () => {
    const [docs, setDocs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const caCollectionRef = collection(db, 'ca')

    const navigate = useNavigate()

    useEffect(() => {
        const getCA = async () => {
            const data = await getDocs(caCollectionRef)
                .catch((err) => {
                    setError(err.message)
                    console.log("Data Fetching - " + err.message)
                    setLoading(false)
                })
            // console.log(data)
            setDocs(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
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

    // console.log(docs)

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
            <div className="flex flex-col m-5" >
                <Header category={'Details'} title={'List of Campus Ambassadors'} />

                <table className="table-auto overflow-auto p-2 border">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            {/* <th className="px-4 py-2">Phone</th> */}
                            <th className="px-4 py-2">College</th>
                            <th className="px-4 py-2">Credits</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {docs && docs.map(doc => (
                            <tr key={doc.id}>
                                <td className="border px-4 py-2">{doc.ref_code}</td>
                                <td className="border px-4 py-2">{doc.name}</td>
                                <td className="border px-4 py-2">{doc.email}</td>
                                {/* <td className="border px-4 py-2">{doc.phone}</td> */}
                                <td className="border px-4 py-2">{doc.college}</td>
                                <td className="border px-4 py-2">{doc.credit}</td>
                                <td className="border px-4 py-2">
                                    <Link to={`/editca/${doc.ref_code}`}>
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            Edit
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='flex justify-center items-center h-20 w-full'>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-7 w-36">
                        <Link to="/addca">Add CA</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CAList