// Manage holds all the spawnning and util functions

var Manage = {

    initialize_global_memory: function(spawn_name) {
        if (!Memory.initialize_global) {
            Memory.Manage = {};
            Memory.Manage.main_room = spawn_name.room;
            // Memory.Manage.spawn_1 = spawn_name;
            Memory.Manage.role_names = [];
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

            Memory.initialize_global = true;
        }
	}
};

module.exports = Manage;