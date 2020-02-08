var url = window.location.href;
if (url.indexOf('login') !== -1) {
    document.getElementById("nav").innerHTML = `<a class="nav-item nav-link" onclick="redirectRegister()">Register</a>`;
} else {
    if (url.indexOf('register') !== -1) {
        document.getElementById("nav").innerHTML = `<a class="nav-item nav-link" onclick="redirectLogin()">Login</a>`;
    } else {
        document.getElementById("nav").innerHTML = `<a class="nav-item nav-link justify-content-left">Hi!</a><a class="nav-item nav-link" onclick="logOut()">Logout</a>`;
    }
}

// go to register page
function redirectRegister() {
    window.location.href = '/register';
}

// go to login page
function redirectLogin() {
    window.location.href = '/login';
}

// logout function
function logOut() {
    localStorage.removeItem("userSession");
    document.cookie = 'userid=;token=;';
    window.location.href = '/logout';
}