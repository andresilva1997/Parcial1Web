
let tempHead;
const htmlHead = document.querySelector("#tempHead");

const url = 'data.json'

async function loadInfo(){
    try{
        dat = await fetch(url);
        tempHead = await dat.json();
        console.log("Hello world!");
        return tempHead;
    }catch(error){
        throw error
    }
}


async function loadNavBar(){
    tempHead.forEach(x=>{
        console.log(x);
        let item = document.createElement("div");
        item.className = "accordion-item";
        let header2 = document.createElement("h2");
        header2.className="accordion-header";
        let btn = document.createElement("button");
        btn.className = "accordion-button";
        btn.type = "button";
        btn.setAttribute("data-bs-toggle","collapse");
        btn.setAttribute("data-bs-target=",`#${x.name}`)
    });
}

loadInfo().then((respuesta)=>loadNavBar());