var roleHarvester = require("role.harvester");

class roleHarvesterBasic extends roleHarvester {
    /**Initialize function
     * 
     * @param {*} creep 
     */
    constructor(creep) {
        super(creep);
        var sources = this.creep.room.find(FIND_SOURCES);
        creep.memory.source = sources[Math.floor(Math.random()*sources.length)];
    }

    init() {
        super.init();
        var sources = this.creep.room.find(FIND_SOURCES);
        creep.memory.source = sources[Math.floor(Math.random()*sources.length)];
    }

    /**Run function
     * 
     */
    run() {
	    super.run();
        if(this.creep.carry.energy >= this.creep.carryCapacity) {
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
        if (Game.creeps.length > 4) {
            this.creep.suicide();
        }
    }
    
    /**Returns a list of body parts
     * needs to be overrided by inheritance
     */
    get_body() {
        return [MOVE, WORK, CARRY];
    }
};

module.exports = roleHarvesterBasic;