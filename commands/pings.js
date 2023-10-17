const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong, hopefully!'),
	async execute(interaction) {
		try {
			await interaction.reply('Pong!');
		} catch (error) {
			console.error('An error occurred:', error);
			await interaction.reply('An error occurred while processing your command.');
		}
	},
};