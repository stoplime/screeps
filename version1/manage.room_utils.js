var manageRoomUtils = {

    /**Initialize function
     * 
     * @param {*} creep 
     */
    init: function (creep) {
        
    },

    /**Gets adjacent terrain values at a point in a room
     * 
     * @param {Room} room The given room object.
     * i.e. Game.spawns["Spawn1"].room
     * @param {RoomPosition} pos The position of interest.
     * i.e. room_.find(FIND_SOURCES)[0].pos
     * 
     * @return {Array.<Array.<Number,Number>,Number>}
     * Returns a list of Adjacents, and a count of available adjacents.
     */
    get_adjacents: function(room, pos) {
        var terrain = Game.map.getRoomTerrain(room.name);
        var adjacents = [];
        var index = 0;
        var count = 0;
        for (let j = -1; j < 2; j++) {
            for (let i = -1; i < 2; i++) {
                if (i == 0 && j == 0) continue;
                var x = pos.x + i;
                var y = pos.y + j;
                adjacents[index] = terrain.get(x, y);
                if (!terrain.get(x, y)) {
                    // Empty terrain
                    count++;
                }
                index++;
            }
        }
        return [adjacents, count];
    }
};

module.exports = manageRoomUtils;