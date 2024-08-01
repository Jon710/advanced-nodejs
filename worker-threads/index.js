import express from "express";
import { Worker } from "node:worker_threads";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();

async function startWorker() {
  return new Promise((resolve, reject) => {
    const currentFolder = dirname(fileURLToPath(import.meta.url));
    const worker = new Worker(currentFolder + "/worker.js");
    worker.postMessage({ videoPath: "./test-file.wmv", outputPath: "./converted-file.webm" });
    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0)
        reject(
          new Error(`Worker ${worker.threadId} stopped with exit code ${code}`)
        );
      console.log(`Worker ${worker.threadId} exited!`);
    });
  });
}

app.post("/convert-video", async (req, res) => {
  // const { videoPath } = req.query;

  // if (!videoPath) return res.status(400).send("Missing video!");

  try {
    await startWorker();
    res.send("Video conversion successful");
  } catch (error) {
    console.error("Error converting video:", error);
    res.status(500).send("Video conversion failed");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
