import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import apiClient from "../utils/axios";
import { GalleryItem } from "../types";

const Carousel: React.FC = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
  };

  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await apiClient.get("/galleries");
      setGallery(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  return (
    <div className="relative w-full h-[20rem] mb-4">
      <Slider {...settings}>
        {gallery.slice(0, 5).map((image, index) => (
          <div className="relative" key={index}>
            <img
              src={image.url}
              className="w-full h-[20rem] object-cover md:rounded-md"
              alt={`Slide ${index}`}
            />
            <Link
              to={"/gallery"}
              className="text-lg bg-black/10 flex items-center justify-center gap-2 border border-white px-5 py-1 rounded-lg absolute bottom-3 left-1/2 -translate-x-1/2 text-white "
            >
              <span className="">{image.category.charAt(0).toUpperCase() + image.category.slice(1)}</span>
              <FaAngleRight size={15} />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
