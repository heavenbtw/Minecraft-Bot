const { MessageEmbed } = require('discord.js');

module.exports = {
  data: {
    name: 'ping',
    description: 'Affiche la latence du bot et de l\'API Discord.',
  },
  async execute(interaction) {
    const startTime = Date.now();
    const botMessage = await interaction.reply({
      content: 'La latence du Bot se met à jour toute les 5 secondes ✅',
      fetchReply: true
    });

    const endTime = Date.now();
    const botLatency = endTime - startTime;

    const apiLatency = interaction.client.ws.ping;

    const embed = new MessageEmbed()
      .setAuthor(interaction.client.user.username, interaction.client.user.displayAvatarURL())
      .setDescription(`Latence du bot: **${botLatency}ms**\nLatence de l'API: **${apiLatency}ms**`)
      .setFooter('Discord - Bypass#1337 ❤️')
      .setTimestamp()
      .setColor('#2b2d31');

    const message = await interaction.editReply({ embeds: [embed] });

    setInterval(async () => {
      const startTime = Date.now();
      const botMessage = await interaction.fetchReply();
      const endTime = Date.now();
      const botLatency = endTime - startTime;

      const apiLatency = interaction.client.ws.ping;

      const updatedEmbed = new MessageEmbed()
        .setAuthor(interaction.client.user.username, interaction.client.user.displayAvatarURL())
        .setDescription(`Latence du bot: **${botLatency}ms**\nLatence de l'API: **${apiLatency}ms**`)
        .setFooter('Discord - Bypass#1337 ❤️')
        .setTimestamp()
        .setColor('#2b2d31');

      await message.edit({ embeds: [updatedEmbed] });
    }, 5000);
  },
};