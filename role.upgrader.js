// RoleUpgrader upgrades the room controller
var RoleUtils = require("role.utils");
var FlagUtils = require("flag.utils");

var RoleUpgrader = {

    curier_upgrading: function(creep) {
        RoleUtils.filling_up_toggle(creep);

        if(creep.memory.filling_up) {
            // if no container, then get it from spawn
            if (creep.withdraw(Game.spawns["Spawn1"], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns["Spawn1"], {visualizePathStyle: {stroke: "#ffaa00"}});
            }
        }
        else {
            // Upgrade the controller
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: "#ffaa00"}});
            }
        }
    },
    
    static_upgrading: function(creep) {
        
    },
};

module.exports = RoleUpgrader;