console.log('Client side javascript file is loaded.')

const weatherForm = document.querySelector('form')
//have access to the input provided by user
const search = document.querySelector('input')
//messages 
//the first one will select the first paragraph from index.hbs
//const messageOne = document.querySelector(p)
//so we used a UNIQUE ID TO SELECT THE PARAGRAPH WE WANTED
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//add an event listener
weatherForm.addEventListener('submit', (e) => {
    //prevent browser by doing default action --- refresh the page 
    //so it will do nothing
    e.preventDefault()

    //it will take the input from user --- the address
    const location = search.value

    //this will be showed on webpage --- weather page
    //text content is used to display on web
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    //fetch API ---> fetch data from url
    //also here we used PROMISES ---> .then()
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})