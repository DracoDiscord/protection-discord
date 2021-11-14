const { stripIndents } = require('common-tags');
const { Command } = require('discord-akairo');
const { MessageEmbed} = require('discord.js');

class HelpCommand extends Command {
    constructor() {
        super('help', {
           aliases: ['help', 'h'] ,
           category: 'Misc',
           description: {
            content: 'La commande help renvoie la liste de commandes du bot!',
            usage: '(h)elp <command>',
            exemples: ['help', 'help ping', 'h userinfo']},
           args: [{ id: 'command', type: 'commandAlias' }]
        });
    }

    exec(message, args) {
      const prefix = this.handler.prefix;
      const command = args.command;

      if (!command) {
    let embed = this.client.functions.embed()
        .setAuthor(
          `Bonjour, mon nom est ${this.client.user.username}!`,
          this.client.user.displayAvatarURL()
        )
        .setDescription(`Retrouvez la liste de toute nos commades ci-dessous! 
        Si vous avez besoin d'Assistance, rejoignez [notre serveur](https://discord.gg/H9F7xJdpJn)
        **------------** `)

        for(const category of this.handler.categories.values()) {
          embed.addField(
            `ϕ ${category.id}`,
            `${category
              .filter(cmd => cmd.aliases.length > 0 )
              .map(cmd => `\` ${cmd.aliases[0]}\``)
              .join(', ')}`
          )
        }

        embed.addField(
          '------------',
          `**\`${prefix}help <command>\`pour des infos sur une commande spécifique.**
          Exemples: \`${prefix}help ping\` | \`${prefix}help userinfo\``)
      
    
      return message.channel.send({ embeds: [ embed ]});
    }

    return message.channel.send(stripIndents`
    \`\`\`makefile
    [Help: Command -> ${command.aliases[0]}] ${command.ownerOnly ? '/!\\ Admin Only /!\\' : ''}

    ${command.description.content}

    Utilisation: ${prefix}${command.description.usage}
    Exemple: ${prefix}${command.description.exemples.join(` | ${prefix}`)}

    -----

    ${prefix} = prefix à utiliser sur le bot
    () = alias | <> = argument(s) optionnel(s) | [] = argument(s) obligatoire
    Ne pas inclure les caractères suivant -> [], {} et <> dans vos commandes.
    Si vous avez un problème, rejoignez le serveur support!
    \`\`\``);

  }
}

module.exports = HelpCommand;