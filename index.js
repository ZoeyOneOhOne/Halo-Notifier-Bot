const { Client , GatewayIntentBits  } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildPresences,
    ],
  });

const GAME_TO_MONITOR = 'halo infinite';
const CHANNEL_ID_TO_NOTIFY = '864300609582923786';

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('presenceUpdate', (oldPresence, newPresence) => {

  if (!oldPresence || !newPresence) {
    // Exit early if either presence is undefined or null
    return;
  }

  const oldGame = (oldPresence.activities || []).find(activity => activity.name.toLocaleLowerCase() === GAME_TO_MONITOR);
  const newGame = (newPresence.activities || []).find(activity => activity.name.toLocaleLowerCase() === GAME_TO_MONITOR);

  if (!oldGame && newGame && newGame.name.toLocaleLowerCase() === GAME_TO_MONITOR) {
    // Notify the channel
    const channel = client.channels.cache.get(CHANNEL_ID_TO_NOTIFY);
    if (channel) {
      // Mention the Halo role and mention the user by their ID
      const haloRole = channel.guild.roles.cache.find(role => role.name === 'Halo');
      if (haloRole) {
        const mentionRole = `<@&${haloRole.id}>`;
        const mentionUser = `<@${newPresence.user.id}>`;
        channel.send(`${mentionRole} ${mentionUser} is now playing Halo Infinite`);
      }
    }
  }
});

client.login(token);