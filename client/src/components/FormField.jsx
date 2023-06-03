import React from "react";
import TextareaAutosize from "react-textarea-autosize";

const FormField = ({
  label,
  name,
  type,
  placeholder,
  value,
  handleChange,
  resize,
  surprise,
  surpriseMe,
  generateImage,
  button,
}) => {
  return (
    <div className="flex flex-col gap-3 text-zinc-400">
      <div className="flex items-center gap-10 w-full justify-between md:justify-normal">
        <label htmlFor={name} className="text-xl">
          {label}
        </label>
        {surprise && (
          <div
            onClick={surpriseMe}
            className="px-3 py-2 text-xs bg-lighter text-white rounded-full cursor-pointer"
          >
            Surprise Me
          </div>
        )}
      </div>
      {resize ? (
        <TextareaAutosize
          required
          id={name}
          name={name}
          minRows={5}
          className="bg-lighter border border-lighter placeholder:text-zinc-400/30 outline-none py-4 px-4 lg:px-8 text-lg rounded-lg w-full"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      ) : (
        <input
          required
          type={type}
          name={name}
          id={name}
          className="bg-lighter border border-lighter placeholder:text-zinc-400/30 outline-none py-4 px-4 lg:px-8 text-lg rounded-lg w-full"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      )}
      {button && (
        <button
          onClick={generateImage}
          className={`${value.length ? 'block' : 'hidden'} px-3 my-5 w-full py-2 md:py-3 cursor-pointer bg-accent text-white rounded-lg`}
        >
          Generate Image
        </button>
      )}
    </div>
  );
};

export default FormField;
