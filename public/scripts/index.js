let product1 = document.querySelector("#product-1");
let product2 = document.querySelector("#product-2");
let product3 = document.querySelector("#product-3");
let Btn = document.querySelector("button");
let allProducts = document.querySelectorAll("ul");

if (localStorage.getItem("accessToken")) {
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

product1.addEventListener("click", () => {
  (function () {
    if (!localStorage.getItem("accessToken")) {
      alert("You're not logged in and will be redirected to log in");
      location.assign("/login.html");
    }
  })();

  console.log(baseUrl);
  async function buyProduct() {
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
