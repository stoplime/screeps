// RoleHarvester mines energy resources with different stratagies
var RoleUtils = require("role.utils");

var RoleHarvester = {

    initialize_memory: function(creep) {
        if (creep.Memory.source == null) {
            creep.Memory.source = RoleUtils.find_random_source(creep.room);
        }
    },

    basic: function(creep) {
        if(creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()) {
            if(creep.harvest(creep.Memory.source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.Memory.source, {visualizePathStyle: {stroke: "#ffaa00"}});
            }
        }
        else {
            // Only looks for within the creep's room
            var targets = RoleUtils.find_fillable_spawn(creep.room);
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: "#ffffff"}});
                }
            }
        }
        
        // Check if more creeps have spawned to replace
        if (Game.creeps.length > 4) {
            creep.suicide();
        }
    },
    
    static_harvest: function(creep) {
        if (creep.Memory.source == null) {
            creep.Memory.source = RoleUtils.find_random_source(creep.room);
        }
    }
};

module.exports = RoleHarvester;