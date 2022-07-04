// const request = async () => {
//   const response = await fetch("http://localhost:3000/login");
//   const data = await response.json();
//   console.log(data);
// };

// request();

const url = `http://localhost:3000/login`;

const payload = {
  emailFromUser: "larryggs@gmail.com",
  passwordFromUser: "ridiculous",
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
  .then((json) => console.log(json));

console.log("hit page");
