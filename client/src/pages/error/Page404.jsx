import React from 'react'
import { TbError404 } from "react-icons/tb";

function Page404() {
  return (
    <div className="min-h-screen w-screen ml-[-13%] flex justify-center items-center bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 animate-gradient-pulse">
      <div className="text-center p-6 bg-white rounded-lg shadow-xl w-full max-w-md animate-fade-in">
        <TbError404 className="text-6xl text-red-600 animate-bounce" />
        <h1 className="mt-4 text-4xl font-bold text-gray-800 animate-slide-in">Oops! Page Not Found</h1>
        <p className="mt-2 text-lg text-gray-600">We can't find the page you're looking for.</p>
        <a href="/" className="mt-6 inline-block px-6 py-3 text-lg font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-300">Go Back Home</a>
      </div>
    </div>
  )
}

export default Page404;
