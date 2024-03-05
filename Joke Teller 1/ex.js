// console.log("Tell me a jokes");
let joke=document.querySelectorAll(".joke");
let d=document.getElementsByTagName("button")[0];
let e=document.getElementsByTagName("button")[1];
let b=Array.from(joke)
// .forEach((element)=>{
// element.innerHTML;
// })
// console.log(b);
// d.onclick=()=>{
// let c=Math.floor(Math.random()*10);
// console.log(c);
// b[c].hidden=false;
// }
let x =function() {
let c=Math.floor(Math.random()*10);
console.log(c);
b[c].hidden=false;
}
d.addEventListener('click',x)

// let y =function () {
//     location.reload();
// }
// e.addEventListener('click',y)

e.onclick=()=>{
    location.reload()
}
// console.log(Math.tan(45));
// //Makes any negetive value to positive value
// console.log(Math.abs(-45));
// // Makes any value round of , eleminate the decimal number / adjusting into absolute number 
// console.log(Math.round(461.6540));
// console.log(Math.floor(4.98));