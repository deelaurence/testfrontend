try {

  const logOutButton = document.getElementById("log-out-button");
//if local storage empty, it means user no logged in, redirect to login page
  (function () {
    if (!localStorage.getItem("accessToken")) {
      alert("You're not logged in and will be redirected to log in");
      location.assign("/index.html");
    }
  })();
//logout button clears the local storage and returns to index page
  logOutButton.addEventListener("click", function () {
    localStorage.removeItem("accessToken");
    location.replace("/index.html");
  });

  console.log(baseUrl);
  async function get() {
    //sending a post request to the server that contains the access token
    //fetched from the local storage in its header..yada!! only logged in users can
    //fetch from the server 😎
    //baseUrl  = http://localhost:3000/api/v1
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
    //data here is what we sent in the server res.json or res.send whichever
    //it is an object most times nested in another object
    let data = await response.json();

    console.log(response.status);
    console.log(data);
    //do anything you want with the data, I extracted the username from the data
    //note the key-value pair i send from the server is what appears in the frontend
    //in other words, i am sending to the http://localhost:3000/api/v1/restricted
    //in the server, the restricted function that is called when we hit that route
    //requires you to go through the check middleware function and the respose is:
    //if (user && user.loggedIn == true) {
    // res.json({
    //   message: `${verifyToken.username}`,
    //   presentInDatabase: true,
    // });
    // next();
    //so, data.message = the username that owns the token
    //and data.presentInDatabase = true
    let welcomeText = document.getElementById("welcome-text");
    welcomeText.innerHTML = data.message;
  }

  get();
} catch (error) {
  console.log(error);
}


