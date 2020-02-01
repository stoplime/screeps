// RoleBuilder construct structures
var RoleUtils = require("role.utils");
var FlagUtils = require("flag.utils");

var RoleBuilder = {

    run_build: function(creep) {
        // Toggle filling up and unloading
        if (creep.memory.filling_up == null) {
            creep.memory.filling_up = true;
        }
        if (creep.memory.filling_up && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            creep.memory.filling_up = false;
        }
        else if (!creep.memory.filling_up && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.filling_up = true;
        }

        if (creep.memory.filling_up) {
            if (!creep.memory.container) {
                RoleBuilder.find_available_resource(creep, creep.room);
            }
            var my_container = Game.getObjectById(creep.memory.container);
            if (my_container != null && creep.withdraw(my_container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(my_container, {visualizePathStyle: {stroke: "#ffaa00"}});
            }
        }
        else {
            if (!creep.memory.construction_site) {
                RoleBuilder.claim_construction_site(creep);
            }
            var my_construction = Game.getObjectById(creep.memory.construction_site);
            if (creep.build(my_construction) == ERR_NOT_IN_RANGE) {
                creep.moveTo(my_construction, {visualizePathStyle: {stroke: "#ffffff"}});
            }
        }
    },
    
    claim_construction_site: function(creep) {
        var filters = [];
        filters.push(function(site) {
            return (site.type != STRUCTURE_ROAD) &&
                (site.type != STRUCTURE_RAMPART) &&
                (site.type != STRUCTURE_WALL) &&
                (site.claimable);
        });
        filters.push(function(site) {
            return (site.type == STRUCTURE_RAMPART) &&
                (site.claimable);
        });
        filters.push(function(site) {
            return (site.type == STRUCTURE_WALL) &&
                (site.claimable);
        });
        filters.push(function(site) {
            return (site.type == STRUCTURE_ROAD) &&
                (site.claimable);
        });
        for (let i = 0; i < filters.length; i++) {
            const filter = filters[i];
            var constructions = _.filter(Memory.Manage.constructions, filter);
            if (constructions.length > 0) {
                var selection = Math.floor(Math.random()*constructions.length);
                // Sets the claim in creep.memory.construction_site
                creep.memory.construction_site = constructions[selection];
                constructions[selection].remaining -= creep.store.getCapacity(RESOURCE_ENERGY);
                if (constructions[selection].remaining <= 0) {
                    constructions[selection].claimable = false;
                }
                return;
            }
        }
    },

    find_available_resource: function(creep, room) {
        var containers = room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] > 0;
            }
        });
        if (containers.length > 0) {
            var construction_containers = [];
            var brown_flags = FlagUtils.get_flags_color_in_room(room, COLOR_BROWN);
            for (let f = 0; f < brown_flags.length; f++) {
                const brown_flag = brown_flags[f];
                for (let c = 0; c < containers.length; c++) {
                    const container = containers[c];
                    if (brown_flags.pos.inRangeTo(container, 3)) {
                        construction_containers.push(container);
                    }
                }
            }
            var selection = Math.floor(Math.random()*construction_containers.length);
            // Sets the container as creep.memory.container
            creep.memory.container = construction_containers[selection].id;
        }else{
            creep.memory.container = Game.spawns["Spawn1"].id;
        }
    }
};

module.exports = RoleBuilder;