const config = require("../config/dbConfig.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: 0,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./userModel.js")(sequelize, Sequelize);
db.role = require("./roleModel.js")(sequelize, Sequelize);
db.permission = require("./permissionModel.js")(sequelize, Sequelize);
db.rolePermission = require("./rolePermissionModel.js")(sequelize, Sequelize);
db.game = require("./gameModel.js")(sequelize, Sequelize);
db.country = require("./countryModel.js")(sequelize, Sequelize);
db.tournament = require("./tournamentModel.js")(sequelize, Sequelize);
db.player = require("./playerModel.js")(sequelize, Sequelize);
db.team = require("./teamModel.js")(sequelize, Sequelize);
db.teamDetail = require("./teamDetailModel.js")(sequelize, Sequelize);
db.slider = require("./sliderModel.js")(sequelize, Sequelize);
db.match = require("./matchModel.js")(sequelize, Sequelize);
db.franchise = require("./franchiseModel.js")(sequelize, Sequelize);
db.tournamentTeam = require("./tournamentTeamModel.js")(sequelize, Sequelize);

// db.role = require("../models/role.model.js")(sequelize, Sequelize);

// db.role.belongsToMany(db.user, {
//   through: "user_roles",
//   foreignKey: "roleId",
//   otherKey: "userId"
// });
// db.user.belongsToMany(db.role, {
//   through: "user_roles",
//   foreignKey: "userId",
//   otherKey: "roleId"
// });

// db.ROLES = ["user", "admin", "moderator"];

db.role.hasMany(db.user, {
  foreignKey: "role_id",
});
db.user.belongsTo(db.role, {
  foreignKey: "role_id",
});

db.role.hasMany(db.rolePermission, {
  foreignKey: "role_id",
});
db.rolePermission.belongsTo(db.role, {
  foreignKey: "role_id",
});

db.role.hasMany(db.rolePermission, {
  foreignKey: "role_id",
});
db.rolePermission.belongsTo(db.role, {
  foreignKey: "role_id",
});

db.game.hasMany(db.tournament, {
  foreignKey: "game_id",
});
db.tournament.belongsTo(db.game, {
  foreignKey: "game_id",
});

db.country.hasMany(db.player, {
  foreignKey: "country_id",
});
db.player.belongsTo(db.country, {
  foreignKey: "country_id",
});

db.player.hasMany(db.teamDetail, {
  foreignKey: "player_id",
});
db.teamDetail.belongsTo(db.player, {
  foreignKey: "player_id",
});

db.tournament.hasMany(db.match, {
  foreignKey: "tournament_id",
});
db.match.belongsTo(db.tournament, {
  foreignKey: "tournament_id",
});

db.country.hasMany(db.match, {
  foreignKey: "country_one_id",
});
db.match.belongsTo(db.country, {
  foreignKey: "country_one_id",
  as: "country_one",
});

db.country.hasMany(db.match, {
  foreignKey: "country_two_id",
});
db.match.belongsTo(db.country, {
  foreignKey: "country_two_id",
  as: "country_two",
});

db.country.hasMany(db.franchise, {
  foreignKey: "country_id",
});
db.franchise.belongsTo(db.country, {
  foreignKey: "country_id",
});

module.exports = db;
