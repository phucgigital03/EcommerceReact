


function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl text-slate-800 text-center mb-8 font-bold">
            About
        </h1>
        <div className="flex flex-col lg:flex-row justify-center items-center mb-12">
            <div className="w-full text-center md:w-1/2 md:text-left">
                <p className="text-lg mb-4">
                    An e-commerce website is an online platform that 
                    allows businesses and individuals to buy and sell 
                    products or services over the internet. It provides 
                    a seamless shopping experience by integrating product 
                    listings, payment processing, order management, and 
                    customer service.
                </p>
            </div>

            <div className="w-full md:w-1/2 mb-6 md:mb-0">
                <img 
                    src="https://embarkx.com/sample/placeholder.png"
                    alt="About us" 
                    className="w-full h-auto rounded-lg shadow-lg transition-transforn ease-in duration-150 hover:scale-105"
                />
            </div>
        </div>

        {/* <div>
            <h1 className="text-4xl text-slate-800 text-center font-bold">
                Our Products
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            </div>
        </div> */}
    </div>
  )
}

export default About