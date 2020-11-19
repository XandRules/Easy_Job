module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('jobs', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      freelancer_evaluation: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      freelancer_comment: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      establishment_evaluation: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      establishment_comment: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
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
      initial_job_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'initial_jobs',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      canceled_at: {
        type: Sequelize.DATE,
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
    return queryInterface.dropTable('jobs');
  },
};

