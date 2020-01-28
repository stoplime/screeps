
// initialize roles
var roles = {};
roles["harvester"] = require("role.harvester");
roles["upgrader"] = require("role.upgrader");
roles["builder"] = require("role.builder");
roles["hauler"] = require("role.hauler")

var utils = require("manage.room_utils");
var manage_spawn = require("manage.spawning");

module.exports.loop = function () {
    console.log("roles", roles);
    var room_ = Game.spawns["Spawn1"].room;

    // Spawning Management
    if (room_.energyAvailable == room_.energyCapacityAvailable) {
        manage_spawn.spawn_creeps(roles, room_, "Spawn1");
    }
    
    if(Game.spawns["Spawn1"].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns["Spawn1"].spawning.name];
        Game.spawns["Spawn1"].room.visual.text(
            "🛠️ " + spawningCreep.memory.role,
            Game.spawns["Spawn1"].pos.x + 1, 
            Game.spawns["Spawn1"].pos.y, 
            {align: "left", opacity: 0.8});
    }

    // console.log(room_);
    // var sources = room_.find(FIND_SOURCES);
    // const [adjecents, count] = utils.get_adjacents(room_, sources[0].pos);
    // console.log("available miners: " + count);
    // for (const [key, value] of Object.entries(adjecents)) {
        // console.log(key, value);
    // }

    // Update Loop
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        // Call class constructor
        var role = new roles[creep.memory.role](creep);
        role.run();
    }
}