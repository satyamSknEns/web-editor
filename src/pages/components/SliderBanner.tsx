import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import Link from "next/link";

interface Banner {
  id: string;
  mobileImage: string;
  desktopImage: string;
  alt: string;
  link: string;
}

interface SliderBannerProps {
  banners?: Banner[]; 
}

interface CustomArrowProps {
  onClick?: () => void;
}

const SliderBanner: React.FC<SliderBannerProps> = (props) => {
  const [sliderWidth, setSliderWidth] = useState<number>(0);
  const sliderRef = useRef<Slider | null>(null);

  const sliderBanners = props.banners ?? []; 

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateWidth = () => {
        setSliderWidth(window.innerWidth);
      };

      updateWidth();
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }
  }, []);

  const CustomPrevArrow: React.FC<CustomArrowProps> = ({ onClick }) => (
    <button
      className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 bg-white text-[#FB4546] border border-[#FB4546] p-2 w-[30px] h-[30px] rounded-full hover:bg-[#FB4546] hover:text-white hover:border-white flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <ArrowBackIosNewIcon fontSize="small" />
    </button>
  );

  const CustomNextArrow: React.FC<CustomArrowProps> = ({ onClick }) => (
    <button
      className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 bg-white text-[#FB4546] border border-[#FB4546] p-2 w-[30px] h-[30px] rounded-full hover:bg-[#FB4546] hover:text-white hover:border-white flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <ArrowForwardIosIcon fontSize="small" />
    </button>
  );

  const settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    customPaging: () => (
      <div
        className="w-3 h-3 bg-white rounded-full cursor-pointer hover:bg-[#FB4546] list_items border-[#FB4546] border-[1px]"
        style={{ margin: "0 5px" }}
      />
    ),
    appendDots: (dots:React.ReactNode) => (
      <div
        style={{
          position: "absolute",
          bottom: "-25px",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <ul className="flex items-center">{dots}</ul>
      </div>
    ),
  };

  return (
    <div className="bannerImage flex items-center justify-center w-full relative">
      {sliderBanners.length > 0 ? (
        <Slider {...settings} ref={sliderRef} className="w-full">
          {sliderBanners.map((image) => (
            <Link
              href={image.link}
              key={image.id}
              className="relative w-full outline-none"
            >
              <Image
                src={sliderWidth > 767 ? image.desktopImage : image.mobileImage}
                alt={image.alt}
                width={1920}
                height={sliderWidth > 767 ? 600 : 400}
                className="object-cover"
              />
            </Link>
          ))}
        </Slider>
      ) : (
        <div className={`h-[400px] flex items-center justify-center text-gray-500`}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default SliderBanner;
