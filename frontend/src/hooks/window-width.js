import { useEffect, useState } from "react";

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeWindow = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", resizeWindow);
    
    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, []);
  
  return windowWidth;
};

export default useWindowWidth;
