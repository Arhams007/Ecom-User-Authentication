import React from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'

function Profile() {
  return (
    <Layout>
    <div className="container flex">
      <UserMenu/>
      <div className='ml-7  p-4'>
        <h1>Profile</h1>
      </div>
    </div>
        </Layout>
  )
}

export default Profile