import React from "react";
import Electrical from "@/assets/serviceIcons/electricity.png";
import Plumbing from "@/assets/serviceIcons/plumbing.png";
import Carpentry from "@/assets/serviceIcons/carpentry.png";
import Renovation from "@/assets/serviceIcons/renovation.png";
import Painting from "@/assets/serviceIcons/painting.png";
import Flooring from "@/assets/serviceIcons/flooring.png";
import Cleaning from "@/assets/serviceIcons/cleaning.png";
import Assembly from "@/assets/serviceIcons/assembly.png";
import Windows from "@/assets/serviceIcons/window.png";
import Roofing from "@/assets/serviceIcons/roofing.png";

const ServiceIcons = ({ title }: any) => {
  const getIcon = (serviceTitle: any) => {
    switch (serviceTitle) {
      case "Electrical":
        return <img src={Electrical.src} alt="Electrical" />;
      case "Plumbing":
        return <img src={Plumbing.src} alt="Plumbing" />;
      case "Carpentry":
        return <img src={Carpentry.src} alt="Carpentry" />;
      case "Roofing":
        return <img src={Roofing.src} alt="Roofing" />;
      case "Renovation":
        return <img src={Renovation.src} alt="Renovation" />;
      case "Painting":
        return <img src={Painting.src} alt="Painting" />;
      case "Flooring":
        return <img src={Flooring.src} alt="Flooring" />;
      case "Cleaning":
        return <img src={Cleaning.src} alt="Cleaning" />;
      case "Windows":
        return <img src={Windows.src} alt="Windows" />;
      case "Assembly":
        return <img src={Assembly.src} alt="Assembly" />;
      default:
        return null;
    }
  };

  return getIcon(title);
};

export default ServiceIcons;
