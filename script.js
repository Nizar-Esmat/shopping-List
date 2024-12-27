const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearItems = document.getElementById("clear");
const formBtn = itemForm.querySelector("button")
const itemFilter = document.getElementById("filter");
let isEdit= false

function display(){
  let ItemFromLocal = getItemFromLocal();
  ItemFromLocal.forEach((item)=>{
    additemtoDom(item)
    chekUI()
  })
}

function chekUI() {
  const item = itemList.querySelectorAll("li");
  if (item.length === 0) {
    clearItems.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearItems.style.display = "block";
    itemFilter.style.display = "block";
  }
  formBtn.innerHTML=`<i class="fa-solid fa-plus"></i> Add Item`
  isEdit=false
}
chekUI();

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
function additem(e) {
  e.preventDefault();
  let newItem = itemInput.value;

  if (newItem === " ") {
    alert("enter any thing");
    return;
  }

  if(isEdit){
    let itemtoEdit = itemList.querySelector('.edit-mode');
    removeItemFromStorge(itemtoEdit.textContent);
    itemtoEdit.classList.remove("edit-mode")
    itemtoEdit.remove();
    isEdit=false
  }
  additemtoDom(newItem);
  additemTolocal(newItem)
  chekUI();
  itemInput.value = "";
}

function additemtoDom(item) {
  const li = document.createElement("li");

  li.appendChild(document.createTextNode(item));

  itemList.appendChild(li);

  let button = createButton("remove-item btn-link  text-red");

  li.appendChild(button);
}

function getItemFromLocal(){
  let itemfromLocal;
  if (localStorage.getItem("items") === null) {
    itemfromLocal = [];
  } else {
    itemfromLocal = JSON.parse(localStorage.getItem("items"));
  }

  return itemfromLocal
}

function additemTolocal(item) {
  let itemfromLocal = getItemFromLocal()

  itemfromLocal.push(item.trim());

  localStorage.setItem("items", JSON.stringify(itemfromLocal));
}


function setItemIntoEdit(item){ 
  itemList.querySelectorAll('li')
  .forEach((i)=>i.classList.remove('edit-mode'))
  isEdit= true
  item.classList.add("edit-mode")
  formBtn.innerHTML=`<i class="fa-solid fa-pen-to-square"></i> Edit Mode`
  itemInput.value=item.textContent
}

function removeItemFromStorge(item){
  let ItemFromLocal = getItemFromLocal()
  let NewArr = ItemFromLocal.filter((value) => value !== item)
  if(NewArr.length === 0){
    localStorage.removeItem("items")
  }else{        
    localStorage.setItem("items", JSON.stringify(NewArr));
    chekUI()
  }


}
itemForm.addEventListener("submit", additem);

itemList.addEventListener("click", (e) => {
  if (e.target.parentElement.classList.contains("remove-item")) {
    
    if (confirm("are you sure ? ")) {
      removeItemFromStorge(e.target.parentElement.parentElement.innerText)
      e.target.parentElement.parentElement.remove();
      chekUI()


     
  
    }
  }else{
    console.log(1);
    setItemIntoEdit(e.target)
    
  }
});

clearItems.addEventListener("click", () => {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
    localStorage.clear()
    chekUI();
  }
});

itemFilter.addEventListener("input", (e) => {
  const item = itemList.querySelectorAll("li");

  console.log(e.target.value);
  item.forEach((value) => {
    const curtext = value.innerText.toLowerCase();

    if (curtext.indexOf(e.target.value) != -1) {
      value.style.display = "flex";
    } else {
      value.style.display = "none";
    }
  });
});

document.addEventListener('DOMContentLoaded', display)