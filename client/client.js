console.log('Hello World!')

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');

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
});