const db = require("../models");
const RolePermission = db.rolePermission;
const Permission = db.permission;

class Helper {
  constructor() {}

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
          console.log("perm", perm);
          RolePermission.findOne({
            where: {
              role_id: roleId,
              perm_id: perm.id,
            },
          })
            .then((rolePermission) => {
              console.log(
                "rolePermission ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ",
                rolePermission
              );
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
}

module.exports = Helper;
