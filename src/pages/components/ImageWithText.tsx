import React from "react";
import Image from "next/image";
interface ImageWithTextProps {
  heading?: string;
  image: string;
  alt?: string;
  title: string;
  description: string;
  alignment?: "left" | "right";
}

const ImageWithText: React.FC<ImageWithTextProps> = ({
  heading,
  image,
  alt = "Image",
  title,
  description,
  alignment = "left",
}) => {
  return (
    <section className="w-full px-4 py-3">
      {heading && (
        <h2 className="text-3xl font-bold text-center my-4 text-black">
          {heading}
        </h2>
      )}

      <div
        className={`flex flex-col md:flex-row items-center gap-6 ${
          alignment === "right" ? "md:flex-row-reverse" : ""
        }`}
      >
        <div className="w-full md:w-1/2">
          <Image
            src={image}
            alt={alt}
            width={1920}
            height={450}
            className="object-cover w-full rounded-lg shadow-md"
          />
        </div>

        <div className="w-full md:w-1/2 text-center flex flex-col justify-start items-center text-slate-700">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="mt-4 text-gray-600">{description}</p>
        </div>
      </div>
    </section>
  );
};

export default ImageWithText;
