const emailField = document.getElementById("email").value;
const passwordField = document.getElementById("password").innerHTML;
const passwordElement = document.getElementById("password");
const emailElement = document.getElementById("email");
// };
emailElement.addEventListener("blur", () => {
  //   event.preventDefault();

  console.log(emailField);
  const url = `http://localhost:3000/login`;
  const payload = {
    emailFromUser: emailField,
    passwordFromUser: passwordField,
    //   toEmail: to, //var set elsewhere
    //   fromName: from, //var set elsewhere
    //   message: message, //var set elsewhere
    //   recaptcha: recaptcha, //var set elsewhere
  };
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
});
// You should use fetch API:
// document.querySelector("button").addEventListener("click", LS);
const LS = () => {
  localStorage.setItem("email", emailField);
  localStorage.setItem("password", passwordField);
  console.log("local storage");
};
