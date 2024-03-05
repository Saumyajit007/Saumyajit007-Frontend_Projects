// async function jokeFunc(){
//     let jokes=await fetch(' https://icanhazdadjoke.com/');
//     let fetJokes=await JSON.stringify(jokes);
//     console.log(jokes);
// }
// jokeFunc();

function telljoke(){
    let joke=fetch('https://official-joke-api.appspot.com/random_joke')
joke.then((value)=>{
    // console.log(value.result);
    console.log(value.status);
    return value.json()
})
.then((value)=>{
    {
        document.querySelector('#setup').innerHTML = `SETUP : ${value.setup}`
        document.querySelector('#punchline').innerHTML = `PunchLine : ${value.punchline}`
    }
})
.catch((error)=>console.log(error));
}

document.querySelector('#btn').addEventListener('click',telljoke)