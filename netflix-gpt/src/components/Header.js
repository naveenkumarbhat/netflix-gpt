import React, { useEffect } from 'react'
import {onAuthStateChanged, signOut} from "firebase/auth"
import {auth} from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {addUser, removeUser} from '../utils/userSlice'
import { LOGO, USER_AVATAR } from '../utils/constant'

const Header = () => {
  const dispatch = useDispatch();
  const navigate =  useNavigate()
  const user = useSelector(store => store.user)
  const handleSignOut=()=>{
    signOut(auth).then(() => {}).catch((error) => {
      navigate("/error")
    });
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const {uid, email, displayName} = user;
          dispatch(addUser({uid:uid, email:email, displayName:displayName}))
          navigate("/browse")
        } else {    
          dispatch(removeUser())
          navigate("/")
        }
      });

      //unsubscribe when component unmounts
      return ()=> unsubscribe()
},[])


  return (
    <div className='w-screen h-20 absolute px-2 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img 
      className='w-40'
      src={LOGO} alt='logo'/>
      {user && (<div className='flex p-2'>
        <img className='w-12 h-14 m-3' alt='usericon' src={USER_AVATAR}/>
        <button onClick={handleSignOut} className='font-bold text-white rounded-lg w-20 h-12 mt-4'>Sign Out</button>
      </div>)}
    </div>
  )
}

export default Header
