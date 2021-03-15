

let temp;
const cards = document.querySelector("#cards");
const nav = document.querySelector("#navBar");
const cartGoer = document.querySelector("#openCart");
const cartCounter = document.querySelector("#cartCounter");
let cart = [];

const url = 'https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json'

cartGoer.addEventListener("click",()=>{cartLoad()});

async function loadInfo(){
    try{
        let dat = await fetch(url);
        temp = await dat.json();
        console.log("Hello world!");
        return temp;
    }catch(error){
        return
    }
}


async function menu(){
    cartCounter.appendChild(document.createTextNode(cart.length));
    temp.forEach(x=>{
        let list = document.createElement("li");
        list.className = "nav-item";
        let link = document.createElement("a");
        link.className = "nav-link";
        link.addEventListener("click",()=>{cardLoad(x.name)});
        link.appendChild(document.createTextNode(x.name));
        list.appendChild(link);
        nav.appendChild(list);
    })
}

async function cardLoad(i){
    cards.innerHTML = "";
    let catTemp = temp.filter((x)=>{return x.name==i});
    let nameH = document.createElement("h2");
    nameH.appendChild(document.createTextNode(i));
    let rowHead = document.createElement("row");
    rowHead.appendChild(nameH);
    cards.appendChild(rowHead);
    let rowCard = document.createElement("row");
    let cardFlex = document.createElement("div");
    cardFlex.classList.add("d-flex", "flex-wrap");
    catTemp[0].products.forEach((y)=>{
        let card = document.createElement("div");
        card.className = "card";
        let iCard = document.createElement("img");
        iCard.className = "card-img-top";
        iCard.src = y.image;
        card.appendChild(iCard);
        let title = document.createElement("h5");
        title.className = "card-title";
        title.appendChild(document.createTextNode(y.name));
        let bod = document.createElement("div");
        bod.className = "card-body";
        bod.appendChild(title);
        let p = document.createElement("p");
        p.className = "card-text";
        p.appendChild(document.createTextNode(y.description));
        bod.appendChild(p);
        let price = document.createElement("h6");
        price.appendChild(document.createTextNode(y.price));
        bod.appendChild(price);
        let btn = document.createElement("button");
        btn.appendChild(document.createTextNode("Add to cart"));
        btn.addEventListener("click",()=>{addToCart(y)});
        bod.appendChild(btn);
        card.appendChild(bod);
        cardFlex.appendChild(card);
    })
    rowCard.appendChild(cardFlex);
    cards.appendChild(rowCard);

}


const addToCart=(x)=>{
    if(cart.filter((y)=>{return y.name === x.name}).length===0){
        cart.push({
            qty:0,
            name:x.name,
            description:x.description,
            price:x.price,
            total:0
        })
    }
    add(x.name)
}

const cartLoad=()=>{
    cards.innerHTML = "";
    let nameH = document.createElement("h2");
    nameH.appendChild(document.createTextNode("Order Detail"));
    let rowHead = document.createElement("row");
    rowHead.appendChild(nameH);
    cards.appendChild(rowHead);
    let tableHolder = document.createElement("div");
    tableHolder.className = "d-flex";
    let table = document.createElement("table");
    table.classList.add("table","table-striped","flex-fill");
    let head = document.createElement("thead");
    let row = document.createElement("tr");
    let column1 = document.createElement("th");
    column1.appendChild(document.createTextNode("item"));
    column1.setAttribute("col","scope");
    row.appendChild(column1);
    let column2 = document.createElement("th");
    column2.appendChild(document.createTextNode("Qty."));
    column2.setAttribute("col","scope");
    row.appendChild(column2);
    let column3 = document.createElement("th");
    column3.appendChild(document.createTextNode("Description"));
    column3.setAttribute("col","scope");
    row.appendChild(column3);
    let column4 = document.createElement("th");
    column4.appendChild(document.createTextNode("Unit Price"));
    column4.setAttribute("col","scope");
    row.appendChild(column4);
    let column5 = document.createElement("th");
    column5.appendChild(document.createTextNode("Amount"));
    column5.setAttribute("col","scope");
    row.appendChild(column5);
    let column6 = document.createElement("th");
    column6.appendChild(document.createTextNode("Modify"));
    column6.setAttribute("col","scope");
    row.appendChild(column6);
    head.appendChild(row);
    table.appendChild(head);
    let body = document.createElement("tbody");
    let i = 1;
    let totalCost = 0;
    cart.forEach((x)=>{
        let row2 = document.createElement("tr");
        let head2 = document.createElement("th");
        head2.setAttribute("row","scope");
        head2.appendChild(document.createTextNode(i));
        row2.appendChild(head2);
        i++;
        let item2 = document.createElement("td");
        item2.appendChild(document.createTextNode(x.qty));
        row2.appendChild(item2);
        let item3 = document.createElement("td");
        item3.appendChild(document.createTextNode(x.description));
        row2.appendChild(item3);
        let item4 = document.createElement("td");
        item4.appendChild(document.createTextNode(x.price));
        row2.appendChild(item4);
        let item5 = document.createElement("td");
        item5.appendChild(document.createTextNode(x.total));
        row2.appendChild(item5);
        let item6 = document.createElement("td");
        let btn = document.createElement("button");
        btn.appendChild(document.createTextNode("+"));
        btn.addEventListener("click",()=>{add(x.name)});
        item6.appendChild(btn);
        let btn2 = document.createElement("button");
        btn2.appendChild(document.createTextNode("-"));
        btn2.addEventListener("click",()=>{remove(x.name)});
        item6.appendChild(btn2);
        row2.appendChild(item6);
        body.appendChild(row2);
        totalCost += x.total;
    });
    table.appendChild(body);
    tableHolder.appendChild(table);
    cards.appendChild(tableHolder);

}

const add=(i)=>{
    let j = cart.indexOf(cart.filter((k)=>{return k.name===i})[0]);
    cart[j].qty++;
    cart[j].total+=cart[j].price;
}

const remove=(i)=>{
    let j = cart.indexOf(cart.filter((k)=>{return k.name===i})[0]);
    if(cart[j].qty!=0){
        cart[j].qty--;
        cart[j].total-=cart[j].price;
    }
}

loadInfo().then(()=>menu());