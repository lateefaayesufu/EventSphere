import React, { useRef } from "react";
import Navbar from "../components/sections/ui/Navbar";
import Footer from "../components/sections/ui/Footer";

const Gallery = () => {
  // Ref for the video element
  const videoRef = useRef(null);
   const videoRef1 = useRef(null);
const videoRef2 = useRef(null);
const videoRef3 = useRef(null);
const videoRef4 = useRef(null);

  const handleMouseEnter1 = () => {
  if (videoRef1.current) {
    videoRef1.current.play();
  }
};

const handleMouseLeave1 = () => {
  if (videoRef1.current) {
    videoRef1.current.pause();
    videoRef1.current.currentTime = 0;
  }
};

const handleMouseEnter2 = () => {
  if (videoRef2.current) {
    videoRef2.current.play();
  }
};

const handleMouseLeave2 = () => {
  if (videoRef2.current) {
    videoRef2.current.pause();
    videoRef2.current.currentTime = 0;
  }
};

  const handleMouseEnter3 = () => {
  if (videoRef3.current) {
    videoRef3.current.play();
  }
};

const handleMouseLeave3 = () => {
  if (videoRef3.current) {
    videoRef3.current.pause();
    videoRef3.current.currentTime = 0;
  }
};

const handleMouseEnter4 = () => {
  if (videoRef4.current) {
    videoRef4.current.play();
  }
};

const handleMouseLeave4 = () => {
  if (videoRef4.current) {
    videoRef4.current.pause();
    videoRef4.current.currentTime = 0;
  }
};

  return (
    <div className="min-h-screen  pt-32 pb-8 relative overflow-hidden bg-gradient-to-r from-[#1E1F2E] via-[#1A1B1B] to-[#2B2426]">
      <Navbar />
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Particles */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}

        {/* Large Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl" />
      </div>


<section  >
  <div class="max-w-7xl mx-auto text-center">
    <h2 className="relative text6xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">Media Gallery</h2>
    <p class="text-lg text-white mb-12">
      Discover our collection of timeless, classy, and statement evening wear.
    </p>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-5 ">

    
      <div class="bg-white h-96 ml-5 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300 justify-around">
        <div class="h-66  bg-cover bg-center"  > <img    src="Food15.jpg" alt="" /></div>
         
      </div>

       
   <div
  className="bg-white w h-96 ml-5 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
  onMouseEnter={handleMouseEnter1}
  onMouseLeave={handleMouseLeave1}
>
  <div className="h-96 bg-cover bg-center">
    <video
      ref={videoRef1}
      src="Video2.mp4"
      className="w-full h-full object-cover"
      muted
      loop
      playsInline
    />
  </div>
   
</div>


      
      <div class="bg-white h-96   ml-5 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
                <div class="h-96 bg-cover bg-center"  > <img   src="IMG-20250911-WA0046.jpg" alt="" /></div>
         
      </div>

      
      <div class="bg-white  h-96 ml-5 mr-7 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
                <div class="h-96 bg-cover bg-center"  > <img   src="Food5.jpg" alt="" /></div>
        
      </div>

      {/* -----------------------------= */}

       <div class="bg-white h-96 ml-5 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300 justify-around">
        <div class="h-66  bg-cover bg-center"  > <img    src="Food25.jpg" alt="" /></div>
         
      </div>

       
      <div class="bg-white  h-96 ml-5 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
               <div class="h-96 bg-cover bg-center"  > <img   src="Food.jpg" alt="" /></div>
        
      </div>

      
      <div class="bg-white h-96  ml-5 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
                <div class="h-96 bg-cover bg-center"  > <img   src="Food2.jpg" alt="" /></div>
        
      </div>

      
      <div class="bg-white  h-96 ml-5 mr-7 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
                <div class="h-96 bg-cover bg-center"  > <img   src="Food3.jpg" alt="" /></div>
        
      </div>
      

      {/* -----------------------------= */}

       <div class="bg-white h-96 ml-5 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300 justify-around">
        <div class="h-66  bg-cover bg-center"  > <img    src="Food4.jpg" alt="" /></div>
        
      </div>

       
         <div
  className="bg-white w h-96 ml-5 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
  onMouseEnter={handleMouseEnter3}
  onMouseLeave={handleMouseLeave3}
>
  <div className="h-96 bg-cover bg-center">
    <video
      ref={videoRef1}
      src="Video3.mp4"
      className="w-full h-full object-cover"
      muted
      loop
      playsInline
    />
  </div>
  </div>

      
      <div class="bg-white h-96   ml-5 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
                <div class="h-96 bg-cover bg-center"  > <img   src="Food24.jpg" alt="" /></div>
         
      </div>

      
      <div class="bg-white h-96   ml-5 mr-7 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
                <div class="h-96 bg-cover bg-center"  > <img   src="Food8.jpg" alt="" /></div>
         
      </div>

       {/* -----------------------------= */}

       <div class="bg-white h-96 ml-5 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300 justify-around">
        <div class="h-66  bg-cover bg-center"  > <img    src="Food23.jpg" alt="" /></div>
         
      </div>

       
      <div class="bg-white  h-96 ml-5 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
               <div class="h-96 bg-cover bg-center"  > <img   src="Food22.jpg" alt="" /></div>
         
      </div>

      
      <div class="bg-white h-96   ml-5 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
                <div class="h-96 bg-cover bg-center"  > <img   src="Food7.jpg" alt="" /></div>
         
      </div>

      
      <div class="bg-white h-96   ml-5 mr-7 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
                <div class="h-96 bg-cover bg-center"  > <img   src="Food21.jpg" alt="" /></div>
         
      </div>
       {/* -----------------------------= */}

       <div class="bg-white h-96 ml-5 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300 justify-around">
        <div class="h-66  bg-cover bg-center"  > <img    src="Food9.jpg" alt="" /></div>
         
      </div>

       
      <div class="bg-white  h-96 ml-5 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
               <div class="h-96 bg-cover bg-center"  > <img   src="Food10.jpg" alt="" /></div>
        
      </div>

      
      <div class="bg-white h-96   ml-5 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
                <div class="h-96 bg-cover bg-center"  > <img   src="Food11.jpg" alt="" /></div>
         
      </div>

      
      {/* ✅ Video Card with Hover-to-Play */}
           <div
  className="bg-white w-68 h-96 ml-5 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
  onMouseEnter={handleMouseEnter2}
  onMouseLeave={handleMouseLeave2}
>
  <div className="h-96 bg-cover bg-center">
    <video
      ref={videoRef2}
      src="Video1.mp4"
      className="w-full h-full object-cover"
      muted
      loop
      playsInline
    />
  </div>
   
</div>



       {/* -----------------------------= */}

        <div
  className="bg-white w-68 h-96 ml-5 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
  onMouseEnter={handleMouseEnter4}
  onMouseLeave={handleMouseLeave4}
>
  <div className="h-96 bg-cover bg-center">
    <video
      ref={videoRef2}
      src="Video4.mp4"
      className="w-full h-full object-cover"
      muted
      loop
      playsInline
    />
  </div>

   
</div>

       
      <div class="bg-white  h-96 ml-5 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
               <div class="h-76 bg-cover bg-center"  > <img className="h-96 w-96"  src="Food28.jpg" alt="" /></div>
         
      </div>

      
      <div class="bg-white h-96   ml-5 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
                <div class="h-96 bg-cover bg-center"  > <img   src="Food29.jpg" alt="" /></div>
         
      </div>

      
      <div class="bg-white h-96   ml-5 mr-7 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
                <div class="h-96 bg-cover bg-center"  > <img   src="Food30.jpg" alt="" /></div>
         
      </div>
      
    </div>

    


    
  </div>
</section>

       
      <Footer />
    </div>
  );
};

export default Gallery;
