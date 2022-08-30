import React, { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Logo from './components/logo';
import StyledInput from './components/input';
import axios from './config/axios'

export default function Signin() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const inputRef = useRef();
  const [signInData, setSignInData] = useState({username: '', password: ''});
  const handleSignIn = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post('/user/login', {account: signInData.username, password: signInData.password})
      window.localStorage.setItem('acc_token',response.data.access_token)
      router.push('/');
    }catch(err){
      console.log('err', err)
    }
  }
  const collectUsername = (e) => {
    setSignInData({...signInData, username: e.target.value});
    
  }
  const collectPassword = (e) => {
    setSignInData({...signInData, password: e.target.value});
    
  }
  useEffect(() => {
    inputRef.current.focus();
  }, [])
  return (
    <div className='flex justify-center items-center w-screen h-screen'>
      <Head>
        <title>Sign in</title>
      </Head>
      <div className="h-screen w-screen sm:h-5/6 sm:w-4/12 sm:min-w-[480px] sm:max-h-[580px] bg-offWhite text-blue-300 p-12 sm:p-10 sm:pt-4 flex flex-col items-center justify-evenly sm:justify-between rounded gap-y-2">
        <Logo />
        <h1 className='text-2xl font-semibold'>Sign in</h1>
        <form
          className='w-full flex flex-col items-center box-border gap-y-4 py-12 border-b'
          onSubmit={handleSignIn}
        >
          <StyledInput
            refs={inputRef}
            type={'text'}
            title={'Username'}
            change={collectUsername}
          />
          <StyledInput
            type={'password'}
            title={'Password'}
            change={collectPassword}
          />
          <button
            className='w-full text-white p-2 bg-blue-100 hover:bg-blue-200 rounded text-offWhite border-2 border-blue-300 font-semibold text-lg mt-7'
            onClick={handleSignIn}
          >
            Sign in
          </button>
        </form>
        <Link
          className='text-blue-100 text-sm'
          href='/signup'
        >
          Create new account?
        </Link>
      </div>
    </div>
  )
}
