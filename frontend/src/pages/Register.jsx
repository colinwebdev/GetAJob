import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/Spinner'
import { register, reset } from '../features/auth/authSlice'

function Register() {
    let [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
    })

    let { username, email, password, password2 } = formData

    let dispatch = useDispatch()
    let navigate = useNavigate()

    let { user, isLoading, isSuccess, message, isError } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
            toast(message)
        }

        if (isSuccess && user) {
            toast('User created', {
                autoClose: 5000,
            })
            navigate('/')
        }

        dispatch(reset)
    }, [isError, isSuccess, user, message, navigate, dispatch])

    function onChange(e) {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    function onSubmit(e) {
        e.preventDefault()
        if (password !== password2) {
            toast('Password does not match')
        } else {
            let userData = {
                username,
                email,
                password,
            }

            dispatch(register(userData))
        }
    }
    if (isLoading) return <Spinner />
    return (
        <div className='page'>
            <h1>Register</h1>
            <form onSubmit={onSubmit} className='mt-8 ml-8 w-1/2'>
                <div className='form-line'>
                    <input
                        type='text'
                        className='form-control'
                        id='username'
                        value={username}
                        onChange={onChange}
                        name='username'
                        placeholder='Enter your username'
                        required
                    />
                </div>
                <div className='form-line'>
                    <input
                        type='email'
                        className='form-control'
                        id='email'
                        value={email}
                        onChange={onChange}
                        name='email'
                        placeholder='Enter your email'
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
                <div className='form-line'>
                    <input
                        type='password'
                        className='form-control'
                        id='password2'
                        value={password2}
                        onChange={onChange}
                        name='password2'
                        placeholder='Confirm password'
                        required
                    />
                </div>
                <div className='form-group'>
                    <button className='btn btn-secondary ms-auto block'>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Register
