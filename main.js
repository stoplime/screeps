var Role = require("role");
var Manage = require("manage");
var ManageSpawner = require("manage.spawner");

module.exports.loop = function () {
    Manage.initialize_global_memory(Game.spawns["Spawn1"]);
    Manage.update_construction_sites(Game.spawns["Spawn1"].room);
    Manage.update_creep_count_maxes(Game.spawns["Spawn1"].room);

    ManageSpawner.initialize_memory("Spawn1");
    ManageSpawner.check_need_creeps("Spawn1");
    ManageSpawner.spawn_handler("Spawn1");

    if(Game.spawns["Spawn1"].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns["Spawn1"].spawning.name];
        Game.spawns["Spawn1"].room.visual.text(
            "🛠️ " + spawningCreep.memory.role,
            Game.spawns["Spawn1"].pos.x + 1, 
            Game.spawns["Spawn1"].pos.y, 
            {align: "left", opacity: 0.8});
    }

    Role.role_update();
}