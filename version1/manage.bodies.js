var manageBodies = {
    get_body(role, capacity) {
        if (capacity < 200) {
            return;
        }
        var parts_cost = {
            MOVE: 50,
            WORK: 100,
            CARRY: 50
        }
        switch (role) {
            case "harvester":
            case "upgrader":
                if (capacity < 300) {
                    return [MOVE, WORK, CARRY];
                }
                else {
                    var body = [];
                    var part_count = 0;
                    body.push(MOVE);
                    capacity -= parts_cost[MOVE];
                    part_count++;
                    body.push(CARRY);
                    capacity -= parts_cost[CARRY];
                    part_count++;
                    while (capacity > parts_cost[WORK] && part_count < 50) {
                        body.push(WORK);
                        capacity -= parts_cost[WORK];
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
                    var module_cost = parts_cost[MOVE] +
                                      parts_cost[CARRY] +
                                      parts_cost[WORK];
                    while (capacity > module_cost && part_count < 50) {
                        body.push(MOVE);
                        body.push(CARRY);
                        body.push(WORK);
                        capacity -= module_cost;
                        part_count += 3;
                    }
                    return body;
                }
            default:
                return;
        }
    }
};

module.exports = manageBodies;