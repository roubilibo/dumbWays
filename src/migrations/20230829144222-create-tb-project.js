"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("tb_projects", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			title: {
				type: Sequelize.STRING,
			},
			content: {
				type: Sequelize.STRING,
			},
			author: {
				type: Sequelize.STRING,
			},
			start_date: {
				type: Sequelize.DATE,
			},
			end_date: {
				type: Sequelize.DATE,
			},
			html: {
				type: Sequelize.BOOLEAN,
			},
			css: {
				type: Sequelize.BOOLEAN,
			},
			js: {
				type: Sequelize.BOOLEAN,
			},
			njs: {
				type: Sequelize.BOOLEAN,
			},
			image: {
				type: Sequelize.STRING,
			},
			postedAt: {
				type: Sequelize.DATE,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("tb_projects");
	},
};
