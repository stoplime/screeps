// RoleHauler mines energy resources with different stratagies
var RoleUtils = require("role.utils");
var FlagUtils = require("flag.utils");

var RoleHauler = {

    miner_to_spawn: function(creep) {
        // Initialize assign this hauler to a harvester
        if (!creep.memory.harvester) {
            var harvesters = _.filter(Game.creeps, function(creep) {
                return creep.memory.role == "harvester" &&
                        creep.memory.hauler == null;
            });
            if (harvesters.length > 0) {
                creep.memory.harvester = harvesters[0].name;
                harvesters[0].memory.hauler = creep.name;
            }
        }
        RoleUtils.filling_up_toggle(creep);

        if(creep.memory.filling_up) {
            var my_harvester = Game.creeps[creep.memory.harvester];
            var harvester_container = Game.getObjectById(my_harvester.memory.container_id);
            var dropped_energy = my_harvester.pos.findClosestByRange(FIND_DROPPED_ENERGY);
            if (harvester_container != null && creep.withdraw(harvester_container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(harvester_container, {visualizePathStyle: {stroke: "#ffaa00"}});
            }
            else if (dropped_energy && creep.pickup(dropped_energy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(dropped_energy, {visualizePathStyle: {stroke: "#ffaa00"}});
            }
            else if (!creep.pos.inRangeTo(my_harvester, 1)) {
                creep.moveTo(my_harvester, {visualizePathStyle: {stroke: "#ffaa00"}});
            }
        }
        else { // Dropping off the energy
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
    }
};

module.exports = RoleHauler;