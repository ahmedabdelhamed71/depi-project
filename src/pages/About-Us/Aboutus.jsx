import React from 'react'
import { Aperture, BookOpen, Eye, Sparkles } from "lucide-react";

const Aboutus = () => {

  const values = [
    {
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and community-driven solutions.'
    },
    {
      title: 'Innovation',
      description: 'Constantly pushing boundaries to create better experiences for our users.'
    },
    {
      title: 'Transparency',
      description: 'We communicate openly and honestly with our community and partners.'
    },
    {
      title: 'Excellence',
      description: 'We strive for the highest quality in everything we do.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About SkillSwap</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Empowering people to share their skills, learn from each other, and build meaningful connections through our innovative platform.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
            <p className="text-gray-600 text-lg mb-4">
              Founded in 2023, SkillSwap was born from a simple idea: everyone has something to teach, and everyone wants to learn.
            </p>
            <p className="text-gray-600 text-lg mb-4">
              We noticed that traditional education wasn't accessible to everyone, and peer-to-peer learning was often fragmented.
              So we built a platform that brings people together to share their expertise, no matter what skill they want to master.
            </p>
            <p className="text-gray-600 text-lg">
              Today, we're proud to have helped thousands of people learn new skills, connect with mentors, and grow their capabilities.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg h-80 flex items-center justify-center">
            <div className="text-8xl"><BookOpen size={100} color='white' /></div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-600">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="text-3xl mr-3"><Aperture /></span>Our Mission
            </h3>
            <p className="text-gray-600 text-lg">
              To democratize learning and make skill development accessible to everyone by creating a vibrant community where knowledge flows freely and everyone can become an expert in their field.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-600">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="text-3xl mr-3"><Eye /></span>Our Vision
            </h3>
            <p className="text-gray-600 text-lg">
              A world where learning has no barriers, where skill and passion matter more than credentials, and where everyone can connect with mentors and learners who share their interests.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-12 mb-20">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">50K+</div>
              <p className="text-blue-100">Active Users</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">1000+</div>
              <p className="text-blue-100">Skills Offered</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">100K+</div>
              <p className="text-blue-100">Connections Made</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">4.9★</div>
              <p className="text-blue-100">User Rating</p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-2xl"><Sparkles /></div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Whether you want to teach, learn, or both, SkillSwap is the perfect place to start your journey.
          </p>
          <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition transform hover:scale-105">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  )
}

export default Aboutus