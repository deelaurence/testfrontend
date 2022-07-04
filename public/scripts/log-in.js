const email = document.getElementById('email');
const password = document.getElementById('password');
const loginButton = document.getElementById('log-me-in');

loginButton.addEventListener('click', async function(e){
    e.preventDefault();

    const response = await fetch(baseUrl + 'login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            emailFromUser: email.value,
            passwordFromUser: password.value
        })
    });

    const data = await response.json();

    if(response.status == 200) {
        localStorage.setItem('accessToken', data.token);
        location.assign('/loggedin.html');
    } else {
        alert(data.message);
    }
});