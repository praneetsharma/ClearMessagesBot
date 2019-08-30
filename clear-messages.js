/*
  A bot to clear/delete messages of a channel

  Usage: !clearMessages  ==> clears all messages of
  that channel on which the command was run

*/

const CLEAR_MESSAGES = '!clearMessages';

const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone: true});

bot.on('ready', () => {
  console.log('ClearMessagesBot is Ready!');
});

bot.on('message', async (message) => {
    if (!message.content == CLEAR_MESSAGES)
      return;

    // Check the following permissions before deleting messages:
    //    1. Check if the user has enough permissions
    //    2. Check if I have the permission to execute the command

    if (!message.channel.permissionsFor(message.author).hasPermission("MANAGE_MESSAGES"))
      return message.channel.send("Sorry, you don't have the permission to execute the command \""+message.content+"\"");
    else if (!message.channel.permissionsFor(bot.user).hasPermission("MANAGE_MESSAGES"))
      return message.channel.send("Sorry, I don't have the permission to execute the command \""+message.content+"\"");

    // Only delete messages if the channel type is TextChannel
    // DO NOT delete messages in DM Channel or Group DM Channel
    if (!message.guild)
      return;

    let messages = await message.channel.fetchMessages()
    try {
      message.channel.bulkDelete(messages);
      let messagesDeleted = messages.array().length; // number of messages deleted

      // Logging the number of messages deleted on both the channel and console.
      message.channel.send("Deletion of messages successful. Total messages deleted: "+messagesDeleted);
      console.log('Deletion of messages successful. Total messages deleted: '+messagesDeleted)
    } catch(err) {
      console.log('Error while doing Bulk Delete');
      console.error(err);
    }
});

bot.login(require('./token'));
