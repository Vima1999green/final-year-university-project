import { useState } from 'react';
import useAuthContext from './useAuthContext'
import axios from 'axios';

export const useLogin = () => {

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
            })
        .catch(err => {
                console.log(err.response.data)
            })
    }


    return ({
        login,
        isLoading,
        error
    });
}

