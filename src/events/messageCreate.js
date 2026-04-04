const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (message.author.bot) return;

        // Auto-Quote Message Links
        const messageLinkRegex = /https:\/\/discord\.com\/channels\/(\d+)\/(\d+)\/(\d+)/;
        const match = message.content.match(messageLinkRegex);

        if (match) {
            const [url, guildId, channelId, messageId] = match;

            // Optional: Only quote from the same server
            if (guildId !== message.guild.id) return;

            try {
                const channel = await message.guild.channels.fetch(channelId);
                if (!channel || !channel.isTextBased()) return;

                const quoteMessage = await channel.messages.fetch(messageId);
                if (!quoteMessage) return;

                const embed = new EmbedBuilder()
                    .setAuthor({ 
                        name: quoteMessage.author.tag, 
                        iconURL: quoteMessage.author.displayAvatarURL({ dynamic: true }) 
                    })
                    .setDescription(quoteMessage.content || (quoteMessage.attachments.size > 0 ? "_[Attachment]_" : "_[Embedded Content]_"))
                    .setColor(0x5865F2)
                    .setTimestamp(quoteMessage.createdAt)
                    .setFooter({ text: `Sent in #${channel.name}` });

                // Handle first image attachment if present
                const image = quoteMessage.attachments.find(a => a.contentType?.startsWith('image/'));
                if (image) {
                    embed.setImage(image.url);
                }

                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel('Jump to Message')
                            .setURL(url)
                            .setStyle(ButtonStyle.Link),
                    );

                await message.channel.send({ embeds: [embed], components: [row] });
            } catch (err) {
                console.error('Error fetching quoted message:', err);
            }
        }
    }
};
