var role = require("role");

class roleHarvester extends role {
    /**Initialize function
     * 
     * @param {*} creep 
     */
    constructor(creep) {
        super(creep);
    }

    init() {
        super.init();
        creep.memory.source = null;
        creep.memory.has_carrier = false;
    }

    run() {
        super.run();
	    if(this.creep.store[RESOURCE_ENERGY] < this.creep.store.getCapacity()) {
            if(this.creep.harvest(creep.memory.source) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(creep.memory.source, {visualizePathStyle: {stroke: "#ffaa00"}});
            }
        }
    }
};

module.exports = roleHarvester;