console.log('Hello World!')

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const messageElement = document.querySelector('.messages')
const API_URL = 'http://localhost:5000/messages'

loadingElement.style.display = 'none';

listAllMessages();

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
        form.reset();
        setTimeout(() => {
            form.style.display = '';
        }, 30000)
        
        listAllMessages();
      });
});

function listAllMessages() {
    messageElement.innerHTML
    fetch(API_URL) 
        .then(response => response.json())
        .then(messages => {
            console.log(messages);
            messages.reverse();
            messages.forEach(message => {
                const div = document.createElement('div');

                const header= document.createElement('h3');
                header.textContent = message.name;

                const contents = document.createElement('p');
                contents.textContent = message.content;

                const date = document.createElement('small');
                date.textContent = new Date(message.created);

                div.appendChild(header);
                div.appendChild(contents);
                div.appendChild(date);

                messageElement.appendChild(div);
            });
            loadingElement.style.display = 'none';
        });
}