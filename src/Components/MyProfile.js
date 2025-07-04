import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import './MyProfile.css';

const MyProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    setUser(currentUser);
  }, []);

  if (!user) {
    return <div className="profile-section"><p>Loading user info...</p></div>;
  }

  return (
    <div className="profile-section">
      <h1 className="profile-heading">My Profile</h1>
      <div className="profile-card">
        <img src={user.photoURL || '/default-avatar.png'} alt="User Avatar" className="profile-avatar" />
        <h2>{user.displayName}</h2>
        <p>Email: {user.email}</p>
        <p>User ID: {user.uid}</p>
      </div>
    </div>
  );
};

export default MyProfile;
