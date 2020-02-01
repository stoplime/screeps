// Role handles the behaviors of each creep

var Role = {

    import_roles: function() {
        var roles = {};
        for (let i = 0; i < Memory.Manage["role_keys"].length; i++) {
            const key = Memory.Manage["role_keys"][i];
            roles[key] = require("role." + key);
        }
        return roles;
	},

    common_update: function(creep) {
        if (creep.memory.recycle && !creep.pos.inRangeTo(Game.spawns["Spawn1"], 1)) {
            creep.moveTo(Game.spawns["Spawn1"], {visualizePathStyle: {stroke: "#ffffff"}});
        }
        else if (creep.pos.inRangeTo(Game.spawns["Spawn1"], 1)) {
            var task = {};
            task.mode = "recycle";
            task.creep_name = creep.name;
            Game.spawns[spawn_name].memory.queue.push(task);
        }
    },
};

module.exports = Role;

/* 
var Role = {

    run: function(creep) {
        
	}
};

module.exports = Role;
*/