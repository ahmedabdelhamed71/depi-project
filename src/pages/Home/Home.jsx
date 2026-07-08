import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { Camera, Code, PenTool, Globe, TrendingUp } from "lucide-react";

const Home = () => {
  const Skills = [
    {
      title: "Web Development",
      members: "1,245 members",
      icon: <Code size={40} color="#204ccf" />,
    },
    {
      title: "Design",
      members: "982 members",
      icon: <PenTool size={40} color="#204ccf" />,
    },
    {
      title: "Language Learning",
      members: "1,152 members",
      icon: <Globe size={40} color="#204ccf" />,
    },
    {
      title: "Photography",
      members: "845 members",
      icon: <Camera size={40} color="#204ccf" />,
    },
    {
      title: "Marketing",
      members: "1,035 members",
      icon: <TrendingUp size={40} color="#204ccf" />,
    },
  ];

  return (
    <div className="container mx-auto px-4 pt-12 pb-10 sm:px-6 lg:px-8 lg:pt-20">
      <section className="flex flex-col items-center gap-10 lg:flex-row lg:justify-between">
        <div className="w-full text-center lg:w-1/2 lg:text-left">
          <div className="flex flex-col gap-2 text-4xl font-bold sm:text-5xl lg:text-6xl">
            <h1>Learn Skills.</h1>
            <h1>Teach Skills.</h1>
            <h1>Swap Growth.</h1>
          </div>

          <p className="mx-auto mt-6 max-w-md text-base leading-7 text-gray-700 lg:mx-0">
            Join a trusted community where people learn from each other by
            exchanging skills, not money.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Link to="/register">
              <Button className="w-full bg-blue-500 transition duration-300 hover:bg-blue-700 sm:w-auto">
                Get Started
              </Button>
            </Link>

            <Link to="/how-it-works">
              <Button variant="outlined" className="w-full sm:w-auto">
                How It Works
              </Button>
            </Link>
          </div>
        </div>

        <div className="w-full lg:w-[42%]">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVvcGxlJTIwbGVhcm5pbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
            alt="home"
            className="h-[260px] w-full rounded-3xl object-cover sm:h-[340px] lg:h-[360px]"
          />
        </div>
      </section>

      <section className="mt-14">
        <p className="text-2xl font-bold">Popular skills</p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {Skills.map((value, index) => (
            <div
              key={index}
              className="flex items-center gap-4 rounded-xl bg-white px-4 py-4 shadow-lg"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                {value.icon}
              </div>

              <div>
                <p className="text-lg font-bold">{value.title}</p>
                <p className="text-gray-700">{value.members}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;