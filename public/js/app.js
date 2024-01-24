// console.log("Console it is!!")

// fetch("https://puzzle.mead.io/puzzle").then((response) => {
//     response.json().then((data) => {

//         console.log(data)
//     })
// })
// fetch("http://localhost:3000/weather?address=!").then((response) => {
//     return response.json()
// }).then((data) => {
//     if (data.error) {
//         console.log(data.error)
//     } else {
//         console.log(data)
//     }
// })


const weatherForm = document.querySelector('form')
const search = document.querySelector("input")
const Message1 = document.querySelector("#message1")
const Message2 = document.querySelector("#message2")

// Message1.textContent
weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    Message1.textContent = "Loading..."
    Message2.textContent = " "
    const location = search.value
    fetch("http://localhost:3000/weather?address="+location).then((response) => {
        return response.json()
    }).then((data) => {
        if (data.error) {
            Message1.textContent = data.error
        } else {
            Message1.textContent=data.Location
            Message2.textContent=data.Weather
        }
    })
})
