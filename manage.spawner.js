// ManageSpawner regulates spawner behavior
var ManageBodies = require("manage.bodies");
var RoleUtils = require("role.utils");
// var Role = require("role");

var ManageSpawner = {

    initialize_memory: function(spawn_name) {
        if (Game.spawns[spawn_name].memory.queue == null) {
            Game.spawns[spawn_name].memory.queue = [];
        }
    },

    /**Goes through the spawner's queue of tasks
     * 
     * @param {string} spawn_name 
     */
    spawn_handler: function(spawn_name) {
        var queue = Game.spawns[spawn_name].memory.queue;
        if (queue.length == 0) return false;

        var can_spawn = -1;
        var task = null;
        for (let i = 0; i < queue.length; i++) {
            const task_check = queue[i];
            switch (task_check.mode) {
                case "creep":
                    // console.log("name:", task_check.name);
                    // console.log("\tbody:", task_check.body);
                    // console.log("\trole:", task_check.role);
                    can_spawn = Game.spawns[spawn_name].spawnCreep(
                        task_check.body,
                        task_check.name,
                        {memory: {role: task_check.role}, 
                        dryRun: true}
                    );
                    break;
                case "recycle":
                case "renew":
                    if (Game.creeps[task_check.creep_name] != null &&
                        Game.spawns[spawn_name].pos.inRangeTo(
                            Game.creeps[task_check.creep_name].pos, 1)) {
                        can_spawn = 0;
                    }
                    break;

                default:
                    break;
            }
            if (can_spawn == 0) {
                task = task_check;
                break;
            }
        }

        if (task != null) {
            switch (task.mode) {
                case "creep":
                    Game.spawns[spawn_name].spawnCreep(
                        task.body,
                        task.name,
                        {memory: {role: task.role}}
                    );
                    // Update global memory
                    Memory.Manage.creep_counts[task.role]++;
                    break;
                case "recycle":
                    Game.spawns[spawn_name].recycleCreep(
                        Game.creeps[task.creep_name]
                    );
                    break;
                case "renew":
                    Game.spawns[spawn_name].renewCreep(
                        Game.creeps[task.creep_name]
                    );
                    break;
            
                default:
                    break;
            }
            queue.shift();
        }
    },
    
    check_need_creeps: function(spawn_name) {
        var queue = Game.spawns[spawn_name].memory.queue;
        if (queue.length >= 20) return;

        function creeps_in_queue(queue, role_name) {
            var count = 0;
            for (let index = 0; index < queue.length; index++) {
                const task = queue[index];
                if (task.mode == "creep" && task.role == role_name) {
                    count++;
                }
            }
            return count;
        }
        for (let i = 0; i < Memory.Manage.role_names.length; i++) {
            const role_name = Memory.Manage.role_names[i];
            if (Memory.Manage.creep_counts[role_name] + creeps_in_queue(queue) < 
                Memory.Manage.creep_count_maxes[role_name]) {
                var task = {};
                task.mode = "creep";
                task.role = role_name;
                var capacity = Game.spawns[spawn_name].room.energyAvailable;
                task.body = ManageBodies.get_body(role_name, capacity);
                task.name = role_name + Memory.Manage.creep_counts[role_name];
                // console.log("name:", task.name);
                // console.log("\tbody:", task.body);
                // console.log("\trole:", task.role);
                // console.log("\tcapacity:", capacity);
                queue.push(task);
                return;
            }
        }
    }
};

module.exports = ManageSpawner;