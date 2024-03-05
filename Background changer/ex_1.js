const Headline=document.getElementsByTagName("h1")
Array.from(Headline).map((item)=>item.style.color="#212121")
const changecolor=document.querySelectorAll('.button')
console.log(changecolor);
changecolor.forEach((button)=>button.addEventListener('click',
function (e) {
    document.querySelector('body').style.backgroundColor=e.target.id
}))

const Headline1=document.querySelector('h1')
Headline1.addEventListener('click',function() {
    Headline1.style.color="green"
    Headline1.innerText="new one"
})

