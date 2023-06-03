import React, { useState } from "react";
import FormField from "../components/FormField";
import { suprisePrompts } from "../assets/constants";
import { useNavigate } from "react-router-dom";
import FileSaver from "file-saver";

const Create = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
    size: "",
  });
  const [generating, setGenerating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [err, setErr] = useState(false);

  //Post image in database
  const postImage = async () => {
    if (form.prompt && form.photo) {
      setLoading(true);

      try {
        const res = await fetch(
          `${import.meta.env.VITE_REACT_URL}/api/v1/post`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          }
        );

        await res.json();
        navigate("/");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please Generate an image to share");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //Get a random prompt
  const surpriseMe = () => {
    const randomIndex = Math.floor(Math.random() * suprisePrompts.length);
    setForm({ ...form, prompt: suprisePrompts[randomIndex] });
  };

  //Generate Image functionalty
  const generateImage = async () => {
    setShowForm(false);
    setGenerating(true);
    if (form.prompt) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_URL}/api/v1/openai`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: form.prompt }),
          }
        );

        const data = await response.json();

        setForm({ ...form, photo: `data:image/jpg;base64,${data.photo}` });
      } catch (error) {
        setErr(true);
      } finally {
        setGenerating(false);
      }
    }
  };

  //Download functionality
  const downloadImage = async (_id, photo) => {
    FileSaver.saveAs(photo, `untitled-${_id}.jpg`);
  };

  return (
    <section className="p-5 pt-0 lg:p-10 lg:pt-10 max-w-7xl mx-auto xl:w-available lg:w-full w-screen h-full_image overflow-scroll no_scroll">
      <div className="max-w-2xl font-medium pb-10">
        <h1 className="text-4xl leading-relaxed">
          {!err
            ? "Unleash Your imaginations"
            : "Your prompt may contain text that is not allowed by our safety system."}
        </h1>
        {showForm ? (
          <form>
            <div className="py-10 flex flex-col lg:flex-row items-center">
              <div className="flex flex-col gap-10 w-full">
                <FormField
                  label="Enter your Name"
                  name="name"
                  type="text"
                  placeholder="John Smith"
                  value={form.name}
                  handleChange={handleChange}
                />
                <FormField
                  label="Enter the Prompt"
                  name="prompt"
                  type="text"
                  placeholder="Describe your desired image"
                  value={form.prompt}
                  handleChange={handleChange}
                  resize={true}
                  surprise
                  surpriseMe={surpriseMe}
                  generateImage={generateImage}
                  button
                />
              </div>
            </div>
          </form>
        ) : (
          <>
            <div
              className={`relative max-w-2xl mx-auto my-5 flex items-center justify-center aspect-square ${
                generating && "bg-lighter/50"
              } rounded-lg`}
            >
              {/* Show generating loader */}
              {generating && (
                <span className="animate-pulse text-xl">Generating...</span>
              )}

              {/* If there's an error show this error image */}
              <img
                className={`${err ? "block" : "hidden"} rounded-lg`}
                src="https://cdn.openai.com/labs/assets/images/errors/task_error_generic.webp"
                alt="Error"
              />

              {/* If image gets genrated then display it */}
              {form.photo && (
                <>
                  <img
                    src={form.photo}
                    alt="AI generated image"
                    className="w-full h-full rounded-lg"
                  />
                  <button className="absolute bottom-5 right-5 bg-lighter p-2 rounded-full hover:bg-hover/50">
                    <svg
                      onClick={() => downloadImage(form.name, form.photo)}
                      width="30"
                      height="30"
                      fill="currentColor"
                      className="cursor-pointer"
                      viewBox="0 0 16 16"
                    >
                      <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
                    </svg>
                  </button>
                </>
              )}
            </div>
            <div
              className={`${
                form.photo ? "flex": "hidden"
              } items-center justify-between max-w-2xl mx-auto`}
            >
              <button
                onClick={postImage}
                className="px-5 flex-1 py-2 md:w-max bg-alternative text-white rounded-lg"
              >
                {loading ? "Sharing..." : "Share with Community"}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Create;
