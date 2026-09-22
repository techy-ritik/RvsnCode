const dotenv = require("dotenv");
dotenv.config();
const { GoogleGenAI } = require("@google/genai");

exports.describedCategorySuggestion = async (req, res) => {
  try {
    console.log("req.body", req.body.expenseDescValue);
    const prompt = `suggest one single word category of expense for the description and don't add any extra character with it :- ${req.body.expenseDescValue}`;
    console.log("prompt", prompt);

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await ai.interactions.create({
      model: "gemini-3.5-flash-lite",
      input: prompt,
    });

    const aiSuggestedCategory = response.output_text;
    console.log(aiSuggestedCategory);

    res.status(200).json(aiSuggestedCategory);
  } catch (err) {
    console.log(err);
  }
};
