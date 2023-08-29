"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await queryInterface.bulkInsert(
			"tb_projects",
			[
				{
					title: "Ini Uji Coba",
					content:
						"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil amet adipisci dolores reiciendis placeat non iusto libero similique accusantium, cupiditate magni fugit, excepturi asperiores odio minima? Non ullam dolores quia.",
					author: "Roubilibo",
					start_date: "2023-08-10",
					end_date: "2023-10-10",
					html: true,
					css: true,
					js: true,
					njs: false,
					image: "image.png",
					postedAt: new Date(),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: "Ini Uji Coba2",
					content:
						"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil amet adipisci dolores reiciendis placeat non iusto libero similique accusantium, cupiditate magni fugit, excepturi asperiores odio minima? Non ullam dolores quia.",
					author: "Roubilibo",
					start_date: "2023-08-10",
					end_date: "2023-10-10",
					html: true,
					css: true,
					js: false,
					njs: false,
					image: "image.png",
					postedAt: new Date(),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
