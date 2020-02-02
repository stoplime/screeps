// ManageBodies creates all the bodies for every creep

var ManageBodies = {

    get_body: function(role_name, capacity) {
        var parts_cost = {
            MOVE: 50,
            WORK: 100,
            CARRY: 50,
            ATTACK: 80,
            RANGED_ATTACK: 150,
            HEAL: 250,
            CLAIM: 600,
            TOUGH: 10
        }

        // console.log("1", capacity);
        switch (role_name) {
            // List of Roles
            case "harvester":
            case "upgrader":
                // console.log("2", capacity);
                if (capacity < 300) {
                    // console.log("3", capacity);
                    return [MOVE, WORK, CARRY];
                }
                else {
                    // console.log("4", capacity);
                    var body = [];
                    var part_count = 0;
                    body.push(MOVE);
                    // console.log("parts_cost.MOVE", parts_cost.MOVE);
                    capacity -= parts_cost.MOVE;
                    // console.log("5", capacity);
                    part_count++;
                    body.push(CARRY);
                    // console.log("parts_cost.CARRY", parts_cost.CARRY);
                    capacity -= parts_cost.CARRY;
                    part_count++;
                    // console.log("capacity - move and carry", capacity);
                    while (capacity > parts_cost.WORK && part_count < 50) {
                        body.push(WORK);
                        capacity -= parts_cost.WORK;
                        part_count++;
                    }
                    return body;
                }
            case "builder":
                if (capacity < 400) {
                    return [MOVE, WORK, CARRY];
                }
                else {
                    var body = [];
                    var part_count = 0;
                    var module_cost = parts_cost.MOVE +
                                      parts_cost.CARRY +
                                      parts_cost.WORK;
                    while (capacity > module_cost && part_count < 50) {
                        body.push(MOVE);
                        body.push(CARRY);
                        body.push(WORK);
                        capacity -= module_cost;
                        part_count += 3;
                    }
                    return body;
                }
            case "hauler":
                if (capacity < 200) {
                    return [MOVE, CARRY];
                }
                else {
                    var body = [];
                    var part_count = 0;
                    var module_cost = parts_cost.MOVE +
                                        parts_cost.CARRY;
                    while (capacity > module_cost && part_count < 50) {
                        body.push(MOVE);
                        body.push(CARRY);
                        capacity -= module_cost;
                        part_count += 2;
                    }
                    return body;
                }
            default:
                return;
        }
	}
};

module.exports = ManageBodies;