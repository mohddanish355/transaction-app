import React from 'react'
import Heading from '../components/Heading'
import Subheading from '../components/Subheading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'


export const Signup = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label={"Sign up"} />
            <Subheading label={"Enter your infromation to create an account"}/>
            <InputBox label={"First Name"} placeholder={"Enter First Name"} />
            <InputBox label={"Last Name"} placeholder={"Enter Last Name"} />
            <InputBox label={"Email"} placeholder={"example@gmail.com"} />
            <InputBox label={"Password"} placeholder={"********"} />
            <div className='pt-4'>
                <Button label={"Sign up"} />
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>
            </div>
        </div>
      </div> 
    </div>
  )
}

