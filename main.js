let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let disc = document.getElementById('disc');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let btnCreate = document.getElementById('btn-sub');

let mood = 'create';
let tmp;

// get total
function gettotal(){
  if(price.value != '') {
    let result = (+price.value + +taxes.value + +ads.value) - +disc.value;
    total.innerHTML = result;
    total.style.background = '#040';
  }
  else{
    total.innerHTML = '';
    total.style.background = 'rgb(201, 0, 0)';
  }
};

// create item
// save local storage
let dataitem;
if(localStorage.item != null){
  dataitem = JSON.parse(localStorage.item);
}
else{
  dataitem = [];
};

btnCreate.onclick = function(){
  let newitem = {
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    disc:disc.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),
  };

  // count
  if(title.value != '' && price.value != '' && category.value != '' && newitem.count <= 100){
      if(mood === 'create') {
      if (newitem.count > 1){
      for(let j = 0; j < newitem.count; j++){
        dataitem.push(newitem);
      }
    }else{
      dataitem.push(newitem);
    }
    }else {
      dataitem[tmp] = newitem;
      mood = 'create';
      btnCreate.innerHTML = 'Create';
      count.style.display = 'block';
    }
  }
  
  
  // cleardata();
  localStorage.setItem('item',JSON.stringify(dataitem));
  readdata();
};

// clear inputs
function cleardata(){
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  disc.value = '';
  total.innerHTML = '';
  count.value = '';
  category.value = '';
};

// read
function readdata(){
  let table = '';
  for(let i = 0; i < dataitem.length; i++){
    table += `
    <tr>
      <td title="ID">${i+1}</td>
      <td title="Title">${dataitem[i].title}</td>
      <td title="Price">${dataitem[i].price}</td>
      <td title="Taxes">${dataitem[i].taxes}</td>
      <td title="Adds">${dataitem[i].ads}</td>
      <td title="Discount">${dataitem[i].disc}</td>
      <td title="Total">${dataitem[i].total}</td>
      <td title="Category">${dataitem[i].category}</td>
      <td title="Update this item"><button onclick="upData(${i})" id="update">Update</button></td>
      <td title="Delete this item"><button onclick="delData(${i})" id="delete">Delete</button></td>
    </tr>`;
  };
  document.getElementById('tbody').innerHTML =  table;
  let delAll = document.getElementById('delAll');
  if(dataitem.length > 0){
    delAll.innerHTML = `
    <button onclick="delall()">Delete All (${dataitem.length})</button>`;
  }
  else {
    delAll.innerHTML = '';
  }
  gettotal();
};
readdata();

// delete one item
function delData(i){
  dataitem.splice(i,1);
  localStorage.item = JSON.stringify(dataitem);
  readdata();
}

// delete All items
function delall(){
  localStorage.clear();
  dataitem.splice(0);
  readdata();
}

// update
function upData(i){
  title.value = dataitem[i].title;
  price.value = dataitem[i].price;
  taxes.value = dataitem[i].taxes;
  ads.value = dataitem[i].ads;
  disc.value = dataitem[i].disc;
  gettotal();
  count.style.display = 'none';
  category.value = dataitem[i].category;
  btnCreate.innerHTML = "Update";
  mood = 'update';
  tmp = i;
  scroll({
    top:0,
    behavior:'smooth',
  });
}

// search
let searchMood = 'Title';
function getSearchMood(id){
  let searchinp = document.getElementById('search');
  if(id == 'srch-title'){
    searchMood = 'Title'
  }else{
    searchMood = 'Category';
  }
  searchinp.placeholder = 'Search By '+searchMood;
  searchinp.focus();
  searchinp.value = '';
  readdata();
}

function srchdata(value){
  let table = '';
  for(let x = 0; x < dataitem.length; x++){

    if(searchMood == 'Title'){
        if(dataitem[x].title.toLowerCase().includes(value.toLowerCase())){
          table += `
          <tr>
            <td title="ID">${x}</td>
            <td title="Title">${dataitem[x].title}</td>
            <td title="Price">${dataitem[x].price}</td>
            <td title="Taxes">${dataitem[x].taxes}</td>
            <td title="Adds">${dataitem[x].ads}</td>
            <td title="Discount">${dataitem[x].disc}</td>
            <td title="Total">${dataitem[x].total}</td>
            <td title="Category">${dataitem[x].category}</td>
            <td title="Update this item"><button onclick="upData(${x})" id="update">Update</button></td>
            <td title="Delete this item"><button onclick="delData(${x})" id="delete">Delete</button></td>
          </tr>`;
        }
    }


    else{
        if(dataitem[x].category.toLowerCase().includes(value.toLowerCase())){
          table += `
          <tr>
            <td title="ID">${x}</td>
            <td title="Title">${dataitem[x].title}</td>
            <td title="Price">${dataitem[x].price}</td>
            <td title="Taxes">${dataitem[x].taxes}</td>
            <td title="Adds">${dataitem[x].ads}</td>
            <td title="Discount">${dataitem[x].disc}</td>
            <td title="Total">${dataitem[x].total}</td>
            <td title="Category">${dataitem[x].category}</td>
            <td title="Update this item"><button onclick="upData(${x})" id="update">Update</button></td>
            <td title="Delete this item"><button onclick="delData(${x})" id="delete">Delete</button></td>
          </tr>`;
        }
    }
  }
  document.getElementById('tbody').innerHTML =  table;
}

window.onload = () => {
  title.focus();
}