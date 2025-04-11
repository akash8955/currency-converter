// const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const baseurl="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select")
const toCurr=document.querySelector(".to select")
const msg=document.querySelector(".msg");

for (let select of dropdowns) {
    for (curr in countryList) {
        let option = document.createElement("option");
        option.innerText = curr;
        option.value = curr;
        if (select.name === "from" && curr === "USD") {
            option.selected = "selected";
        }
        if (select.name === "to" && curr === "INR") {
            option.selected = "selected";
        }
        select.append(option);
    }
    select.addEventListener("change",(evt)=> {
        flag(evt.target);
    });
}

const flag=(element)=>{
    let curr=element.value;
    let countrycode=countryList[curr];
    console.log(countrycode);
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
};

btn.addEventListener("click",async (event)=>{
    event.preventDefault();
    let amount= document.querySelector(".amount input");
    const amtVal=amount.value;
    console.log(amtVal);
    if(amtVal==="" || amtVal<0){
        amtVal=1;
        amount.value="1";
    }
    let URL=`${baseurl}/${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    let actualData=data[fromCurr.value.toLowerCase()];
    let rate=actualData[toCurr.value.toLowerCase()];
    finalAmount=rate*amtVal;
    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;

})