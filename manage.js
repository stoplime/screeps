// Manage holds all the spawnning and util functions
var RoleUtils = require("role.utils");

var Manage = {

    initialize_global_memory: function(spawn_name) {
        if (!Memory.initialize_global) {
            Memory.Manage = {};
            Memory.Manage.main_room = spawn_name.room;
            // Memory.Manage.spawn_1 = spawn_name;
            Memory.Manage.role_names = [];
            // List of Roles
            Memory.Manage.role_names.push("harvester");
            Memory.Manage.role_names.push("hauler");
            Memory.Manage.role_names.push("builder");
            Memory.Manage.role_names.push("upgrader");

            Memory.Manage.creep_counts = {};
            for (let i = 0; i < Memory.Manage.role_names.length; i++) {
                const key = Memory.Manage.role_names[i];
                Memory.Manage.creep_counts[key] = 0;
            }
            Memory.Manage.creep_count_maxes = {};
            for (let i = 0; i < Memory.Manage.role_names.length; i++) {
                const key = Memory.Manage.role_names[i];
                Memory.Manage.creep_count_maxes[key] = 1;
            }
            Memory.Manage.constructions = [];

            Memory.Manage.allow_building_from_spawn_resources = true;

            Memory.initialize_global = true;
        }
	},
    
    update_construction_sites: function(room) {
        var constructions = room.find(FIND_MY_CONSTRUCTION_SITES);
        Memory.Manage.constructions.length = 0;
        for (let i = 0; i < constructions.length; i++) {
            const site = constructions[i];
            Memory.Manage.constructions.push({"id": site.id, "remaining": site.progressTotal - site.progress, "type": site.type, "claimable": true});
        }
    },

    update_creep_count_maxes: function(room) {
        var sources = room.find(FIND_SOURCES);
        var total_energy_spots = 0;
        for (let i = 0; i < sources.length; i++) {
            const source = sources[i];
            if (source == null || source.pos == null) continue;
            const [adjacents, count] = RoleUtils.get_adjacent_vacants(room, source.pos);
            total_energy_spots += count;
        }
        Memory.Manage.creep_count_maxes["harvester"] = total_energy_spots;
        Memory.Manage.creep_count_maxes["hauler"] = total_energy_spots;
    },
};

module.exports = Manage;