// RoleHarvester mines energy resources with different stratagies
var RoleUtils = require("role.utils");
var FlagUtils = require("flag.utils");

var RoleHarvester = {

    basic: function(creep) {
        if(creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()) {
            if(creep.harvest(Game.getObjectById(creep.Memory.source)) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.Memory.source), {visualizePathStyle: {stroke: "#ffaa00"}});
            }
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
        
        // Check if more creeps have spawned to replace
        if (Game.creeps.length > 4) {
            creep.memory.recycle = true;
        }
    },
    
    static_harvest: function(creep) {
        if(creep.harvest(Game.getObjectById(creep.Memory.source)) == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.getObjectById(creep.Memory.source), {visualizePathStyle: {stroke: "#ffaa00"}});
        }
    }
};

module.exports = RoleHarvester;