// import React from 'react'

// export default function Start() {
//   return (
//     <div>this is note intro page!!!</div>
//   )
// }

// import Link from "next/link"
import { Link } from "react-router-dom";


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-white">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">Notes App</h1>
      <p className="text-gray-600 mb-8">Your personal note-taking companion!!!!</p>
      <div className="flex gap-4">
        <Link
          to="/signup"
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="px-6 py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
        >
          Log In
        </Link>
      </div>
    </main>
  )
}

