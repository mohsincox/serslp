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
db.news = require("./newsModel.js")(sequelize, Sequelize);
db.tournamentTeamPlayer = require("./tournamentTeamPlayerModel.js")(sequelize, Sequelize);
db.tournamentTeamPlayerDetail = require("./tournamentTeamPlayerDetailModel.js")(
  sequelize,
  Sequelize
);
db.pointTable = require("./pointTableModel.js")(sequelize, Sequelize);
db.settings = require("./settingsModel.js")(sequelize, Sequelize);
db.club = require("./clubModel.js")(sequelize, Sequelize);

/*ku model*/

db.widget = require("./widgetModel.js")(sequelize, Sequelize);
db.ads = require("./adsModel.js")(sequelize, Sequelize);
db.page = require("./pageModel.js")(sequelize, Sequelize);

db.widget.hasMany(db.ads, {
  foreignKey: "widget_id"
});
db.ads.belongsTo(db.widget, {
  foreignKey: 'widget_id'
});

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

db.game.hasMany(db.player, {
  foreignKey: "game_id",
});
db.player.belongsTo(db.game, {
  foreignKey: "game_id",
});

db.country.hasMany(db.player, {
  foreignKey: "country_id",
});
db.player.belongsTo(db.country, {
  foreignKey: "country_id",
});

db.franchise.hasMany(db.player, {
  foreignKey: "franchise_id",
});
db.player.belongsTo(db.franchise, {
  foreignKey: "franchise_id",
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

db.country.hasMany(db.franchise, {
  foreignKey: "country_id",
});
db.franchise.belongsTo(db.country, {
  foreignKey: "country_id",
});

db.tournament.hasMany(db.tournamentTeam, {
  foreignKey: "tournament_id",
});
db.tournamentTeam.belongsTo(db.tournament, {
  foreignKey: "tournament_id",
});

db.country.hasMany(db.tournamentTeam, {
  foreignKey: "country_id",
});
db.tournamentTeam.belongsTo(db.country, {
  foreignKey: "country_id",
});

db.franchise.hasMany(db.tournamentTeam, {
  foreignKey: "franchise_id",
});
db.tournamentTeam.belongsTo(db.franchise, {
  foreignKey: "franchise_id",
});

db.tournamentTeam.hasMany(db.match, {
  foreignKey: "tournament_team_one_id",
});
db.match.belongsTo(db.tournamentTeam, {
  foreignKey: "tournament_team_one_id",
  as: "tournament_team_one",
});

db.tournamentTeam.hasMany(db.match, {
  foreignKey: "tournament_team_two_id",
});
db.match.belongsTo(db.tournamentTeam, {
  foreignKey: "tournament_team_two_id",
  as: "tournament_team_two",
});

db.tournament.hasMany(db.news, {
  foreignKey: "tournament_id",
});
db.news.belongsTo(db.tournament, {
  foreignKey: "tournament_id",
});

db.tournament.hasMany(db.tournamentTeamPlayer, {
  foreignKey: "tournament_id",
});
db.tournamentTeamPlayer.belongsTo(db.tournament, {
  foreignKey: "tournament_id",
});

db.tournamentTeam.hasMany(db.tournamentTeamPlayer, {
  foreignKey: "tournament_team_id",
});
db.tournamentTeamPlayer.belongsTo(db.tournamentTeam, {
  foreignKey: "tournament_team_id",
});

db.tournamentTeamPlayer.hasMany(db.tournamentTeamPlayerDetail, {
  foreignKey: "tournament_team_player_id",
});
db.tournamentTeamPlayerDetail.belongsTo(db.tournamentTeamPlayer, {
  foreignKey: "tournament_team_player_id",
});

db.player.hasMany(db.tournamentTeamPlayerDetail, {
  foreignKey: "player_id",
});
db.tournamentTeamPlayerDetail.belongsTo(db.player, {
  foreignKey: "player_id",
});


db.match.hasMany(db.pointTable, {
  foreignKey: "match_id",
});
db.pointTable.belongsTo(db.match, {
  foreignKey: "match_id",
});

db.player.hasMany(db.pointTable, {
  foreignKey: "player_id",
});
db.pointTable.belongsTo(db.player, {
  foreignKey: "player_id",
});

db.tournamentTeam.hasMany(db.pointTable, {
  foreignKey: "tournament_team_id",
});
db.pointTable.belongsTo(db.tournamentTeam, {
  foreignKey: "tournament_team_id",
});

db.game.hasMany(db.club, {
  foreignKey: "game_id",
});
db.club.belongsTo(db.game, {
  foreignKey: "game_id",
});

db.country.hasMany(db.club, {
  foreignKey: "country_id",
});
db.club.belongsTo(db.country, {
  foreignKey: "country_id",
});

db.franchise.hasMany(db.club, {
  foreignKey: "franchise_id",
});
db.club.belongsTo(db.franchise, {
  foreignKey: "franchise_id",
});

db.user.hasMany(db.teamDetail, {
  foreignKey: "user_id",
});
db.teamDetail.belongsTo(db.user, {
  foreignKey: "user_id",
});

db.tournament.hasMany(db.teamDetail, {
  foreignKey: "tournament_id",
});
db.teamDetail.belongsTo(db.tournament, {
  foreignKey: "tournament_id",
});



module.exports = db;
