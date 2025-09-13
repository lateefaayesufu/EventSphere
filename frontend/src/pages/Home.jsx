import Navbar from "../components/sections/ui/Navbar";
import HeroSection from "../components/sections/landing/HeroSection";

import FeaturedEvents from "../components/sections/landing/FeaturedEvents";
import Footer from "../components/sections/ui/Footer";

import Mission from "../components/sections/landing/Mission";
import CommunityReviews from "../components/sections/landing/CommunityReviews";

const Home = function () {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-[150vh] -z-10 bg-gradient-to-r from-[#1E1F2E] via-[#1A1B1B] to-[#2B2426] overflow-hidden"></div>
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
