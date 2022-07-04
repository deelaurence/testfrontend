const logOutButton = document.getElementById('log-out-button');

(function() {
    if(!localStorage.getItem('accessToken')) {
        alert("You're not logged in and will be redirected to log in");
        location.assign('/index.html');
    }
})();

logOutButton.addEventListener('click', function() {
    localStorage.removeItem('accessToken');
    location.replace('/index.html');
});