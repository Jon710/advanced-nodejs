const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (webSocket) => {
  console.log("connected");

  // simulate real-time data feed
  const interval = setInterval(() => {
    const stockUpdate = {
      symbol: "AAPL",
      price: (Math.random() * 150).toFixed(2),
      timestamp: new Date(),
    };

    console.log("Sending stock update:", stockUpdate);
    webSocket.send(JSON.stringify(stockUpdate));
  }, 1000);

  webSocket.on("close", () => {
    console.log("client disconnected!");
    clearInterval(interval);
  });
});
