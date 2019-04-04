if (localStorage.getItem("token")) {
  document.querySelector("#main_content").style.display = "block";
} else {
  document.querySelector("#sigout").style.display = "none";
  document.querySelector("#main_content").style.display = "none";
}

const getIt = async () => {
  try {
    const user = document.getElementById("name").value;
    const users = await fetch(`http://localhost:4000/search/${user}`);
    const data = await users.json();
    console.log(data.items, "iniiiii");
    display(data.items);
  } catch (e) {
    console.log(e);
  }
};

const display = list => {
  let putTextData = document.querySelector("#theuser");
  putTextData.innerHTML = "";
  for ({ login, ...rest } of list) {
    putTextData.insertAdjacentHTML(
      "beforeend",
      `<li class="flex-item">
     <h3> <a href="${
       rest.html_url
     }" class='link' id='link2'> ${login} </a> </h3>
   </li>`
    );
  }
};

$("#repos").submit(async function() {
  event.preventDefault();
  try {
    const user = document.getElementById("repo").value;
    const users = await fetch(`http://localhost:4000/addrepo`, {
      method: "POST",
      body: JSON.stringify({ repoName: user }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    });
    const res = await users.json();
    $("#therepo").append(`<li>${res.full_name}</li>`);
  } catch (e) {
    console.log(e);
  }
});

const star = async () => {
  try {
    const user = document.getElementById("starrepo").value;
    const data = await fetch(`http://localhost:4000/starred/${user}`);
    const list = await data.json();
    displayList(list);
  } catch (e) {
    console.log(e);
  }
};

const displayList = list => {
  let putTextData = document.querySelector("#starredRepo");
  putTextData.innerHTML = "";
  for ({ name, ...rest } of list) {
    putTextData.insertAdjacentHTML(
      "beforeend",
      `<li class="flex-item">
     <h3> <a href="${rest.html_url}" class='link' id='link2'> ${name} </a> </h3>
   </li>`
    );
  }
};

async function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log("Name: " + profile.getName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
  const id_token = googleUser.getAuthResponse().id_token;

  const giveToken = await fetch(`http://localhost:4000/logingoogle`, {
    method: "POST",
    body: JSON.stringify({ idToken: id_token }),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  });

  document.querySelector("#main_content").style.display = "block";

  const receive = await giveToken.json();
  localStorage.setItem("token", receive);
  if (localStorage.getItem("token")) {
    document.querySelector(".g-signin2").style.display = "none";
    document.querySelector("#sigout").style.display = "block";
  } else {
    document.querySelector("#main_content").style.display = "block";
  }
  // console.log(receive, "ini token")
}

function signOut() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function() {
    localStorage.removeItem("token");
    document.querySelector("#sigout").style.display = "none";
    document.querySelector("#main_content").style.display = "none";
    document.querySelector(".g-signin2").style.display = "block";
  });
}
