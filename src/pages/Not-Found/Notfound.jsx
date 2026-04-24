import { Link } from "react-router-dom";

const Notfound = () => {
  return (
        <div className="flex flex-col items-center justify-center text-sm min-h-screen py-20">
            <h1 className="text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">404</h1>
            <div className="h-1 w-16 rounded bg-blue-500 my-5 md:my-5"></div>
            <h2 className="md:text-4xl text-4xl font-semibold text-gray-800">Page Not Found</h2>
            <p className="text-base mt-4 text-gray-500">Sorry, we couldn’t find the page you’re looking for.</p>
            <div className="flex items-center gap-4 mt-6">
        <Link 
          to="/">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 px-6 py-2 rounded-full text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
          >
          Go back home
          </button>
        </Link>
               <Link to="/contact">
          <button
            type="button"
            className="group flex items-center gap-2 px-6 py-2 rounded-full border border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
          >
          Contact support

          <svg
            className="group-hover:translate-x-1 mt-1 transition duration-300"
            width="15"
            height="11"
            viewBox="0 0 15 11"
            fill="none"
          >
        <path
          d="M1 5.5h13.092M8.949 1l5.143 4.5L8.949 10"
          stroke="#1F2937"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          />
          </svg>
        </button>
      </Link>
    </div>
  </div>
  )
}

export default Notfound