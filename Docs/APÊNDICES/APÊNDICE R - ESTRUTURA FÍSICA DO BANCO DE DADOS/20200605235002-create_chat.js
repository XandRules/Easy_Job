module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('chats', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      message: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      room: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      to_user: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      from_user: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      room: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      freelancer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'freelancers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      establishment_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'establishments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      announcement_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'announcements',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }),

  down: (queryInterface) => {
    return queryInterface.dropTable('chats');
  },
};
