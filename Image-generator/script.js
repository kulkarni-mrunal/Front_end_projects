/* XMLHttpRequest API - XMLHttpRequest(XHR) objects are used to 
interact with servers.You can retrieve data from a URL without
having to do a full page refresh.This enables a Web page to 
update just part of a page without disrupting what the user is doing.
*/
const button = document.querySelector(".generate-image-btn");
const image = document.querySelector("img")

button.addEventListener('click', () => {
    const xhr = new XMLHttpRequest()

    xhr.responseType = 'json'

    xhr.addEventListener('load', () => {
        image.src = xhr.response.message
        console.log(xhr);
    })

    xhr.open("GET", 'https://dog.ceo/api/breeds/image/random')
    xhr.send()
})