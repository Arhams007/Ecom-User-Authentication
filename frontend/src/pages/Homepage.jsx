import React from 'react'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/auth'
const Homepage = () => {
  const [ auth,setAuth] = useAuth()
  return (
    <Layout title={"Best offers!"}>
Homepage

<pre>{JSON.stringify(auth,null,4)}</pre>
    </Layout>
  )
}

export default Homepage