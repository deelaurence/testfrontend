try {
  const logOutButton = document.getElementById("log-out-button");

  (function () {
    if (!localStorage.getItem("accessToken")) {
      alert("You're not logged in and will be redirected to log in");
      location.assign("/index.html");
    }
  })();

  logOutButton.addEventListener("click", function () {
    localStorage.removeItem("accessToken");
    location.replace("/index.html");
  });

  console.log(baseUrl);
  async function get() {
    let response = await fetch(baseUrl + "restricted", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        jwtFromFrontend: localStorage.getItem("accessToken"),
      }),
    });

    let data = await response.json();

    console.log(response.status);
    console.log(data);
    
    let welcomeText = document.getElementById("welcome-text");
    welcomeText.innerHTML = data.message;
  }

  get();
} catch (error) {
  console.log(error);
}

console.log("used checked if loggedin.js");