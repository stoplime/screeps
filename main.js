var Role = require("role");
var Manage = require("manage");
var ManageSpawner = require("manage.spawner");

module.exports.loop = function () {
    Manage.initialize_global_memory(Game.spawns["Spawn1"]);
    Manage.update_construction_sites(Game.spawns["Spawn1"].room);

    ManageSpawner.initialize_memory("Spawn1");
    ManageSpawner.check_need_creeps("Spawn1");
    ManageSpawner.spawn_handler("Spawn1");

    Role.role_update();
}