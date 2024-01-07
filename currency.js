const base_url="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let dropdown= document.querySelectorAll(".dropdown select");
let button=document.querySelector("form button");
let fromcurr=document.querySelector(".from select");
let tocurr=document.querySelector(".to select");
let msg= document.querySelector(".msg");
for(let select of dropdown){
    for(let currcode in countryList){
        let newoption= document.createElement("option");
        newoption.innerText=currcode;
        newoption.value=currcode;
        if(select.name==="from" && currcode==="USD"){
           newoption.selected="selected";
           console.log(currcode);
        } 
        else if (select.name==="to" && currcode==="PKR"){
            let countrycode=countryList[currcode];
            let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
            let img= select.parentElement.querySelector("img");
            img.src=newSrc;

           newoption.selected="selected";
           console.log(currcode);
        } 
        select.append(newoption);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
        console.log(evt.target);
    })
}

const updateflag=(element)=>{
    // console.log(element.value);
    let currcode=element.value;
    let countrycode=countryList[currcode];
    // let newSrc="https://flagsapi.com/"+countrycode+"/flat/64.png";
    let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img= element.parentElement.querySelector("img");
    img.src=newSrc;
}

button.addEventListener("click", async(evt)=>{
evt.preventDefault();
let amount=document.querySelector(".amount input");
let amnval=amount.value;
if(amnval===""|| amnval<1){
    amnval=2;
    amount.value="2";
}
const URL= `${base_url}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
let response= await fetch(URL);
let data= await response.json();
console.log(data);
let rate= data[tocurr.value.toLowerCase()];
let final_amount=amnval*rate;
msg.innerText=`${amnval}${fromcurr.value}=${final_amount}${tocurr.value}`;

})

