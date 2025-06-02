const fs = require("fs");

const readStream = fs.createReadStream("input.txt", { highWaterMark: 16 });
const writeStream = fs.createWriteStream("output.txt");

readStream.on("data", (chunk) => {
  console.log("chunk received: ", chunk);
  writeStream.write(chunk);
});

readStream.on("end", () => console.log("finished streaming!"));
