import React, { useEffect } from 'react'
import {onAuthStateChanged, signOut} from "firebase/auth"
import {auth} from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {addUser, removeUser} from '../utils/userSlice'
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from '../utils/constant'
import { toggleGptSearchView } from '../utils/gptSlice'
import { changeLanguage } from '../utils/configSlice'

const Header = () => {
  const dispatch = useDispatch();
  const navigate =  useNavigate()
  const user = useSelector(store => store.user)
  const showGptSearch = useSelector((store)=> store.gpt.showGptSearch)
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

const handleGPTSearch = () =>{
  //Toggle GPT Search
  dispatch(toggleGptSearchView());
}

const handleLanguageChange = (e) =>{
  dispatch(changeLanguage(e.target.value))
}

  return (
    <div className='w-screen h-20 absolute px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img 
      className='w-44'
      src={LOGO} alt='logo'/>
      {user && (<div className='flex p-2'>
        {showGptSearch && <select className='p-2 bg-gray-900 text-white rounded-lg m-1' onChange={handleLanguageChange}>
         {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
        </select>}
        <button className='px-2 py-2 bg-purple-800 text-white rounded-lg mx-2 my-1' onClick={handleGPTSearch}>{showGptSearch ? "Homepage": "GPT Search"}</button>
        <img className='w-12 h-12 my-1 rounded-md' alt='usericon' src={USER_AVATAR}/>
        <button onClick={handleSignOut} className='font-bold text-white rounded-lg '>Sign Out</button>
      </div>)}
    </div>
  )
}

export default Header
