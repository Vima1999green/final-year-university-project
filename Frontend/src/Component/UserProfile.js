import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/users/current')
                setUser(response.data)

            } catch (error) {
                console.error('error fetching user data', error)
            }
        };
        fetchCurrentUser();
    }, []);
    const getEmailAvatar = (email) => {
        // Use the email to generate a hash (or any unique identifier)
        const hash = email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const avatarColor = `#${hash.toString(16).slice(0, 6)}`;

        return (
            <Avatar style={{ backgroundColor: avatarColor }}>
                {email.charAt(0).toUpperCase()}
            </Avatar>
        );
    };
    return (
        <div>
            {user && (
                <div>
                    {/* Display the user's email */}
                    <p>Email: {user.email}</p>

                    {/* Display the user's avatar */}
                    {getEmailAvatar(user.email)}
                </div>
            )}
        </div>

    );
}

export default UserProfile;