import Heading from '../components/Heading'
import Subheading from '../components/Subheading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


export const Signup = () => {

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <Subheading label={"Enter your infromation to create an account"} />
          <InputBox onChange={(e) => {
            setFirstname(e.target.value);
          }} label={"First Name"} placeholder={"Enter First Name"} />
          <InputBox onChange={(e) => {
            setLastname(e.target.value);
          }} label={"Last Name"} placeholder={"Enter Last Name"} />
          <InputBox onChange={(e) => {
            setUsername(e.target.value);
          }} label={"Email"} placeholder={"example@gmail.com"} />
          <InputBox onChange={(e) => {
            setPassword(e.target.value);
          }} label={"Password"} placeholder={"********"} />
          <div className='pt-4'>
            <Button onClick={async () => {
              const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                firstname,
                lastname,
                username,
                password
              });
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("balance", response.data.balance);
              navigate("/dashboard")
            }} label={"Sign up"} />
            <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
          </div>
        </div>
      </div>
    </div>
  )
}

