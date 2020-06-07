console.log('Hello World!')

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const API_URL = 'http://localhost:5000/messages'

loadingElement.style.display = 'none';

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const message = formData.get('message');
    
    const userMessage = {
        name,
        message
    }

    console.log(userMessage)
    form.style.display = 'none';
    loadingElement.style.display = '';

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(userMessage),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
      .then(createdMessage => {
        console.log(createdMessage);
      });
});