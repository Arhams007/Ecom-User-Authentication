import React from 'react'
import Layout from '../../components/layout/Layout'
import Adminmenu from '../../components/layout/Adminmenu'

const CreateProduct = () => {
  return (

    <Layout title={"Create Product"}>

<div className="container flex">
  <Adminmenu/>
  <div className='ml-7  p-4'>
    <h1>Create Product</h1>
  </div>
</div>
    </Layout>
  )
}

export default CreateProduct