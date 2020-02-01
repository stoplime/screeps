// RoleUpgrader upgrades the room controller
var RoleUtils = require("role.utils");
var FlagUtils = require("flag.utils");

var RoleUpgrader = {

    curier_upgrading: function(creep) {
        RoleUtils.filling_up_toggle(creep);

        if(creep.memory.filling_up) {
            // Look for the container at my pos
            if(creep.harvest(Game.getObjectById(creep.Memory.source)) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.Memory.source), {visualizePathStyle: {stroke: "#ffaa00"}});
            }
            // if no container, then get it from spawn
        }
        else {
            // Only looks for within the creep's room
            var targets = RoleUtils.find_fillable_spawn(creep.room);
            var flags = FlagUtils.get_flags_color_in_room(creep.room, COLOR_PURPLE);
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: "#ffffff"}});
                }
            }
            else if (flags.length > 0) {
                creep.moveTo(flags[0], {visualizePathStyle: {stroke: "#ffffff"}});
            }
        }
    },
    
    static_upgrading: function(creep) {
        
    },
};

module.exports = RoleUpgrader;