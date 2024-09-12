import React from 'react'
import "./App.css"
import { useState, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Applayout from './components/layout/Applayout'
import Landing from './components/pages/Landing'
import Onboarding from './components/pages/Onboarding'
import Jobs from './components/pages/Jobs'
import Post_job from './components/pages/Post_job'
import My_jobs from './components/pages/My_jobs'
import Saved_job from './components/pages/Saved_job'
import { ThemeProvider } from './components/theme-provider'
import { ClerkProvider } from '@clerk/clerk-react'
import { shadesOfPurple } from '@clerk/themes'
import Protected_route from './components/protected/Protected_route'
import Single_Job from './components/pages/Single_Job'

const App = () => {
   const router=createBrowserRouter([
    {
      element: <Applayout/>,
      children: [
        { path:"/",
        element:
        <Landing/>
        },
        {
          path:"/onboarding",
          element:<Protected_route>
            <Onboarding/>
          </Protected_route>
        },
        {
          path:"/jobs",
          element:<Protected_route><Jobs/></Protected_route>
        },
        {
          path:"/job/:id",
          element:
          <Protected_route>
            <Single_Job/>
          </Protected_route>
        },
        {
          path:"/jobs/post-job",
          element:
          <Protected_route>
            <Post_job/>
          </Protected_route>
        },
        {
          path:"/my-jobs",
          element:<Protected_route>
            <My_jobs/>
          </Protected_route>
        },
        {
          path:"/jobs/saved-jobs",
          element:<Protected_route>
            <Saved_job/>
          </Protected_route>
        }
      ]
    }
   ])
   const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


  return (
    <div>
      <ClerkProvider appearance={{
        baseTheme:shadesOfPurple
      }} publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <RouterProvider router={router}/>
      </ThemeProvider>
      </ClerkProvider>
    </div>
  )
}

// Bajpai@123#

export default App