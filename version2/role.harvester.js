// RoleHarvester mines energy resources with different stratagies
var RoleUtils = require("role.utils");
var FlagUtils = require("flag.utils");

var RoleHarvester = {

    basic: function(creep) {
        if (creep.memory.filling_up == null) {
            creep.memory.filling_up = true;
        }
        if (creep.memory.filling_up && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            creep.memory.filling_up = false;
        }
        else if (!creep.memory.filling_up && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.filling_up = true;
        }

        if(creep.memory.filling_up) {
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
        else {
            // check if standing on container
            if (!creep.memory.container_id) {
                var containers = creep.room.find(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER);
                        }
                });
                var my_container = null;
                for (let i = 0; i < containers.length; i++) {
                    const container = containers[i];
                    if (container.pos == creep.pos) {
                        my_container = container;
                        break;
                    }
                }
                if (my_container != null) {
                    creep.memory.container_id = my_container.id;
                }
                else {
                    creep.room.createConstructionSite(creep.pos, STRUCTURE_CONTAINER);
                }
            }
        }
    }
};

module.exports = RoleHarvester;