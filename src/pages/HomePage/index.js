import React, { useEffect } from 'react'
import Layout from '../../components/Layout'

export default function HomePage() {


  const getHomeVediosData = async () => {
    try {
      const URL = 'https://apis.ccbp.in/videos/all?search=';
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }).then(result => { return result.json() }).catch(err => console.log(err));
      console.log(response)
    }
    catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    getHomeVediosData();
  }, [])

  return (
    <Layout>
      Home
    </Layout>
  )
}
