import React, { useState, useEffect } from "react";
import img1 from '../assets/pexels-cottonbro-4065133.jpg';
import img2 from '../assets/pexels-caio-56759.jpg';
import img3 from '../assets/pexels-canvastudio-3153198.jpg';
import img4 from '../assets/pexels-shvetsa-3727459.jpg';

const Home = () => {
  // Set up a state to track the current slide index
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [img1, img2, img3, img4];

  // Function to change the slide
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  useEffect(() => {
    // Set an interval to change the slide every 3 seconds (adjust as needed)
    const slideInterval = setInterval(nextSlide, 3000);
    
    // Clear interval on component unmount
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <>
      {/* Container for the whole content */}
      <div className="flex flex-col items-center justify-center mt-16  w-screen ml-[0%] mt-[10%]">
        {/* Image Slides Section */}
        <div className="relative w-[80%] h-[800px] mx-auto overflow-hidden border-2 border-gray-300 rounded-lg bg-gray-50 shadow-lg mb-16">
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center pointer-events-none">
            <h1 className="text-4xl text-yellow-500 text-shadow-xl mb-24 z-10">Innovative Solution,<br /> Reliable Delivery</h1>
            <input type="text" placeholder="Search..." className="w-2/5 p-3 text-lg rounded-full shadow-md z-10 pointer-events-auto" />
          </div>

          {/* Image slides */}
          {images.map((img, index) => (
            <div
              key={index}
              className={`slide fade absolute w-full h-full ${index === currentSlide ? 'block' : 'hidden'}`}
            >
              <img src={img} alt={`Image ${index + 1}`} className="object-cover w-full h-full rounded-lg" />
            </div>
          ))}
        </div>

        {/* Freelance Solution Section */}
        <section className="py-16 bg-gray-100 w-full">
          <div className="max-w-screen-xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-8">The <span className="text-green-500">premium</span> freelance solution for businesses</h1>
            <ul className="text-lg text-gray-800 space-y-4">
              <li><strong className="text-green-500">Dedicated hiring experts:</strong> Count on an account manager to find the right talent.</li>
              <li><strong className="text-green-500">Satisfaction guarantee:</strong> Order confidently with guaranteed refunds.</li>
              <li><strong className="text-green-500">Advanced management tools:</strong> Seamlessly integrate freelancers into your team.</li>
              <li><strong className="text-green-500">Flexible payment models:</strong> Pay per project or opt for hourly rates.</li>
            </ul>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-gray-200 text-center w-full">
          <div className="max-w-screen-xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-gray-800 mb-8">About Nexify</h2>
            <p className="text-lg text-gray-700 mb-12 max-w-4xl mx-auto">
              Nexify is an innovative platform designed to bridge the gap between freelancers and clients, enabling seamless collaboration and communication to accomplish tasks efficiently. It offers a dynamic ecosystem that not only simplifies project management but also enhances the user experience through unique features. With real-time messaging and an instant meeting option, Nexify ensures effective communication, allowing users to quickly address project needs and streamline their workflow.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
