// Role handles the behaviors of each creep

var Role = {

    get_roles: function() {
        var roles = {};
        for (let i = 0; i < Memory.Manage["role_keys"].length; i++) {
            const key = Memory.Manage["role_keys"][i];
            roles[key] = require("role." + key);
        }
	}
};

module.exports = Role;

/* 
var Role = {

    run: function(creep) {
        
	}
};

module.exports = Role;
*/