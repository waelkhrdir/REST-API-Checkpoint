import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const {user,isLoading,isAuth} = useSelector(state => state.authReducer)
  return <div>
     {
       isLoading ? <h1>Loading ...</h1> : !isAuth ? <Navigate to="/login"/> :
       <>
       <h1>Welcome to profile page</h1>
       <p>{user.name}</p>
       <p>{user.email}</p>
       <p>{user.phone}</p>
       </>

     }
  </div>;
};

export default Profile;