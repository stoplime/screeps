var roleHarvester = require("role.harvester");

class roleHarvesterBasic extends roleHarvester {
    /**Initialize function
     * 
     * @param {*} creep 
     */
    constructor(creep) {
        super(creep);
    }

    /** @param {Creep} creep **/
    run() {
	    if(this.creep.carry.energy < this.creep.carryCapacity) {
            var sources = this.creep.room.find(FIND_SOURCES);
            if(this.creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(sources[0], {visualizePathStyle: {stroke: "#ffaa00"}});
            }
        }
        else {
            var targets = this.creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(this.creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.creep.moveTo(targets[0], {visualizePathStyle: {stroke: "#ffffff"}});
                }
            }
        }
        
        // Check if more creeps have spawned to replace
        if (Game.this.creeps.length > 4) {
            this.creep.suicide();
        }
	}
};

module.exports = roleHarvesterBasic;