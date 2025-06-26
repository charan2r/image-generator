import { useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const imageGenerator = async () => {
    if (!prompt) return alert("Please enter a prompt");

    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/images/generations",

        {
          model: "dall-e-2",
          prompt: prompt,
          n: 1,
          size: "512x512",
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      setImage(response.data.data[0].url);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-600">
      <h1 className="text-3xl font-bold mb-20">AI Image Generator</h1>
      <input
        type="text"
        placeholder="Describe what you want to generate here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="border border-gray-400 p-2 rounded-md w-96 mb-4"
      />

      <button
        className="bg-blue-600 text-white p-2 rounded px-4 mt-3"
        onClick={imageGenerator}
        disabled={loading}
      >
        {loading ? "Generating Image..." : "Generate Image"}
      </button>

      {image && (
        <div className="mt-8">
          <img
            src={image}
            alt="AI generated image"
            className="rounded-md w-96 shadow-lg"
          />
        </div>
      )}
    </div>
  );
}

export default App;
