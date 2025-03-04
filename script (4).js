document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        order: formData.get('order')
    };

    fetch('/submit-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(message => {
        document.getElementById('message').textContent = message;
        this.reset();
    })
    .catch(error => {
        console.error('Error:', error);
    });
});