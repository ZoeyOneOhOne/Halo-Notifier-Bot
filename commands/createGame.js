const { SlashCommandBuilder } = require('discord.js');
const { getRandomMap, getGameModes } = require('../db');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('create')
		.setDescription('Creates a new game')
        .addStringOption(option =>
            option.setName('game-type')
                .setDescription('Game Type')
                .setRequired(true)
			    .addChoices(
                    {name: 'FFA', value: 'FFA'},
                    {name: 'Team', value: 'Team'},
                )),
	async execute(interaction) {
        const selectedGameType = interaction.options.getString('game-type');
        const map = await getRandomMap(selectedGameType);

		const message = await client.channels.cache.get('864300609582923786').send({
            content: 'FFA on ' + map.toString()
        });
	},
};