const { embed } = require('../util/functions');
const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');

module.exports = class ProtectClient extends AkairoClient {
constructor(config = {}){
  super(
    { ownerID: '769249218253946943' },
    {
      allowedMentions: {
        parse: ['roles', 'everyone', 'users'],
        repliedUser: false
      },
      partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER'],
      presence: {
        statut: 'dnd',
        activities: [
        {
          name: '?help',
          type: 'STREAMING',
          url: 'https://www.youtube.com/watch?v=9tbCusY5LVM'
        }
      ]
    },
    intents: 32767
    }
  );

  this.CommandHandler = new CommandHandler(this, {
    allowMention: true,
    prefix: config.prefix,
    defaultCooldown: 2000,
    directory: './src/commands/'
  });

  this.listenerHandler = new ListenerHandler(this, {
    directory: './src/listeners/'
  });

// this.functions.embed()
this.functions= {
  embed: embed


}

  this.CommandHandler.loadAll();
  this.CommandHandler.useListenerHandler(this.listenerHandler);
  this.listenerHandler.loadAll();
  }
}