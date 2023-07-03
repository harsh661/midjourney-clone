import React from "react";
import FileSaver from "file-saver";

const downloadImage = async (_id, photo) => {
  FileSaver.saveAs(photo, `untitled-${_id}.jpg`);
};



const PostCard = ({ photo, prompt, name, _id }) => {
  return (
    <div className="rounded-lg max-w-lg group animate-slide-in bg-lighter relative flex items-center">
      <a target="_blank" href={photo}>
      <img src={photo} alt="AI image" className="w-full h-full rounded-lg" loading="lazy"/>
      </a>
      <div className="hidden md:group-hover:flex cursor-default flex-col gap-2 p-3 m-2 rounded-md bg-main text-light_font text-sm absolute bottom-0 right-0 left-0">
        <span className="text-sm text-alternative">/v5_upscale</span>
        <p>{prompt}</p>

        <div className="flex w-full items-center justify-between pt-1">
          <span className="flex items-center gap-1">
            <span className="rounded-full w-5 h-5 flex items-center justify-center bg-green-600 text-white">{name[0]}</span>
            <span className="font-medium">{name}</span>
          </span>
          <svg
            onClick={() => downloadImage(_id, photo)}
            width="20"
            height="20"
            fill="currentColor"
            className="cursor-pointer"
            viewBox="0 0 16 16"
          >
            <path
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
