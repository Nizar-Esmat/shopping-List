const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearItems = document.getElementById("clear");

function createButton(classes) {
  let button = document.createElement("button");
  button.className = classes;
  let icon = createIcon("fa-solid fa-x");
  button.appendChild(icon);

  return button;
}

function createIcon(classes) {
  let icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

itemForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let newItem = itemInput.value;

  if (newItem === "") {
    alert("pleae add an item");
    return;
  }
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  itemList.appendChild(li);
  let button = createButton("remove-item btn-link  text-red");
  li.appendChild(button);
  itemInput.value = "";

  console.log("validate");
});

itemList.addEventListener("click", (e) => {
  if (e.target.parentElement.classList.contains("remove-item")) {
    e.target.parentElement.parentElement.remove();
  }
});

clearItems.addEventListener("click", ()=>{
    itemList.innerHTML=""
})