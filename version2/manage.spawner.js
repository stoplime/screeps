// ManageSpawner regulates spawner behavior

var ManageSpawner = {

    initialize_memory: function(spawn_name) {
        Game.spawns[spawn_name].memory.queue = [];
    },

    /**Goes through the spawner's queue of tasks
     * 
     * @param {string} spawn_name 
     */
    spawn_handler: function(spawn_name) {
        var queue = Game.spawns[spawn_name].memory.queue;
        if (queue.length == 0) return false;

        var can_spawn = -1;
        var task = queue[0];
        switch (task.mode) {
            case "creep":
                can_spawn = Game.spawns[spawn_name].spawnCreep(
                    task.body,
                    task.name,
                    {memory: {role: task.role}, 
                    dryRun: true}
                );
                break;
            case "recycle":
            case "renew":
                if (Game.spawns[spawn_name].pos.inRangeTo(
                        Game.creeps[task.creep_name].pos, 1)) {
                    can_spawn = 0;
                }
                break;
        
            default:
                break;
        }

        if (can_spawn == 0) {
            switch (task.mode) {
                case "creep":
                    Game.spawns[spawn_name].spawnCreep(
                        task.body,
                        task.name,
                        {memory: {role: task.role}}
                    );
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
        else if (task.skipable) {
            queue.shift();
        }
    },
    
    check_need_creeps: function(spawn_name) {
        capacity = Game.spawns[spawn_name].room.energyAvailable;

        for (let i = 0; i < Memory.Manage.role_names.length; i++) {
            const role_name = Memory.Manage.role_names[i];
            var diff = Memory.Manage.creep_count_maxes[role_name] - Memory.Manage.creep_counts[role_name];
            var newCreepName = role_name + Memory.Manage.creep_counts[role_name];
            Game.spawns[spawn_name].memory.queue
        }
    }
};

module.exports = ManageSpawner;