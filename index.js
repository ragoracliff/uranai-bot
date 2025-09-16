const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/webhook', async (req, res) => {
  const userMessage = req.body.events[0].message.text;
  const replyToken = req.body.events[0].replyToken;

  const gptResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: `誕生日占いして: ${userMessage}` }]
  }, {
    headers: { Authorization: `Bearer あなたのOpenAIのAPIキー` }
  });

  const replyText = gptResponse.data.choices[0].message.content;

  await axios.post('https://api.line.me/v2/bot/message/reply', {
    replyToken: replyToken,
    messages: [{ type: 'text', text: replyText }]
  }, {
    headers: { Authorization: `Bearer あなたのLINEアクセストークン` }
  });

  res.send('OK');
});

app.listen(3000);
