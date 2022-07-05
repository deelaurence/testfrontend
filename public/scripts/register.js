const email = document.getElementById("email");
const username = document.getElementById("username");
const phoneNumber = document.getElementById("phone-number");
const registerButton = document.getElementById("register-button");

registerButton.addEventListener("click", async function (e) {
  e.preventDefault();

  try {
    let response = await fetch(baseUrl + "register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usernameFromUser: username.value,
        phoneNumberFromUser: phoneNumber.value,
        emailFromUser: email.value,
        passwordFromUser: password.value,
      }),
    });

    let data = await response.json();

    console.log(response.status);
    console.log(data.token);

    if (response.status == 201) {
      localStorage.setItem("accessToken", data.token);
      location.assign("/loggedin.html");
    }
  } catch (error) {
    console.log(error);
  }
});
