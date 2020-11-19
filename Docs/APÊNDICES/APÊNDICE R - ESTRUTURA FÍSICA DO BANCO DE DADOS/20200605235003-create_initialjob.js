module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('initial_jobs', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      to_user: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      from_user: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      begin_time: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      end_time: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      accepted: {
        type: Sequelize.BOOLEAN,
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
      establishment_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'establishments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    return queryInterface.dropTable('initial_jobs');
  },
};
