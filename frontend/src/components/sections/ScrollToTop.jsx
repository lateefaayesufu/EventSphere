import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from "lenis/react";

const ScrollToTop = () => {
  
    const { pathname } = useLocation();

    const lenis = useLenis();

    useEffect(() => {
     
        if (lenis) {
            
            lenis.scrollTo(0, { immediate: true });
        }
    }, [lenis, pathname]); 


    return null;
};

export default ScrollToTop;