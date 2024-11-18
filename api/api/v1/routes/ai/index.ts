import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

import { ReqHandler } from "perstorp";

export const post: ReqHandler = async ({ res, data }) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: "Du är en hjälpsam assistent som hjälper användaren att skriva personliga brev baserat på användarens cv och en plats annons. Formatet ska vara i HTML och inget annat. Strunta i Head och Body taggar samt backticks och html.",
          },
        ],
      },
      {
        role: "user",
        content: `Hej! Jag behöver hjälp att skriva ett personligt brev för en jobbansökan. Här är mitt cv: ${JSON.stringify(
          data.cv.cv
        )} och här är annonsen ${
          data.jobAd
        }. Va noga med att utgå ifrån mina erfarenheter och kvalifikationer i mitt cv.`,
      },
    ],
  });

  res.json({ coverLetter: completion.choices[0].message.content });
};
