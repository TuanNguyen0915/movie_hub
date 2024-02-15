import { Dispatch, SetStateAction } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface IProps {
  setOpenVideo: Dispatch<SetStateAction<boolean>>;
  selectedKey: string;
}

const PlayVideo = ({ setOpenVideo, selectedKey }: IProps) => {
  const handleClick = () => {
    if (setOpenVideo) setOpenVideo(false);
  };

  return (
    <div className="fixed inset-4 z-20 mx-auto flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.8)]">
      <div className="flex h-[700px] w-[700px] flex-col gap-10 backdrop-blur-lg bg-black/40 p-10">
        <div className="flex w-full justify-end">
          <IoIosCloseCircleOutline
            className="scale-[2] text-red-500 hover:text-white"
            onClick={handleClick}
          />
        </div>
        <iframe
          allowFullScreen
          width="620"
          height="515"
          src={`https://www.youtube.com/embed/${selectedKey}`}
        />
      </div>
    </div>
  );
};

export default PlayVideo;
