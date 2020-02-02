var utils = require("manage.room_utils");
var manage_bodies = require("manage.bodies");

var manageSpawning = {

    max_creep_roles: function(room) {
        var max_creeps_roles = {};

        var max_harvester = function(room) {
            var sources = room.find(FIND_SOURCES);
            var total = 0;
            for (let i = 0; i < sources.length; i++) {
                const source = sources[i];
                const [_, count] = utils.get_adjacents(room, source.pos);
                total += count;
            }
            return total;
        }
        max_creeps_roles["harvester"] = max_harvester(room);

        var max_upgrader = function() {
            return 1;
        }
        max_creeps_roles["upgrader"] = max_upgrader();

        var max_builder = function(room) {
            var sources = room.find(FIND_CONSTRUCTION_SITES);
            var total = 0;
            for (let i = 0; i < sources.length; i++) {
                const source = sources[i];
                const [_, count] = utils.get_adjacents(room, source.pos);
                total += count;
            }
            // Take the all the construction sites and divide by 5 with at least 1
            var max = Math.max(Math.ceil(total/5), 1);
            return max;
        }
        max_creeps_roles["builder"] = max_builder(room);

        return max_creeps_roles;
    },

    get_creeps_roles: function(roles) {
        var creeps_roles = {};
        for (let i = 0; i < roles.length; i++) {
            const role = roles[i];
            creeps_roles[role] = _.filter(Game.creeps, (creep) => creep.memory.role == role).length;
        }
        return creeps_roles;
    },
    
    spawn_creeps: function(roles, room, spawner) {
        var priority = manageSpawning.priority_creeps(spawner);
        if (priority) {
            return;
        }
        var roles_ = Object.keys(roles);
        // console.log("roles_: ", roles_[0]);

        // List all creep's roles and counts how many exists
        var creeps_roles = manageSpawning.get_creeps_roles(roles_);

        // Find the max creep's roles
        if (room.memory.max_creep_roles == null) {
            room.memory.max_creep_roles = manageSpawning.max_creep_roles(room);
        }
        var max_creeps_roles = room.memory.max_creep_roles;

        var capacity = room.energyAvailable;

        for (let i = 0; i < roles_.length; i++) {
            const role = roles_[i];
            if (!(role in creeps_roles)) continue;
            if (!(role in max_creeps_roles)) continue;
            var diff_creeps = max_creeps_roles[role] - creeps_roles[role];
            var newName = role + "." + Game.time;
            var can_spawn = Game.spawns[spawner].spawnCreep(manage_bodies.manageBodies(role, capacity), newName, 
                            {memory: {role: role}, dryRun: true});
            if(diff_creeps > 0 && can_spawn == 0) {
                Game.spawns[spawner].spawnCreep(manage_bodies.manageBodies(role, capacity), newName, 
                {memory: {role: role}});
                var newCreep = Game.creeps[newName];
                var newCreepRole = new roles[role](newCreep);
                newCreepRole.init();
                return;
            }
        }
    },

    priority_creeps: function(spawner) {
        if (Game.creeps.length < 1) {
            var can_spawn = Game.spawns[spawner].spawnCreep([WORK,CARRY,MOVE], "harvestor.basic." + Game.time,
                            {memory: {role: "harvester.basic"}, dryRun: true});
            if (can_spawn) {
                Game.spawns[spawner].spawnCreep([WORK,CARRY,MOVE], "harvestor.basic." + Game.time,
                {memory: {role: "harvester.basic"}});
            }
            return true;
        }
    }
};

module.exports = manageSpawning;