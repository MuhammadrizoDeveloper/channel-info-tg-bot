# channel-info-tg-bot

### This bot provides information about any public telegram channels using a web app

- [Getting Started](https://github.com/MuhammadrizoDeveloper/channel-info-tg-bot/blob/master/README.md#getting-started)
- [Learn More](https://github.com/MuhammadrizoDeveloper/channel-info-tg-bot/blob/master/README.md#learn-more)

## Getting Started

First install all dependencies:

```
npm install
```

Go to my.telegram.org and get your API ID and API HASH
[my.telegram.org](https://my.telegram.org)

---

Go to [BotFather](https://t.me/BotFather) and create a new bot, enter it's name and username, then copy the token.

---

Go to [MongoDB](https://mongodb.com), sign up or sign in, create a cluster, create a database, then your collection. Copy your connection string.

---

Create .env file and add your details:

```
PORT=5000

API_ID=<YOUR API ID>
API_HASH="<YOUR API HASH>"
# from my.telegram.org

STRING_SESSION="<YOUR STRING SESSION>"
# Leave this empty for now
# We will change it later

TOKEN=<YOUR TOKEN>
# Your token you got from BotFather

DATABASE_URL=<YOUR CONNECTION STRING>
# Your MongoDB Atlas database connection string
```

Finally, run the server:
```
npm run dev
```

Go to Telegram, and click open in your bot.

## Learn More
- [Prisma](https://www.prisma.io/docs) - The official Prisma documentation
- [Gram.js](https://gram.js.org/) - Learn how to use Gram.js
- [Tailwind CSS](https://tailwindcss.com/docs) - The official Tailwind CSS documentation

---

My Telegram: [@muhammadrizodev](https://t.me/muhammadrizodev)
