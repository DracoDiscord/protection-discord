const { Command } = require('discord-akairo');

class UserInfoCommand extends Command {
    constructor() {
        super('userinfo', {
           aliases: ['userinfo', 'info'],
           //description: 'Affiche les informations de l\'utilisateur'
           //ignoreCooldown: '769249218253946943',
          // ignorePermissions: '769249218253946943',
           userPermissions: 'KICK_MEMBERS',
           clientPermissions: 'KICK_MEMBERS',
           category: 'Misc',
           description: {
            content: 'La commande userinfo renvoie des informations sur l\'utilisateur!',
            usage: 'user(info) <member>',
            exemples: ['userinfo', 'info @member']},
           //ratelimit: 1,
           cooldown: 5000,
           //typing: true
           ownerOnly: true,
           channel: 'guild',
          // args: [
            // { id: 'firstArgs', type: 'number', default: 0 },
            // { id: 'secondArgs', type: 'number', default: 0 }
           //],
          // separator: '|'
          //args: [
          //  { id: 'firstArgs', type: 'number', default: 0 },
           // { id: 'secondArgs', match: 'rest' }
         // ]
         args: [
          { id: 'member', type: 'member', default: message => message.member },
        ]
        });
    }

    exec(message, args) {
      //return message.reply(`Première argument: ${args.firstArgs} | Le reste: ${args.secondArgs}.`); 
      return message.channel.send({ embeds: [
        this.client.functions.embed()
        .setTitle(`${args.member.displayName} (${args.member.id})`)
        .setThumbnail(args.member.user.displayAvatarURL())
        .setDescription(`Son compte à été créer le ${args.member.user.createdAt}`)
      ]})
    }}

module.exports = UserInfoCommand;