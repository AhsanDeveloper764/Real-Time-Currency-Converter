const BASE_URL = "https://v6.exchangerate-api.com/v6/daf51b4cc72744a8d2cc5a94/latest";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for (let select of dropdowns) {
    for (Currcode in countryList) {
        // Create a new element
        let newOptions = document.createElement("option");
        newOptions.innerText = Currcode;
        newOptions.value = Currcode;
        if (select.name === "from" && Currcode === "PKR") {
            newOptions.selected = "selected"
        } else if (select.name === "to" && Currcode === "USD") {
            newOptions.selected = "selected"
        }
        select.append(newOptions);
        console.log("option",newOptions);
        
        // select ma jab bhi hamara option change ho
    }
    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    })
}

const updateflag = (element) => {
    let CurrCode = element.value;
    let countryCode = countryList[CurrCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
})

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    if (amtValue === "" || amtValue < 1) {
        amtValue = 1;
        amount.value = "1";
    }
    const URL = `${BASE_URL}/${fromCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.conversion_rates[toCurr.value];
    let finalAmount = (amtValue * rate).toFixed(1);
    document.querySelector(".result").innerText = `${amtValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}  

window.addEventListener("load", () => {
    updateExchangeRate();
})


// Yeh loop sabhi select elements ke liye chalega.Yani, agar tumhare paas 2 dropdowns hain (From & To), to ye 
// loop dono pe alag-alag chalega.
// Yeh loop countryList object ke andar jitni currencies hain unko access karta hai .
// Har currency ke liye ek <option> tag create kar rahe hain.
// newOptions.innerText = Currcode;
// Yahan hum dropdown ke andar dikhane wala text set karte hain. Jaise USD, PKR.
// newOptions.value = Currcode;
// Aur yeh value attribute set hota hai — backend logic ke liye use hoti hai.
// Agar select ka naam "from" hai, to "PKR" ko by default select karo.
// Agar select ka naam "to" hai, to "USD" ko by default select karo.
// select.append(newOptions);
// Har bana hua option dropdown ke andar daal diya jaata hai.
// select.addEventListener("change", (evt) => {...})
// Jab user dropdown me se koi aur currency select kare, to:
// updateflag(evt.target) function call hota hai.
// Yeh currency ke country ka flag image update karta hai.



// const updateflag = (element) => {
// Yeh ek function hai jiska naam hai updateflag. Jab koi dropdown (select) change hota hai, 
// toh woh is function ko call karta hai aur element ke through selected dropdown ko bhejta hai.
// 🧾 let CurrCode = element.value;
// Yeh line selected currency code ko le leti hai — jaise USD, PKR, etc.
// Example:
// Agar user ne USD select kiya, toh CurrCode = "USD"
// let countryCode = countryList[CurrCode];
// Yahan wo currency code se uska country code nikalta hai.
// countryList ek object hai jisme:
// {
//   USD: "US",
//   PKR: "PK",
//   INR: "IN",
//   ...
// }
// Toh agar CurrCode = "USD" ho, toh countryCode = "US" ho jaayega.
// User ne currency select ki.
// Uske corresponding country ka code nikala.
// Uska flag URL banaya.
// Image tag dhoondha.
// Flag update kar diya.


// const updateExchangeRate = async () => {
// Yeh ek async function hai — iska matlab yeh future mein kisi response (API call) ka wait karega.
// 💵 let amount = document.querySelector(".amount input");
// Yeh line HTML mein jo input field bani hai jahan user amount likhta hai (jaise 100), usko select karti hai.
// 🔢 let amtValue = amount.value;
// Yahan se woh actual amount le raha hai jo user ne type kiya hai — jaise 50 rupees ya dollars etc.
// ✅ if (amtValue === "" || amtValue < 1) {...}
// Agar user ne kuch nahi likha ya 0 ya negative likha, toh default 1 set karta hai:
// amtValue = 1;
// amount.value = "1";
// 🌐 const URL = \${BASE_URL}/${fromCurr.value}`;`
// Yeh line API ka URL bana rahi hai.
// Agar fromCurr.value = "PKR" hai, toh:
// URL = https://v6.exchangerate-api.com/v6/yourKey/latest/PKR
// Is URL se server yeh batayega ke PKR ka rate doosri currencies ke mukable mein kya hai.
// 🕸️ let response = await fetch(URL);
// Yeh line API ko call kar rahi hai aur wait kar rahi hai jab tak server se response aata hai.
// 📦 let data = await response.json();
// Yeh response ko JSON mein convert karta hai jisse use karna asaan ho jaata hai.
// 💹 let rate = data.conversion_rates[toCurr.value];
// Is line mein woh user ke selected "to currency" ka exchange rate nikal raha hai.
// Agar tum "USD" ko convert kar rahe ho "PKR" mein, toh yahaan se PKR ka rate milta hai.
// 🧮 let finalAmount = (amtValue * rate).toFixed(1);
// Yeh line conversion ka result calculate karti hai:
// Amount × Rate = Final Amount
// Aur .toFixed(1) ka matlab hai: sirf 1 decimal tak round kar do
// Example:
// 105.456 ➝ 105.5
// 📤 document.querySelector(".result").innerText = ...
// Yeh line result HTML mein show karti hai.
// Example:
// 50 USD = 13900 PKR
// 🌟 window.addEventListener("load", () => {...})
// Jab page load hota hai (refresh ya open), toh yeh function automatically call hota hai taake default currencies ka result turant show ho jaaye.
// 🔚 Summary:
// User amount aur currencies select karta hai.
// API call hoti hai real-time exchange rate ke liye.
// Result calculate hota hai.
// Page par result show ho jaata hai.
