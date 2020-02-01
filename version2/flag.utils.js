// FlagUtils contain a list of flag handlers

var FlagUtils = {

    get_flags_color_in_room: function(room, color) {
        return _.filter(Game.flags, function name(flag) {
            return (flag.color == color) &&
                    (flag.room == room);
        });
	}
};

module.exports = FlagUtils;