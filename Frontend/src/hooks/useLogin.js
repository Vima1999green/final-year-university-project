import { useState } from 'react';
import useAuthContext from './useAuthContext'
import axios from 'axios';
import isEmpty from '../isEmpty';
import { useNavigate } from 'react-router-dom';

    export const useLogin = () => {
        const navigate = useNavigate();
        const [error, setError] = useState(null)
        const [isLoading, setIsLoading] = useState(false)
        const { dispatch } = useAuthContext()
    
        const login = async (email, password) => {
            setIsLoading(true)
            setError(null)
    
            //     const response = await fetch('http://localhost:4000/api/users/login', {
            //         method: 'POST',
            //         headers: { 'Content-Type': 'application/json' },
            //         body: JSON.stringify({ email, password })
            //     })
    
            //     const json = await response.json()
    
            //     if (!response.ok) {
            //         setIsLoading(false)
            //         setError(json.error)
            //     } else {
            //         localStorage.setItem('user', JSON.stringify(json))
    
            //         dispatch({ type: 'LOGIN', payload: json })
    
            //         setIsLoading(false)
            //     }
            // }
            await axios.post('http://localhost:4000/api/users/login', {
                email: email,
                password: password
            }
            )
                .then(res => {
                    console.log(res.data)
                    if (res.data.isAutheticate){
                        localStorage.setItem('facilityUser',JSON.stringify(res.data))
                        alert('login succcesfulll');
                    }
                    else {
                        if (res.data.msg === 'Email is not verified') {
                            axios.post('http://localhost:4000/api/users/reconfirmationEmail', { email: email })
                                .then(res => {
                                    console.log(res.data)
                                })
                                .catch(err => {
                                    console.log(err.responce.data)
                                })
                            alert('Login Failed\r\n'+res.data.msg)
                            navigate(`/verifyEmail/${email}`)
                        }
                        else {
                            alert('Login Failed\r\n'+res.data.msg)
                        }
                    }
                })
                .catch(err => {
                    console.log(err.response.data)
                    //alert('error occured');
                    alert('Login Failed\r\n'+err.response.data.msg)
                })
        }
    
    
        return ({
            login,
            isLoading,
            error
        });
    }
