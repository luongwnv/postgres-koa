const userService = require('../services/userService');

function ensureAuthenticated(context) {
    return context.isAuthenticated();
}

function ensureAdmin(context) {
    return new Promise((resolve, reject) => {
        if (context.isAuthenticated()) {
            userService.getSingleUser(context.state.user.id)
                .then((user) => {
                    if (user && user[0].admin) resolve(true);
                    resolve(false);
                })
                .catch((err) => { reject(false); });
        }
        return false;
    });
}

module.exports = {
    ensureAuthenticated,
    ensureAdmin
};