const db = require("../models");
const GamePointSetting = db.gamePointSetting;
const Helper = require("../utils/helper");
const {where} = require("sequelize");
const helper = new Helper();

const gamePointSettingsGet = async (req, res) => {
    try {
        let name = req.params.name;
        let setting = await GamePointSetting.getByName(name);
        res.json(setting);
        return;
    } catch (e) {
        console.log(e);
    }

};

const gamePointSettingsUpdate = async (req, res) => {
    try {

        let name = req.params.name;
        let {value} = req.body;
        let setting = await GamePointSetting.findOne({where : {name: name}});
        let settingUpdated = await GamePointSetting.update({value: value}, {
            where: {
                id: setting.id
            }
        });

        res.json(settingUpdated);
        return;
    } catch (e) {
        console.log(e);
    }
}

module.exports = {gamePointSettingsGet, gamePointSettingsUpdate};
