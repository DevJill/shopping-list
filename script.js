const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;
let isItemDuplicate = false;


// display items on load

function displayItems(){
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));

  checkUI();
}

//adding item

function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  if (newItem === '') {
    alert('Please add an item');
    return;
  }

  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode-items');

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    
    removeUpdateEdit();
  }

  itemDuplicateCheck(newItem);

  if(isItemDuplicate){
    isItemDuplicate = false;
    return;
  }

  itemInput.classList.remove('form-input-error');

  addItemToDOM(newItem);
  addItemToStorage(newItem);  
  checkUI();

  itemInput.value = '';
}


function itemDuplicateCheck(item){
  const itemsFromStorage = getItemsFromStorage();

  if(itemsFromStorage.includes(item)){
    itemInput.classList.add('form-input-error');
    isItemDuplicate = true;
    alert('This item already exists!');
  }
};


//adding item to DOM

function addItemToDOM(item){
  
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

   const button = createButton('remove-item btn-link text-red');
   li.appendChild(button);

   itemList.appendChild(li);
}

//li button creation

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

//li icon creation

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

//adding item to localStorage

function addItemToStorage(item){
  const itemsFromStorage = getItemsFromStorage();
  

  itemsFromStorage.push(item);

  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

//getting items from localStorage

function getItemsFromStorage(){
  let itemsFromStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }
  
  return itemsFromStorage;
}

//selecting clicked item

function onClickItem(e){
  const targetClassList = e.target.parentElement.classList;

  if (targetClassList.contains('remove-item')){
    removeItem(e.target.parentElement.parentElement);
  } else if (targetClassList.contains('items')){
    setItemToEdit(e.target)
}};

//setting item to edit mode

function setItemToEdit(item){
  isEditMode = true;
  const items = itemList.querySelectorAll('li');
  items.forEach((i) => i.classList.remove('edit-mode-items'));
  formBtn.classList.remove('edit-mode-btn');

  formBtn.classList.add('edit-mode-btn');
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update item';
  
  item.classList.add('edit-mode-items');
  itemInput.value = item.textContent;
}

//removing item

function removeItem(item) {
    if (confirm('Are you sure?')) {
     item.remove();

     removeItemFromStorage(item.textContent);
     checkUI();
    }

}

//removing item from localStorage

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

//clearing items

function clearItems() {
  while(itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  localStorage.removeItem('items');

  checkUI();
}

//filter items

function filterItems(e) {
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();

    items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    
    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  })
}

//removing update item input, and button class

function removeUpdateEdit(){
  isEditMode = false;
  itemInput.value = '';
  formBtn.classList.remove('edit-mode-btn');
  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
}

//checking UI

function checkUI() {
  const items = itemList.querySelectorAll('li');

  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';  };

   removeUpdateEdit(); 
  }
  
//initialization eventListeners

function init(){
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', onClickItem);
  clearBtn.addEventListener('click', clearItems);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);
 
 checkUI();
}


init()

// const itemForm = document.getElementById('item-form');
// const itemInput = document.getElementById('item-input');
// const itemList = document.getElementById('item-list');
// const clearBtn = document.getElementById('clear');
// const itemFilter = document.getElementById('filter');

// function displayItems() {
//   const itemsFromStorage = getItemsFromStorage();
//   itemsFromStorage.forEach((item) => addItemToDOM(item));
//   checkUI();
// }

// function onAddItemSubmit(e) {
//   e.preventDefault();

//   const newItem = itemInput.value;

//   // Validate Input
//   if (newItem === '') {
//     alert('Please add an item');
//     return;
//   }

//   // Create item DOM element
//   addItemToDOM(newItem);

//   // Add item to local storage
//   addItemToStorage(newItem);

//   checkUI();

//   itemInput.value = '';
// }

// function addItemToDOM(item) {
//   // Create list item
//   const li = document.createElement('li');
//   li.appendChild(document.createTextNode(item));

//   const button = createButton('remove-item btn-link text-red');
//   li.appendChild(button);

//   // Add li to the DOM
//   itemList.appendChild(li);
// }

// function createButton(classes) {
//   const button = document.createElement('button');
//   button.className = classes;
//   const icon = createIcon('fa-solid fa-xmark');
//   button.appendChild(icon);
//   return button;
// }

// function createIcon(classes) {
//   const icon = document.createElement('i');
//   icon.className = classes;
//   return icon;
// }

// function addItemToStorage(item) {
//   const itemsFromStorage = getItemsFromStorage();

//   // Add new item to array
//   itemsFromStorage.push(item);

//   // Convert to JSON string and set to local storage
//   localStorage.setItem('items', JSON.stringify(itemsFromStorage));
// }

// function getItemsFromStorage() {
//   let itemsFromStorage;

//   if (localStorage.getItem('items') === null) {
//     itemsFromStorage = [];
//   } else {
//     itemsFromStorage = JSON.parse(localStorage.getItem('items'));
//   }

//   return itemsFromStorage;
// }

// function onClickItem(e) {
//   if (e.target.parentElement.classList.contains('remove-item')) {
//     removeItem(e.target.parentElement.parentElement); }

// }



// function removeItem(item) {
//   if (confirm('Are you sure?')) {
//     // Remove item from DOM
//     item.remove();

//     // Remove item from storage
//     removeItemFromStorage(item.textContent);

//     checkUI();
//   }
// }

// function removeItemFromStorage(item) {
//   let itemsFromStorage = getItemsFromStorage();

//   // Filter out item to be removed
//   itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

//   // Re-set to localstorage
//   localStorage.setItem('items', JSON.stringify(itemsFromStorage));
// }

// function clearItems() {
//   while (itemList.firstChild) {
//     itemList.removeChild(itemList.firstChild);
//   }

//   // Clear from localStorage
//   localStorage.removeItem('items');

//   checkUI();
// }

// function filterItems(e) {
//   const items = itemList.querySelectorAll('li');
//   const text = e.target.value.toLowerCase();

//   items.forEach((item) => {
//     const itemName = item.firstChild.textContent.toLowerCase();

//     if (itemName.indexOf(text) != -1) {
//       item.style.display = 'flex';
//     } else {
//       item.style.display = 'none';
//     }
//   });
// }

// function checkUI() {
//   itemInput.value = '';

//   const items = itemList.querySelectorAll('li');

//   if (items.length === 0) {
//     clearBtn.style.display = 'none';
//     itemFilter.style.display = 'none';
//   } else {
//     clearBtn.style.display = 'block';
//     itemFilter.style.display = 'block';
//   }

// }

// // Initialize app
// function init() {
//   // Event Listeners
//   itemForm.addEventListener('submit', onAddItemSubmit);
//   itemList.addEventListener('click', onClickItem);
//   clearBtn.addEventListener('click', clearItems);
//   itemFilter.addEventListener('input', filterItems);
//   document.addEventListener('DOMContentLoaded', displayItems);

//   checkUI();
// }

// init();






