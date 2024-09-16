import React from 'react'
import Layout from '../../components/layout/Layout'
import Adminmenu from '../../components/layout/Adminmenu'

const User = () => {
  return (
    <Layout title={"User"}>

<div className="container flex">
  <Adminmenu/>
  <div className='ml-7 p-4'>
    <h1>All Users</h1>
  </div>
</div>
    </Layout>
  )
}

export default User