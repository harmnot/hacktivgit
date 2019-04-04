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
