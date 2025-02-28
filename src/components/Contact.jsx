import { FaEnvelope, FaPhone } from "react-icons/fa"



function Contact() {
  return (
    <div 
        className="flex flex-col justify-center items-center min-h-screen py-12 bg-cover bg-center"
        style={{backgroundImage: "url('https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"}}
    >
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
            <h1 className="text-4xl font-bold text-center mb-6">
                Contact us
            </h1>
            <p className="text-gray-400 text-center mb-4">
                We would love to hear form you! Please fill out the form below or contact us directly
            </p>

            <form action="#" className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600 ">
                        Name
                    </label>
                    <input 
                        type="text" 
                        required 
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 
                            focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 ">
                        Email
                    </label>
                    <input 
                        type="email" 
                        required 
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 
                            focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 ">
                        Message
                    </label>
                    <textarea 
                        rows={4}
                        required 
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 
                            focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <button
                    className="w-full py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-700 transition duration-200"
                >
                    Send Message
                </button>
            </form>

            <div className="mt-8 text-center">
                <h2 className="text-lg font-semibold">Contact Information</h2>
                <div className="flex flex-col items-center space-y-2 mt-4">
                    <div className="flex items-center">
                        <FaPhone className="text-blue-500 mr-2"/>
                        <span className="text-gray-400">
                            +0399158631
                        </span>
                    </div>
                    <div className="flex items-center">
                        <FaEnvelope className="text-blue-500 mr-2"/>
                        <span className="text-gray-400">
                            phuc@gmail.com
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Contact