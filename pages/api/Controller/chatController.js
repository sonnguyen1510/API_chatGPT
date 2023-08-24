const data = require("../data");
const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // defaults to process.env["OPENAI_API_KEY"]
});

module.exports = {
  getFirstTime: async (req, res) => {
    let Food_data = "";
    //get list food
    data.forEach((element) => {
      Food_data += element["name"] + ",";
    });

    //get user question
    let userQuestion = req.body.userQuestion;
    let conversation = req.body.conversation;
    conversation.push({
      role: "user",
      content: `${userQuestion}on this list : ${Food_data}and. Make it short clear and concise`
    });
    const completion = await openai.chat.completions.create({
      messages: conversation,
      model: "gpt-3.5-turbo"
    });

    conversation.push(completion.choices[0]["message"]);

    res.json({
      conversation: conversation,
      botAnswer: completion.choices[0]["message"]
    });
  },

  getSecondTimeAbove: async (req, res) => {
    /** 
    Request body:
    {
      conversation :[
        {
          "role" : @param {String},
          "message" : @param {String}
        }
      ],
      userQuestion :  @param {String} 
    }
  */
    const userQuestion = req.body.userQuestion;
    const conversation = req.body.conversation;

    conversation.push({
      role: "user",
      content: `${userQuestion}. Make it short clear and concise`
    });

    const completion = await openai.chat.completions.create({
      messages: conversation,
      model: "gpt-3.5-turbo"
    });

    conversation.push(completion.choices[0]["message"]);

    res.json({
      conversation: conversation,
      botAnswer: completion.choices[0]["message"]
    });
  }
};
