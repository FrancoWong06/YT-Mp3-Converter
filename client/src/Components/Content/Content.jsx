import React, { useState } from "react";
import "./Content.css";

const convertUrl = "yt-mp3-converter-imrf.vercel.app/convert"

export default function Content() {
  const [url, setUrl] = useState("");

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const resetInput = () => {
    setUrl("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(convertUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "audio.mp3"; 
        link.click();
        resetInput();
      } else {
        console.log("Failed to fetch MP3.");
      }
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <div className="mainContent">
      <h3 className="info">YouTube to MP3 Converter</h3>
      <form className="downloadForm" onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter YouTube URL"
          value={url}
          onChange={handleChange}
          className="inputUrl"
          required
        />
        <button className="downloadBtn" type="submit" >
          Download
        </button>
      </form>
    </div>
  );
}
