const OpenAI = require("openai");
const express = require("express");

const app = express();
app.use(express.json());

const PORT = 3000;

const chatRouter = require("./Router/chatRouter");

app.use("/api/v1", chatRouter);

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
