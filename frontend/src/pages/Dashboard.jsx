import React, { useEffect, useState } from 'react'
import Appbar from '../components/Appbar'
import Balance from '../components/Balance'
import Users from '../components/Users'

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    const storedBalance = localStorage.getItem("balance");
    if(storedBalance){
      setBalance(parseFloat(storedBalance));
    }
  }, []);
  return (
    <div>
      <Appbar/>
      <div className="m-4">
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  )
}

export default Dashboard
