const { Client, Intents } = require("discord.js");

const { shoutOutTemplate } = require("../utils/template");

const TOKEN = process.env.DISCORD_SHOUTOUT_BOT_TOKEN;
const GOALS_CHANNEL_ID = process.env.GOALS_CHANNEL_ID;
const SHOUTOUT_CHANNEL_ID = process.env.SHOUOUT_CHANNEL_ID;

const getUserIdfromMessage = (messageContent) => {
  return messageContent.substring(
    messageContent.indexOf("<@") + 2,
    messageContent.indexOf("<@") + 20
  );
};

(() => {
  const client = new Client({
    partials: ["MESSAGE", "REACTION"],
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
      Intents.FLAGS.DIRECT_MESSAGES,
      Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    ],
  });

  client.on("messageReactionAdd", (messageObject, user) => {
    const discordUserId = user.id;
    const emoji = messageObject.emoji.name;
    const messageContent = messageObject.message.content;

    const userIdFromMessage = getUserIdfromMessage(messageContent);

    if (emoji === "✅" && discordUserId === userIdFromMessage) {
      client.channels.cache
        .get(SHOUTOUT_CHANNEL_ID)
        .send(shoutOutTemplate({ discordUserId, messageContent }));
    }
  });

  client.on("messageCreate", (message) => {
    if (message.author.bot && message.channel.id === GOALS_CHANNEL_ID) {
      message.react("🆗");
    }

    console.log("Message Created, Goal Added");
  });

  client.login(TOKEN);
})();
