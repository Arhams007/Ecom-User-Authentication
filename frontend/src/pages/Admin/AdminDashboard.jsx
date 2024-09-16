import React from 'react'
import Layout from '../../components/layout/Layout'
import Adminmenu from '../../components/layout/Adminmenu'
const AdminDashboard = () => {
  return (
    
    <Layout title={"Admin dashboard"}>

<div className="container flex">
  <Adminmenu/>
  <div className='ml-7 border-2 p-4'>
    <h1>GG</h1>
  </div>
</div>
    </Layout>

    
  )
}

export default AdminDashboard