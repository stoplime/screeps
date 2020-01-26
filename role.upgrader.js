class roleUpgrader {
    /**Initialize function
     * 
     * @param {*} creep 
     */
    constructor(creep) {
        this.creep = creep;
    }

    run() {
        if(this.creep.memory.upgrading && this.creep.carry.energy == 0) {
            this.creep.memory.upgrading = false;
            this.creep.say('🔄 harvest');
	    }
	    if(!this.creep.memory.upgrading && this.creep.carry.energy == this.creep.carryCapacity) {
	        this.creep.memory.upgrading = true;
	        this.creep.say('⚡ upgrade');
	    }

	    if(this.creep.memory.upgrading) {
            if(this.creep.upgradeController(this.creep.room.controller) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(this.creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var sources = this.creep.room.find(FIND_SOURCES);
            if(this.creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
	}
};

module.exports = roleUpgrader;