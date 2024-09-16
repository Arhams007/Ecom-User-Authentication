import React from 'react'
import { Link } from 'react-router-dom'

const UserMenu = () => {
  return (
    <div className=" ml-6">
      <div>
        <h1 className="font-bold">Dashboard</h1>
        <div className="flex text-center flex-col border-2 p-2 w-36">

        <Link className="my-2"  to="/dashboard/user/Profile">Profile</Link>
        <Link className="my-2"  to="/dashboard/user/orders">Orders</Link>
      
        </div>
      </div>
    </div>
  )
}

export default UserMenu