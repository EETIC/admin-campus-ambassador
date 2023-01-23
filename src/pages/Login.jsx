import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'


const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        switch (name) {
            case 'email':
                setEmail(value)
                break
            case 'password':
                setPassword(value)
                break
            default:
                break
        }
    }

    const login = (e) => {

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user)
                // ...
                // if (auth.currentUser.emailVerified) {
                    navigate('/')
                // } else {
                //     alert('Please verify your email address')
                // }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                if (errorCode === 'auth/user-not-found') {
                    alert('User not found')
                } else if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password')
                } else {
                    alert('Something went wrong')
                }
            });


        // try {
        //     await signInWithEmailAndPassword(auth, email, password)
        //     if (auth.currentUser.emailVerified) {
        //         navigate('/')
        //     } else {
        //         alert('Please verify your email address')
        //     }
        // } catch (error) {
        //     console.log(error)
        //     if (error.code === 'auth/user-not-found') {
        //         alert('User not found')
        //     } else if (error.code === 'auth/wrong-password') {
        //         alert('Wrong password')
        //     } else {
        //         alert('Something went wrong')
        //     }
        // }
        e.preventDefault()
    }

    return (
        <div className='flex justify-center items-center h-screen w-screen'>
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8">
                <form className="space-y-6" action="#">
                    <h5 className="text-xl font-medium text-gray-900">Sign in to our platform</h5>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 y-400" placeholder="name@company.com" required value={email} onChange={handleChange}/>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
                        <input type="password" name="password" id="password" placeholder="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required value={password} onChange={handleChange}/>
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 " required />
                            </div>
                            <label className="ml-2 text-sm font-medium text-gray-900">Remember me</label>
                        </div>
                        <a href="#" className="ml-auto text-sm text-blue-700 hover:underline">Lost Password?</a>
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={login}>Login to your account</button>
                    {/* <div className="text-sm font-medium text-gray-500">
                        Not registered? <a href="#" className="text-blue-700 hover:underline">Create account</a>
                    </div> */}
                </form>
            </div>
        </div>
    )
}

export default Login