const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		try {
			const message = await interaction.reply({ content: 'Pong!', fetchReply: true });
		} catch (error) {
			console.error('An error occurred:', error);
			await interaction.reply('An error occurred while processing your command.');
		}
	},
};