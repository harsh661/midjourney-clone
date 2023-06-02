import React, { useState } from "react";
import FormField from "../components/FormField";
import { suprisePrompts } from "../assets/constants";
import {useNavigate} from 'react-router-dom'

const Create = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
    size: ""
  });
  const [generating, setGenerating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [showImg, setShowImg] = useState(false);

  const postImage = async () => {

    if(form.prompt && form.photo) {
      setLoading(true)

      try {
        const res = await fetch(`${import.meta.env.VITE_REACT_URL}/api/v1/post`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
        })

        await res.json()
        navigate('/')

      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    } else {
      alert('Please Generate an image to share')
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const surpriseMe = () => {
    const randomIndex = Math.floor(Math.random() * suprisePrompts.length);
    setForm({ ...form, prompt: suprisePrompts[randomIndex] });
  };

  const generateImage = async () => {
    setShowForm(false);
    setGenerating(true);
    if (form.prompt) {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_URL}/api/v1/openai`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        const data = await response.json();

        setForm({ ...form, photo: `data:image/jpg;base64,${data.photo}` });
        setShowImg(true);
      } catch (error) {
        console.log(error);
      } finally {
        setGenerating(false);
      }
    }
  };

  return (
    <section className="p-5 lg:p-10 xl:w-available lg:w-full w-screen overflow-hidden">
      <div className="max-w-2xl mx-auto font-medium pb-10">
        <h1 className="text-4xl leading-relaxed">Unleash your Imaginations</h1>
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
              className={`max-w-2xl mx-auto my-5 flex items-center justify-center aspect-square ${
                generating && "bg-lighter/50"
              } rounded-lg`}
            >
              {generating && (
                <span className="animate-pulse text-xl">Generating...</span>
              )}
              {showImg && (
                <img
                  src={form.photo}
                  alt="AI generated image"
                  className="w-full h-full rounded-lg"
                />
              )}
            </div>
            <div className="flex items-center justify-center max-w-2xl mx-auto">
              <button
                onClick={postImage}
                className="px-5 py-2 md:w-max bg-accent text-white rounded-lg"
              >
                {loading ? "Sharing...": "Share with Community"}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Create;
