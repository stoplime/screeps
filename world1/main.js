var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var tmp_creeps = [];
tmp_creeps["harvester1"] = "harvester";
tmp_creeps["carryer1"] = "carryer";
tmp_creeps["upgrader1"] = "upgrader";

module.exports.loop = function () {

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}