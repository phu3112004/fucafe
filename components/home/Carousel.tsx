"use client";
import { Carousel, Skeleton } from "antd";
import { Banner } from "@/types/banner-types";
import { useState, useEffect } from "react";

const CarouselComponent = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBanners = async () => {
    setLoading(true);
    const res = await fetch("/api/carousel");
    const data = await res.json();
    setBanners(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return loading ? (
    <Skeleton.Node active={true} style={{ width: "100%", height: 500 }} />
  ) : (
    <>
      <Carousel arrows infinite={true} autoplay>
        {banners.map((banner) => (
          <div key={banner._id} className="relative h-[500px] w-full">
            <a href={banner.linkTo} target="_blank" rel="noopener noreferrer">
              <img
                src={banner.imageUrl}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
            </a>
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default CarouselComponent;
