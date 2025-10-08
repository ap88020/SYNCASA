import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Herosection from '../components/Herosection'
import Features from '../components/Features'

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen py-2  ">
      {/* Navbar */}
      <Navbar />

      {/* Main content placeholder (flex-grow pushes footer down) */}
      <main className="flex-grow p-3">
        < Herosection />
        < Features />
      </main>

      {/* Footer always at bottom */}
      <Footer />
    </div>
  )
}

export default Home
