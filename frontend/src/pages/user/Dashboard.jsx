import React from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import { useAuth } from '../../context/auth'

const Dashboard = () => {
  const [auth] = useAuth()
  return (
    <Layout title={"Dashboard - Ecommerce App "}>
<div className="container flex">
  <UserMenu/>
  <div className='ml-7 border-2 p-4'>
    <h1>UserDashBoard</h1>
      <h3>{auth?.user?.name}</h3>
      <h3>{auth?.user?.email}</h3>
      <h3>{auth?.user?.address}</h3>
    
  </div>
</div>
    </Layout>
  )
}

export default Dashboard