var role = require("role");

class roleHauler extends role {

    /**Initialize function
     * 
     * @param {*} creep 
     */
    constructor(creep) {
        super(creep);
    }
    
    init() {
        super.init();
        this.creep.memory.container = null;
        this.creep.memory.storage = null;
    }

    run() {
        if (this.creep.store[RESOURCE_ENERGY] == 0) {
            if (this.creep.memory.container == null) {
                var containers = this.creep.room.find(STRUCTURE_CONTAINER, {
                    filter: (structure) => {
                        return (structure.id == "harvester"); // Not going to work
                    }
                });
                if (containers != null && containers.length > 0) {
                    this.creep.memory.container = containers[0];
                }
            }
            if(this.creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(targets[0], {visualizePathStyle: {stroke: "#ffffff"}});
            }
        }

    }
};

module.exports = roleHauler;