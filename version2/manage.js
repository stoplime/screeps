// Manage holds all the spawnning and util functions

var Manage = {

    initialize_global_memory: function(spawn) {
        Memory.Manage = {};
        Memory.Manage.main_room = spawn.room;
        Memory.Manage.spawn_1 = spawn;
        Memory.Manage.role_keys = [];
        Memory.Manage.role_keys.push("harvester");
        Memory.Manage.role_keys.push("hauler");
        Memory.Manage.role_keys.push("builder");
        Memory.Manage.role_keys.push("upgrader");

        Memory.Manage.creep_counts = {};
        for (let i = 0; i < Memory.Manage.role_keys.length; i++) {
            const key = Memory.Manage.role_keys[i];
            Memory.Manage.creep_counts[key] = 0;
        }
        Memory.initialize_global = true;
	}
};

module.exports = Manage;