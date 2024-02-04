
import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import { Link } from '@mui/material';

const UserProfile = () => {
    useEffect(() => {
        // Retrieve user details from local storage
        const storedUser = JSON.parse(localStorage.getItem('facilityUser'));

        if (storedUser) {
            const avatarColor = getEmailAvatarColor(storedUser.userDetails.email);
            localStorage.setItem('facilityUser', JSON.stringify({ ...storedUser, avatarColor }));
        }
    }, []);

    const getEmailAvatarColor = (email) => {
        if (!email) {
            return null;
        }
        // Use the email to generate a hash (or any unique identifier)
        const hash = email.split('').reduce((acc, char) => acc + char.charCodeAt(0, 1), 0);
        return `#${hash.toString(16).slice(0, 6)}`;
    };

    return (
        <div>
            {/* Retrieve and display the user details from local storage */}
            {localStorage.getItem('facilityUser') && (
                <div>

                    {/* Display the user's avatar from local storage */}
                    <Avatar style={{ backgroundColor: JSON.parse(localStorage.getItem('facilityUser')).avatarColor }}>
                        {JSON.parse(localStorage.getItem('facilityUser')).userDetails.email.slice(0, 2).toUpperCase()}
                    </Avatar>

                    {/* Display the user's email */}
                    <p> {JSON.parse(localStorage.getItem('facilityUser')).userDetails.email}</p>
                    <Link to='/logout' style={{ textDecoration: 'none', color: 'yellow' }}>LogOut</Link>

                </div>
            )}
        </div>
    );
}

export default UserProfile;
