import React from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'

const Orders = () => {
  return (
    <Layout>
<div className="container flex">
  <UserMenu/>
  <div className='ml-7  p-4'>
    <h1>All orders</h1>
  </div>
</div>
    </Layout>
  )
}

export default Orders