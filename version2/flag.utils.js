// FlagUtils contain a list of flag handlers

/*
Flag Colors
COLOR_BLUE   = 
COLOR_BROWN  = Construction resources
COLOR_CYAN   = 
COLOR_GREEN  = Scout room
COLOR_GREY   = 
COLOR_ORANGE = 
COLOR_PURPLE = No tasks waypoint
COLOR_RED    = Attack point
COLOR_WHITE  = 
COLOR_YELLOW = 
 */

var FlagUtils = {

    get_flags_color_in_room: function(room, color) {
        return _.filter(Game.flags, function(flag) {
            return (flag.color == color) &&
                    (flag.room == room);
        });
	}
};

module.exports = FlagUtils;