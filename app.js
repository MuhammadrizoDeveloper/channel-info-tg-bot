require("dotenv").config();
const express = require("express");
const { Api, TelegramClient } = require("telegram");
const TelegramBot = require("node-telegram-bot-api");
const { StringSession } = require("telegram/sessions");
const { PrismaClient } = require("@prisma/client");
const session = require("express-session");
const input = require("input");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT;
const apiId = parseInt(process.env.API_ID);
const apiHash = process.env.API_HASH;
const token = process.env.TOKEN;
const stringSession = new StringSession(process.env.STRING_SESSION);

const app = express();

const bot = new TelegramBot(token, { polling: true });

const prisma = new PrismaClient();

app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: true,
}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, `Click the "Open" button!`);
});

const client = new TelegramClient(stringSession, apiId, apiHash, {
  connectionRetries: 5,
});

(async () => {
  await client.start({
    phoneNumber: async () => await input.text("Please enter your phone number:"),
    password: async() => await input.text("Please enter your password:"),
    phoneCode: async() => await input.text("Please enter the code you received:"),
    onError: (err) => console.log(err),
  });
  console.log("You should now be connected! ✅");
})();

app.get("/", (req, res) => {
  res.render("index", { channelInfo: "default" });
});

app.post("/search", async (req, res) => {
  const inputValue = req.body.inputValue;

  let channelInfo = {
    available: "default",
  };

  try {
    const result = await client.invoke(
      new Api.channels.GetFullChannel({
        channel: inputValue,
      })
    );

    channelInfo = {
      available: "true",
      title: result.chats[0].title,
      username: inputValue,
      subscriberCount: result.fullChat.participantsCount,
      photoUrl: `/images/${inputValue}.jpg`,
    };

    let channel = await prisma.channel.findUnique({
      where: { username: inputValue }
    });

    if(!channel) {
      channel = await client.getEntity(`t.me/${inputValue}`);
      const profilePhoto = await client.downloadProfilePhoto(channel);

      fs.writeFileSync(path.join(__dirname, "public", "images", `${inputValue}.jpg`), profilePhoto);

      channel = await prisma.channel.create({
        data: {
          title: channelInfo.title,
          username: inputValue,
          subscriberCount: channelInfo.subscriberCount,
        },
      });
    }

    req.session.channel = {
      title: channelInfo.title,
      username: inputValue,
      subscriberCount: channelInfo.subscriberCount,
    };
  } catch (err) {
    channelInfo = {
      available: "false",
    }
    console.error("Error searching for channel❗:", err);
  }
  res.render("index", { channelInfo: channelInfo });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});