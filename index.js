import http from "http";
import { app } from "./app.js";
import { WebSocketServer, WebSocket } from "ws";
import { connectDatabase } from "./configs/db.js";
import { Gadget } from "./models/gadgets.js";
import { messageHandler } from "./messageHandler.js";

const server = http.createServer(app);

connectDatabase();

// await Gadget.create([
//   {
//     name: "groundLight",
//     state: false,
//   },
//   {
//     name: "door",
//     state: false,
//   },
//   {
//     name: "powerSocket",
//     state: false,
//   },
//   {
//     name: "level1Light",
//     state: false,
//   },
//   {
//     name: "allLights",
//     state: false,
//   },
// ]);

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.on("message", async (data) => {
    console.log(`Received message => ${data}`);
    const activity = await messageHandler(JSON.parse(data));
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(activity));
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
  ws.on("error", (error) => {
    console.log(`Error: ${error.message}`);
  });
  //   ws.send("Hello, I am a WebSocket server");
});

server.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
