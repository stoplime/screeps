// Role handles the behaviors of each creep
// var RoleHarvester = require("role.harvester");
// var RoleHauler = require("role.hauler");
// var RoleBuilder = require("role.builder");
// var RoleUpgrader = require("role.upgrader");

var Role = {

    import_roles: function() {
        var roles = {};
        for (let i = 0; i < Memory.Manage.role_names.length; i++) {
            const key = Memory.Manage.role_names[i];
            roles[key] = require("role." + key);
        }
        return roles;
	},

    common_update: function(creep) {
        if (creep.memory.recycle && !creep.pos.inRangeTo(Game.spawns["Spawn1"], 1)) {
            creep.moveTo(Game.spawns["Spawn1"], {visualizePathStyle: {stroke: "#ff0000"}});
        }
        else if (creep.pos.inRangeTo(Game.spawns["Spawn1"], 1)) {
            var task = {};
            task.mode = "recycle";
            task.creep_name = creep.name;
            Game.spawns["Spawn1"].memory.queue.push(task);
        }
    },

    role_update: function() {
        var roles = Role.import_roles();
        for (var creep_name in Game.creeps) {
            const creep = Game.creeps[creep_name];
            var creep_role = creep.memory.role;
            console.log(creep_role);
            // Common update
            Role.common_update(creep);
            // Role specific update
            switch (creep_role) {
                // List of Roles
                case "harvester":
                    if (_.filter(Game.creeps).length < 4) {
                        roles[creep_role].basic(creep);
                    }
                    else {
                        roles[creep_role].static_harvest(creep);
                    }
                    break;
                case "hauler":
                    roles[creep_role].miner_to_spawn(creep);
                    break;
                case "builder":
                    roles[creep_role].run_build(creep);
                    break;
                case "upgrader":
                    roles[creep_role].curier_upgrading(creep);
                    break;
            
                default:
                    break;
            }
        }
    }
};

module.exports = Role;

/* 
var Role = {

    run: function(creep) {
        
	}
};

module.exports = Role;
*/