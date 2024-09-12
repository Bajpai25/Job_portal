import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../ui/Header'

const Applayout = () => {
  return (
    <div>
        <div className='grid-background'>
        </div>
        <main className='min-h-screen container'>
            <Header/>
            <Outlet/>
        </main>
       <div className='p-4 text-center bg-gray-800 mt-4'>
        Made with ❤️ by Shashwat Bajpai
       </div>
    </div>
  )
}

export default Applayout