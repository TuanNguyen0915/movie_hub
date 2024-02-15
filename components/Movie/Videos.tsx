"use client";
import { IVideo } from "@/types";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "swiper/css";
import { useState } from "react";
import PlayVideo from "./PlayVideo";

const Videos = ({ videos }: { videos: IVideo[] }) => {
  videos.sort((a: any, b: any) => {
    const typeA = a.type.toLowerCase();
    const typeB = b.type.toLowerCase();
    if (typeB < typeA) {
      return -1;
    }
    if (typeB > typeA) {
      return 1;
    }
    // names must be equal
    return 0;
  })
  const [openVideo, setOpenVideo] = useState(false);
  const [selectedKey, setSelectKey] = useState("");

  const handleClick = (getKey: string) => {
    setOpenVideo(true);
    setSelectKey(getKey);
  };

  return (
    <div className="mx-auto w-full">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          1024: {
            slidesPerView: 3.5,
            spaceBetween: 50,
          },
          1366: {
            slidesPerView: 5.5,
            spaceBetween: 50,
          },
        }}
        scrollbar={{ draggable: true }}
        modules={[Autoplay, Pagination]}
      >
        {videos.map((video) => (
          <SwiperSlide key={video.id}>
            <div
              className="flex h-[150px] w-[150px] rounded-lg border border-transparent hover:border-white 2xl:h-[300px] 2xl:w-[300px]"
              onClick={() => handleClick(video.key)}
            >
              <Image
                src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`}
                width={1000}
                height={1000}
                alt={video.id}
                className="flex-1 rounded-lg"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {openVideo && (
        <PlayVideo setOpenVideo={setOpenVideo} selectedKey={selectedKey} />
      )}
    </div>
  );
};

export default Videos;
