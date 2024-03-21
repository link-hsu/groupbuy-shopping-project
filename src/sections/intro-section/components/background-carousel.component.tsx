import {
  backgroundImage1,
  backgroundImage2,
  backgroundImage3,
  backgroundImage4,
} from "@/assets";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const backgrounds = [
  backgroundImage1,
  backgroundImage2,
  backgroundImage3,
  backgroundImage4,
];

export const BackgroundCarousel: React.FC = () => {
  const [bgImageIndex, setBgImageIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setBgImageIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 15000);
    // }, 10000);
    return () => clearInterval(interval)
  }, []);

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgrounds[bgImageIndex]})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        animation: 'fadeInOut 15s infinite',
        // animation: 'fadeInOut 15s infinite',
        position: 'absolute',
        minHeight: '100vh',
        width: '100%',
        zIndex: 0,       
      }}
    />
  );
};
