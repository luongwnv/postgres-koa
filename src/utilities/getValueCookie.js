// convert cookie to object
const getStringOfCookie = (cookie) => {
    let pattern = new RegExp(/\b([^=;]+)=([^=;]+)\b/g);
    let cookieObj = {};
    while (match = pattern.exec(cookie)) cookieObj[match[1]] = match[2];
    return cookieObj;
}

// lay value cua userId tu cookie
module.exports.getUserId = (cookie) => {
    return getStringOfCookie(cookie).userid;
};

// lay value cua token tu cookie
module.exports.getToken = (cookie) => {
    return getStringOfCookie(cookie).token;
};