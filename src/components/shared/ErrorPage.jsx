import { FaExclamationTriangle } from "react-icons/fa"


function ErrorPage({ message }) {
  return (
    <div className="flex flex-col justify-center items-center px-6 py-12">
        <FaExclamationTriangle className="text-red-600 text-6xl mb-4"/>
        <p className="text-gray-600 text-center mb-6">{message ? message : "An unexpected error has occured"}</p>
    </div>
  )
}

export default ErrorPage
