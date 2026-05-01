import React from 'react'
import { Button } from "@material-tailwind/react";
import { Camera , Code, PenTool , Globe , TrendingUp} from 'lucide-react';

const Home = () => {

  const Skills = [
    {
      title: 'Web Development',
      members: '1,245 members',
      icon: <Code size={40} color="#204ccf" />
    },
    {
      title: 'Design',
      members: '982 members',
      icon: <PenTool size={40} color="#204ccf" />
    },
    {
      title: 'Language Learning',
      members: '1,152 members',
      icon: <Globe size={40} color="#204ccf" />
    },
    {
      title: 'Photography',
      members: '845 members',
      icon: <Camera size={40} color="#204ccf" />
    },
    {
      title: 'Marketing',
      members: '1,035 members',
      icon: <TrendingUp size={40} color="#204ccf" />
    }
  ];

  return (
    <div className='container pt-20 pb-10 mx-auto'>
      <section className='flex flex-row justify-evenly items-center mx-auto'>
        <div className='flex flex-col'>
          <div className='flex flex-col text-4xl font-bold'>
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
      <section className='mt-12'>
        <p className='text-2xl font-bold'>
          Popular skills
        </p>
        <div className='flex flex-row mt-4 gap-4'>
          {Skills.map((value, index) =>(
          <div key={index} className='flex flex-row gap-4 rounded-lg shadow-lg px-4 pt-2 pb-4 pe-7'>
            <div className='bg-blue-50 rounded-lg p-1 mt-2 d-flex items-center px-2'>
              {value.icon}
            </div>
            <div className='flex flex-col'>
              <p className='text-lg font-bold'>
                {value.title}
              </p>
              <p>
                {value.members}
              </p>

            </div>
            
          </div>
        ))}

        </div>
      </section>
    </div>
  )
}

export default Home