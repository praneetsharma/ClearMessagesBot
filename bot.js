const Discord = require('discord.js');
const bot = new Discord.Client();
var messagesDeleted;

bot.on('ready', () => { console.log('ClearMessagesBot is Ready!'); });
bot.on('message', message => {
    if (message.startsWith('!clearmsg')) {

      if (!message.channel.permissionsFor(message.author || bot.user).hasPermission("MANAGE_MESSAGES")) {
        message.channel.sendMessage(`Sorry, you don't have the permission to execute the command: ${message.content}`);
      }
      
      if (message.channel.type == 'text') {
        message.channel.fetchMessages()
          .then(messages => {
            message.channel.bulkDelete(messages);
              messagesDeleted = messages.array().length; 
            message.channel.sendMessage(`Deletion of messages successful. Total messages deleted: ${messagesDeleted}`);
        });
      }
    }
});

bot.login('YourBotsVerySecretToken');
