var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store[RESOURCE_ENERGY] == 0) {
	        creep.memory.transfer_mode = 0;
	    }
	    else if(creep.store[RESOURCE_ENERGY] == 50) {
	        creep.memory.transfer_mode = 1;
	    }
	    if(creep.memory.transfer_mode == 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
	}
};

module.exports = roleUpgrader;