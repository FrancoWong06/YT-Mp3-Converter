const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const { exec } = require('child_process');

const fs = require('fs');
const path = require('path');

app.use(cors(
  {
    origin:["https://yt-mp3-converter-qwac.vercel.app/"],
    method: ["POST", "GET"],
    credential: true
  }));
app.use(express.json());

app.get('/', (req,res) => {
  res.send('TY-Mp3-Converter')
})

app.post("/convert", async (req, res) => {
  const url = req.body.url;

  try {
    if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
      return res.status(400).json({ error: "Invalid YouTube URL" });
    }

    const tempFilename = path.join(__dirname, 'temp_audio.mp3');

    const command = `yt-dlp -f bestaudio[ext=m4a] --extract-audio --audio-format mp3 --output "${tempFilename}" ${url}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).json({ error: 'Failed to convert the video to MP3.' });
      }

      res.setHeader('Content-Disposition', `attachment; filename="audio.mp3"`);
      res.setHeader('Content-Type', 'audio/mp3');

      const fileStream = fs.createReadStream(tempFilename);
      fileStream.pipe(res);

      fileStream.on('end', () => {
        fs.unlinkSync(tempFilename);
      });
    });

  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ error: "Failed to download and convert the MP3." });
  }

});

app.listen(port, () => {
  console.log("Server running on port 3000");
});
