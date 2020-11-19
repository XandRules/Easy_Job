module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('freelancers', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      id_hash: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      birth: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      terms_of_use: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      avatar_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'files',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      speciality_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'specialities',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      address_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'addresses',
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
    return queryInterface.dropTable('freelancers');
  },
};
