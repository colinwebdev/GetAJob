import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'

function Login() {
    let [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    let { username, password } = formData

    let dispatch = useDispatch()
    let navigate = useNavigate()

    let { user, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess && user) {
            navigate('/')
        }

        dispatch(reset)
    }, [isError, isSuccess, user, message, navigate, dispatch, reset])

    function onChange(e) {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    function onSubmit(e) {
        e.preventDefault()

        let userData = {
            username,
            password,
        }

        dispatch(login(userData))
    }

    if (isLoading) return <Spinner />
    return (
        <div className='page'>
            <h1>Login</h1>
            <form onSubmit={onSubmit} className='mt-8 ml-8 w-1/2'>
                <div className='form-line'>
                    <input
                        type='username'
                        className='form-control'
                        id='username'
                        value={username}
                        onChange={onChange}
                        name='username'
                        placeholder='Username'
                        required
                    />
                </div>
                <div className='form-line'>
                    <input
                        type='password'
                        className='form-control'
                        id='password'
                        value={password}
                        onChange={onChange}
                        name='password'
                        placeholder='Enter password'
                        required
                    />
                </div>
                <div className='form-group'>
                    <button className='btn btn-secondary ms-auto block'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Login
