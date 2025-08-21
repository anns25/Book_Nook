import React, { createContext, useContext, useState } from 'react'
import { toast } from 'react-toastify';
const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(()=>{
        return(window.localStorage.getItem('username') || null);
    });

    const [error, setError] = useState('');

   const [fakeUsers, setFakeUsers] = useState([
  {
    username: "admin",
    password: "123",
    role: "buyer",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    username: "user1",
    password: "456",
    role: "seller",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    username: "user2",
    password: "789",
    role: "buyer",
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  }
]);

const login = (username, password) =>{
    const validUser = fakeUsers.find(u=> u.username === username && u.password === password);
    if(validUser){
      setUser(username);
        window.localStorage.setItem('username',username);
        toast.success("Valid User", {
          className : 'success-toast'
        });
        setError("");
    }
    else
    {
        setError("Enter valid username and password");
        toast.error("Invalid user",{
          className : 'error-toast'
        });
    }
    
}

const signup = (username, password, role, image) =>{
    const chkUser = fakeUsers.find(u=> u.username=== username && u.password === password);
    if(chkUser){
        toast.error("User already exists", {
          className : 'error-toast'
        });
        setError('User already exists');
    }
    else{
        setFakeUsers(prev => ([...prev, {username, password, role:role||'buyer', image}]));
        setUser(username);
        window.localStorage.setItem('username', username);
        toast.success("New User Created", {
          className : 'success-toast'
        });
        setError('');
    }
}

const logout = () =>{
    window.localStorage.removeItem('username');
    setUser(null);
}

    


  return (
    <AuthContext.Provider value={{login, logout, signup, user, error, fakeUsers}}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuth = ()=>{
    return useContext(AuthContext);
}
