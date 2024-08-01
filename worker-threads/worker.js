import { parentPort } from "node:worker_threads";
import ffmpeg from "fluent-ffmpeg";

async function convertVideo({ videoPath, outputPath }) {
  console.log(`Starting conversion for ${videoPath}`);

  ffmpeg(videoPath)
    .toFormat("webm")
    .on("end", function () {
      console.log("Conversion finished");
      parentPort.postMessage(
        `Worker finished converting ${videoPath} to WEBM.`
      );
    })
    .on("error", function (err) {
      console.log("An error occurred: " + err.message);
      parentPort.postMessage(`[ERROR] ${err.message}`);
    })
    .save(outputPath);
}

parentPort.on("message", (msg) => {
  console.log("Received message from parent:", msg);
  convertVideo(msg);
});
