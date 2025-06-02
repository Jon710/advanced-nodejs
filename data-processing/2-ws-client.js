const WebSocket = require("ws");

const ws = new WebSocket("ws://localhost:8080");

ws.on("open", () => console.log("Connected to server"));

ws.on("message", (data) => {
  const stockUpdate = JSON.parse(data);
  console.log("Received stock update:", stockUpdate);
});

ws.on("error", (error) => {
  console.error("WebSocket error:", error);
});

ws.on("close", () => {
  console.log("Disconnected from server");
});
