// Manage holds all the spawnning and util functions

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
};

module.exports = Manage;