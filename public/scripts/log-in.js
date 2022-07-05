const email = document.getElementById("email");
const password = document.getElementById("password");
const loginButton = document.getElementById("log-me-in");

loginButton.addEventListener("click", async function (e) {
  e.preventDefault();
  if (!(email.value && password.value)) {
    alert("field cannot be empty");
  } else {
    const response = await fetch(baseUrl + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailFromUser: email.value,
        passwordFromUser: password.value,
      }),
    });

    const data = await response.json();
    console.log(data);
    if (response.status == 200) {
      localStorage.setItem("accessToken", data.token);
      location.assign("/loggedin.html");
    } else {
      alert(data.message);
    }
  }
});
