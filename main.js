let title=document.getElementById("title")
let price=document.getElementById("price")
let taxes=document.getElementById("taxes")
let ads=document.getElementById("ads")
let discount=document.getElementById("discount")
let Total=document.getElementById("Total")
let count=document.getElementById("count")
let category=document.getElementById("category")
let Search=document.getElementById("Search")
let Create=document.getElementById("Create")
let SearchTitle=document.getElementById("SearchTitle")
let SearchCategory=document.getElementById("SearchCategory")
let mood="Create"
let tmp


function getTotal(){
    if(price.value!=""){
       let result= (+price.value + +taxes.value + +ads.value)-discount.value
Total.innerHTML=result
Total.style.background="green"
    }
    else{
      Total.innerHTML=""
Total.style.background="red"  
    }
}

let dataPro;
if(localStorage.getItem("product")!=null){
dataPro=JSON.parse(localStorage.getItem("product"))
}

else{
    dataPro=[]
}

Create.onclick=function(){
    let newPro={
        title:title.value,
price:price.value,
taxes:taxes.value,
ads:ads.value,
discount:discount.value,
Total:Total.innerHTML,
count:count.value,
category:category.value
    }
    // dataPro.push(newPro)
    if(title.value!=""&&price.value!=""&&category.value!=""&&newPro.count<=100){
    if(mood=="Create"){
    if(newPro.count>1){
        for(i=0;i<newPro.count;i++){
            dataPro.push(newPro)
        }
    }
}
    else{
 dataPro.push(newPro)
    }
    clear()
}

else{
    dataPro[tmp]=newPro
    Create.innerHTML="Create"
    mood="Create"
    count.style.display="block"
}
   localStorage.setItem("product",JSON.stringify(dataPro))
    console.log(dataPro)
    read()
}

function clear(){
    title.value=""
    price.value=""
    taxes.value=""
    ads.value=""
    discount.value=""
    Total.innerHTML=""
    count.value=""
    category.value=""
}

function read(){
    getTotal()
   let table="" 
for(i=0;i<dataPro.length;i++){
    table+=`
    <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>  
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].Total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="update" onclick="updatedata(${i})">update</button></td>
                    <td><button id="delete" onclick="deletedata(${i})">delete</button></td>  
                    </tr>

    `
}
document.getElementById("tbody").innerHTML=table

let btnDelete=document.getElementById("deleteAll")
if(dataPro.length>0){
   btnDelete.innerHTML=`
   <button onclick="deleteAll()">deleteAll(${dataPro.length})</button>
   `
}
else{
    btnDelete.innerHTML=""
}
}

read()
 
function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    read()
}

function deletedata(i){
dataPro.splice(i,1)
localStorage.product=JSON.stringify(dataPro)
    read()}

    function updatedata(i){
        title.value=dataPro[i].title
        price.value=dataPro[i].price
        taxes.value=dataPro[i].taxes
ads.value=dataPro[i].ads
discount.value=dataPro[i].discount
count.style.display="none"
category.value=dataPro[i].category
Create.innerHTML="update"
getTotal()
mood="Update"
tmp=i
scroll({
    top:0,
    behavior:"smooth"
})
    }
    let searchmood="title"
    function getSearch(id){
        if(id=="SearchTitle"){
searchmood="title"
Search.placeholder="Search by Title"
        }
        else{
            searchmood="category"
Search.placeholder="Search by Category"
        }
        Search.focus()
        console.log(searchmood)
    }

    function Find(value){
        let table=""
        if(searchmood=="title"){
            for(i=0;i<dataPro.length;i++){
                if(dataPro[i].title.toLowerCase().includes(value.toLowerCase())){
                table+=`
    <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>  
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].Total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="update" onclick="updatedata(${i})">update</button></td>
                    <td><button id="delete" onclick="deletedata(${i})">delete</button></td>  
                    </tr>

    `
                }
            }
        }
        else{
             for(i=0;i<dataPro.length;i++){
                if(dataPro[i].category.toLowerCase().includes(value.toLowerCase())){
                   table+=`
    <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>  
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].Total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="update" onclick="updatedata(${i})">update</button></td>
                    <td><button id="delete" onclick="deletedata(${i})">delete</button></td>  
</tr>
    `
                }
            }
        }
        document.getElementById("tbody").innerHTML=table
    }

