module.exports = (sequelize, DataTypes) => {
    const GamePointSetting = sequelize.define("game_point_settings", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        value: {
            type: DataTypes.JSON,
            allowNull: true
        },
        created_by: {
            type: DataTypes.INTEGER,
        },
        updated_by: {
            type: DataTypes.INTEGER,
        },
    });

    GamePointSetting.getByName = async function(name) {
        let data = await this.findOne({where: {name : name}})
        if(data) {
            return {
                name: data.name,
                value: JSON.parse(data.value)
            };
        }
        return data;
    }

    return GamePointSetting;
};
