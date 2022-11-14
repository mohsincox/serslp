const db = require("../models");
const RolePermission = db.rolePermission;
const Permission = db.permission;
const GamePointSetting = db.gamePointSetting;
const TeamDetail = db.teamDetail;

class Helper {
  constructor() {}

  checkPermission(roleId, permName) {
    // console.log("roleId", roleId);
    // console.log("permName", permName);
    return new Promise((resolve, reject) => {
      Permission.findOne({
        where: {
          perm_name: permName,
        },
      })
        .then((perm) => {
          // console.log("perm", perm);
          RolePermission.findOne({
            where: {
              role_id: roleId,
              perm_id: perm.id,
            },
          })
            .then((rolePermission) => {
              if (rolePermission) {
                resolve(rolePermission);
              } else {
                reject({ message: "Forbidden" });
              }
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch(() => {
          reject({ message: "Forbidden" });
        });
    });
  }

  async calculateFootballPlayerTotalPoint(playerScore, playerSpecification) {
    try {
      let game_point_settings = await GamePointSetting.getByName(
        "Football_Point_Settings"
      );
      if (!game_point_settings) {
        console.log(
          "Please add Football_Point_Settings in game_points_settings table"
        );
        throw new Error(
          "Please add Football_Point_Settings in game_points_settings table"
        );
      }

      let game_setting_point =
        game_point_settings["value"][playerSpecification];
      let totalPoint = 0;
      for (const gameSettingPointKey in game_setting_point) {
        totalPoint +=
          parseInt(game_setting_point[gameSettingPointKey]) *
          parseInt(playerScore[gameSettingPointKey]);
      }
      return totalPoint;
    } catch (error) {
      console.log(error);
    }
  }

  async previousTeamDetailDecrement(pointTable) {
    try {
      let tournamentId = pointTable.match.tournament_id;
      let playerId = pointTable.player_id;
      let playerSpecification = this.footballPlayerSpecification(
        pointTable.player
      );
      let playerScore = {
        Goal: pointTable.Goal,
        Assist: pointTable.Assist,
        Goal_Save: pointTable.Goal_Save,
        Penalty_Save: pointTable.Penalty_Save,
        Clean_Sheet: pointTable.Clean_Sheet,
      };

      let playerPreviousTotalPoint =
        await this.calculateFootballPlayerTotalPoint(
          playerScore,
          playerSpecification
        );

      const previousUserTeamPointDecrement = await TeamDetail.decrement(
        { total_point: playerPreviousTotalPoint },
        {
          where: { player_id: playerId, tournament_id: tournamentId },
        }
      );

      return true;
    } catch (e) {
      return false;
    }
  }

  footballPlayerSpecification(player) {
    let p = JSON.parse(player.specification);
    let specification = [];
    for (const key in p) {
      if (p[key] === true) specification.push(key);
    }
    return specification.length ? specification[0] : null;
  }
}

module.exports = Helper;
