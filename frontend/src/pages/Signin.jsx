import React from 'react'
import Heading from '../components/Heading'
import Subheading from '../components/Subheading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'

const Signin = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4"'>
          <Heading label={"Sign in"} />
          <Subheading label={"Enter your credentials to access your account"} />
          <InputBox label={"Email"} placeholder={"example@gmail.com"} />
          <InputBox label={"Password"} placeholder={"*********"} />
          <div className='pt-4'>
            <Button label={"Sign in"} />
            <BottomWarning label={"Don't have and account?"} buttonText={"Sign up"} to={"/signup"} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin
