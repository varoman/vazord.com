module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Users', [{
			name: 'varo manukyan',
			email: 'varomanukyan@gmail.com',
			password: '$2a$10$XdioP7yINQ/A72RZCxF21uBmvYtkFkORx2bWgxh.N1tgj1MYhGtme', // password
			role: 'super',
			createdAt: new Date(),
			updatedAt: new Date()
		}], {});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Users', null, {});
	}
};
