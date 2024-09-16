import React from 'react'
import Layout from '../components/layout/Layout'
import { Helmet } from 'react-helmet'

const Notfound = () => {
  return (
    <div>
      <Helmet>

     <title>
     Page Not Found
    </title>
      </Helmet>

    <div title={'Page Not Found'} className=' flex justify-center items-center my-[6%]'>
    <img src="/404 Error Page not Found with people connecting a plug.gif" alt="" />
   </div>
    </div>
  )
}

export default Notfound