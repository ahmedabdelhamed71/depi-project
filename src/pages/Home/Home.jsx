import React from 'react'
import { Button } from "@material-tailwind/react";

const Home = () => {
  return (
    <div className='container py-20 mx-auto'>
      <section className='flex flex-row justify-evenly items-center mx-auto'>
        <div className='flex flex-col'>
          <div className='flex flex-col text-3xl font-bold'>
            <h1>Learn Skills.</h1>
            <h1>Teach Skills.</h1>
            <h1>Swap Growth.</h1>
          </div>
          <div className='py-5 max-w-[46%]'>
            join a trusted community where people learn from each other by exchanging skills, not money.
          </div>
          <div className='flex flex-row gap-4'>
            <Button className='bg-blue-500 cursor-pointer transition duration-300 hover:bg-blue-700'>Get Started</Button>
            <Button variant='outlined'>How It Works</Button>
          </div>
        </div>
        {/* <div className='flex justify-content-end'> */}
          <img src='https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVvcGxlJTIwbGVhcm5pbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60' alt='home' className='rounded-lg object-cover max-w-[100%] w-[35%]' />
        {/* </div> */}
        <div>

        </div>
      </section>
    </div>
  )
}

export default Home