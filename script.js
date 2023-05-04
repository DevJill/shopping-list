const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');


// addItem Function

function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  if (newItem === '') {
    alert('Please add an item');
    return;
  }

  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);
  console.log(li);

  itemList.appendChild(li);

  checkUI();

  itemInput.value = '';
}

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

//removeItem function


function removeItem(e){
  if(e.target.parentElement.classList.contains('remove-item')){
    if(confirm('Are you sure?')){
      e.target.parentElement.parentElement.remove();
     checkUI();
    }
  }
}

//clearItems function

function clearItems(){
  while(itemList.firstChild){
    itemList.removeChild(itemList.firstChild);
    checkUI();
  }
}

//checking UI

function checkUI(){
  const items = itemList.querySelectorAll('li');

  if(items.length === 0){
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
    // clearBtn.remove();
    // itemFilter.remove();
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';    
  }};


//removing clear and filter

// function removeClearFilter(e){
//   if(e.target === clearBtn)
//   checkUI();
// }






itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
// clearBtn.addEventListener('click', removeClearFilter);
checkUI();
