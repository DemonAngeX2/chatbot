const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'C:/Users/achochois/Desktop/Cours/App Réparties/ChatBot/node server/db/database.sqlite',
});

const User = sequelize.define('User', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    // allowNull defaults to true
  },
}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

async function performDatabaseOperations() {
  try {
    // Créer un nouvel utilisateur
    const newUser = await User.create({
      firstName: 'John',
      lastName: 'Doe',
    });
    console.log(newUser); // Affiche les informations du nouvel utilisateur créé

    // Récupérer tous les utilisateurs
    const allUsers = await User.findAll();
    console.log(allUsers); // Affiche tous les utilisateurs récupérés

    // Récupérer un utilisateur spécifique par son ID
    const user = await User.findByPk(1);
    console.log(user); // Affiche l'utilisateur avec l'ID 1

    // Mettre à jour un utilisateur existant
    const userToUpdate = await User.findByPk(1);
    if (userToUpdate) {
      userToUpdate.firstName = 'Jane';
      userToUpdate.lastName = 'Smith';
      await userToUpdate.save();
      console.log(userToUpdate); // Affiche les informations de l'utilisateur mis à jour
    }

    // Supprimer un utilisateur par son ID
    const userToDelete = await User.findByPk(1);
    if (userToDelete) {
      await userToDelete.destroy();
      console.log('Utilisateur supprimé avec succès');
    }
  } catch (error) {
    console.error("Une erreur s'est produite lors des opérations de base de données :", error);
  }
}

// Appeler la fonction pour effectuer les opérations de base de données
performDatabaseOperations();