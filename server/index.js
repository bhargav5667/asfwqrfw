const io = require("socket.io")(5000, {
    cors: {
      origin: "*",
    },
  });
  
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
  
    socket.on("message", (data) => {
      console.log("Message received:", data); // Debugging
      io.emit("message", data); // Send to all users
    });
  
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
  