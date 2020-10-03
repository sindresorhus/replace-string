module.exports = (string, needle, replacement, options = {}) => {
	return string.split(needle).join(replacement);
};