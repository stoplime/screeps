var Role = require("role");
var Manage = require("manage");

module.exports.loop = function () {
    if (Memory.initialize_global) {
        Manage.initialize_global_memory(Game.spawns["Spawn1"]);
    }
}