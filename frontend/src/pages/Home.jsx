import Navbar from "../components/sections/ui/Navbar";
import HeroSection from "../components/sections/landing/HeroSection";
import LiquidEther from "../components/sections/ui/LiquidEther";
import FeaturedEvents from "../components/sections/landing/FeaturedEvents";
import Footer from "../components/sections/ui/Footer";
import Events from "../components/sections/events/Events";

import Mission from "../components/sections/landing/Mission";
import CommunityReviews from "../components/sections/landing/CommunityReviews";
const Home = function () {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-[150vh] -z-10 bg-gradient-to-r from-[#1E1F2E] via-[#1A1B1B] to-[#2B2426]">
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>
      <div className="">
        <Navbar />
        <HeroSection />
        <div className="bg-gradient-to-r from-[#1E1F2E] via-[#1A1B1B] to-[#2B2426]">
          <FeaturedEvents />
          <Mission />
          <CommunityReviews />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;

  // <section>
  //     <div>
  //       <div className="  ">
  //           <div className="flex   gap-5   grid-cols-4">
  //           <img className="h-65 mt-7 w-55" src="IMG-20250911-WA0046.jpg" alt="" />
  //           <img className="h-65 mt-7 w-55" src="IMG-20250911-WA0046.jpg" alt="" />
  //           <img className="h-85 mt-7 w-55" src="IMG-20250911-WA0045.jpg" alt="" />
  //           </div>
            
  //       </div>
  //     </div>
  //   </section>