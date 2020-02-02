// RoleUtils contains a number of useful functions that roles typically use

var RoleUtils = {

    /**Gets adjacent terrain values at a point in a room
     * 
     * @param {Room} room The given room object.
     * i.e. Game.spawns["Spawn1"].room
     * @param {RoomPosition} pos The position of interest.
     * i.e. room_.find(FIND_SOURCES)[0].pos
     * 
     * @return {Array.<Array.<Number,Number>,Number>}
     * Returns a list of Adjacents
     * The total count in Adjacents
     */
    get_adjacent_vacants: function(room, pos) {
        var terrain = Game.map.getRoomTerrain(room.name);
        var adjacents = [];
        var index = 0;
        var count = 0;
        for (let j = -1; j < 2; j++) {
            for (let i = -1; i < 2; i++) {
                if (i == 0 && j == 0) continue;
                var x = pos.x + i;
                var y = pos.y + j;
                adjacents[index] = terrain.get(x, y);
                if (!terrain.get(x, y)) {
                    // Empty terrain
                    count++;
                }
                index++;
            }
        }
        return [adjacents, count];
    },

    get_adjacent_vacants_occupied: function(room, pos) {
        var occupied = 0;
        for (var creep in Game.creeps) {
            if (creep.room != room) continue;
            if (creep.memory.source == null) continue;
            if (creep.memory.source.pos != pos) continue;
            occupied++;
        }
        return occupied;
    },

    find_random_source: function(room) {
        var sources = room.find(FIND_SOURCES);
        return sources[Math.floor(Math.random()*sources.length)];
    },

    get_next_free_source: function(room) {
        var sources = room.find(FIND_SOURCES);
        for (let i = 0; i < sources.length; i++) {
            const source = sources[i];
            const [adjacents, available_count] = RoleUtils.get_adjacent_vacants(room, source.pos);
            var occupied = RoleUtils.get_adjacent_vacants_occupied(room, source.pos);
            if (available_count > occupied) {
                return source;
            }
        }
        return null;
    },

    /**Finds all non-full spawn or extension structures in the room 
     * 
     * @param {Room} room 
     */
    find_fillable_spawn: function(room) {
        var targets = room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
        });
        return targets;
    },

    filling_up_toggle: function(creep) {
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
    },
};

module.exports = RoleUtils;