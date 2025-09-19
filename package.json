import express from 'express';
import { Client, middleware } from '@line/bot-sdk';
import { getFortune } from './fortune';

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN!,
  channelSecret: process.env.CHANNEL_SECRET!
};

const client = new Client(config);
const app = express();
app.use(middleware(config));

app.post('/webhook', (req, res) => {
  Promise.all(req.body.events.map(async (event) => {
    if (event.type === 'message' && event.message.type === 'text') {
      const birthday = event.message.text.trim();
      const fortune = getFortune(birthday);
      const reply = `${birthday}生まれのあなたの運勢は「${fortune.title}」！\n${fortune.message}\n👉 詳しくはこちら：${fortune.link}`;
      await client.replyMessage(event.replyToken, { type: 'text', text: reply });
    }
  })).then(() => res.end());
});

app.listen(process.env.PORT || 3000);
