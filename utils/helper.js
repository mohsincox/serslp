const db = require("../models");
const RolePermission = db.rolePermission;
const Permission = db.permission;
const GamePointSetting = db.gamePointSetting;

class Helper {
    constructor() {
    }

    checkPermission(roleId, permName) {
        console.log("roleId", roleId);
        console.log("permName", permName);
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
                                reject({message: "Forbidden"});
                            }
                        })
                        .catch((error) => {
                            reject(error);
                        });
                })
                .catch(() => {
                    reject({message: "Forbidden"});
                });
        });
    }


    async calculateFootballPlayerTotalPoint(playerScore, playerSpecification) {
        try {
            let game_point_settings = await GamePointSetting.getByName("Football_Point_Settings");
            if (!game_point_settings) {
                console.log("Please add Football_Point_Settings in game_points_settings table");
                throw new Error("Please add Football_Point_Settings in game_points_settings table");
            }

            let game_setting_point = game_point_settings["value"][playerSpecification];
            let totalPoint = 0;
            for (const gameSettingPointKey in game_setting_point) {
                totalPoint += parseInt(game_setting_point[gameSettingPointKey]) * parseInt(playerScore[gameSettingPointKey]);
            }
            return totalPoint;
        } catch (error) {
            console.log(error)
        }

    }
}

module.exports = Helper;
