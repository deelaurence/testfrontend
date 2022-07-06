let product1 = document.querySelector("#product-1");
let product2 = document.querySelector("#product-2");
let product3 = document.querySelector("#product-3");
let Btn = document.querySelector("button");
let allProducts = document.querySelectorAll("ul");

//this is the first client-side js that would run

//check if local storage contains the accessToken
if (localStorage.getItem("accessToken")) {
  //if the accessToken is present the content of the button changes to logout i did this just to avoid creating two buttons
  //i like shortcuts😑 just a single button that reads "login", when user hasn't logged in yet and reads "logout" when user is already logged in
  Btn.innerHTML = "logout";
  Btn.addEventListener("click", () => {
    localStorage.clear("accessToken");
    Btn.innerHTML = "login";
  });
} else {
  Btn.innerHTML = "login";
  Btn.addEventListener("click", () => {
    location.assign("/login.html");
  });
}
//added an event listener only on product one feel free to test run the 
//post request on products 2 and 3
product1.addEventListener("click", () => {
  (function () {
    if (!localStorage.getItem("accessToken")) {
      alert("You're not logged in and will be redirected to log in");
      location.assign("/login.html");
    }
  })();

  console.log(baseUrl);
  async function buyProduct() {
    //just to test if the access token gets supplied to the backend
    //sent through the body and header
    //hitting the route http://localhost:3000/buy requires passing through the check middleware function 
    let response = await fetch("http://localhost:3000/buy", {
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
    product1.innerHTML = `${product1.textContent} bought by ${data.message}`;

    let response2 = await fetch("http://localhost:3000/updateDB", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemOwner: data.message,
        itemName: product1.textContent,
      }),
    });

    let data2 = await response2.json();

    console.log(response2.status);
    console.log(data2);
  }
  buyProduct();
});
