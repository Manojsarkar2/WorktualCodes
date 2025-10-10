document.addEventListener('DOMContentLoaded', function() {
    const chatLog = document.getElementById('chat-log');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    sendButton.addEventListener('click', function() {
        const message = messageInput.value;
        if (message.trim() !== '') {
            appendMessage('You', message);
            messageInput.value = '';
            // Simulate AI response
            setTimeout(function() {
                appendMessage('AI', 'This is a simulated response: ' + message);
            }, 1000);
        }
    });

    function appendMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = sender + ': ' + message;
        chatLog.appendChild(messageElement);
        chatLog.scrollTop = chatLog.scrollHeight; // Scroll to bottom
    }

    // Example usage of auth functions (assuming auth.js is loaded)
    const loginLink = document.getElementById('loginLink');
    const signupLink = document.getElementById('signupLink');
    const logoutLink = document.getElementById('logoutLink');

    loginLink.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'auth/login.html';
    });

    signupLink.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'auth/signup.html';
    });

    logoutLink.addEventListener('click', function(event) {
        event.preventDefault();
        logout(); // Assuming logout function is in auth.js
    });

    // Check authentication status on page load
    if (isAuthenticated()) { // Assuming isAuthenticated function is in auth.js
        loginLink.style.display = 'none';
        signupLink.style.display = 'none';
        logoutLink.style.display = 'inline';
    } else {
        loginLink.style.display = 'inline';
        signupLink.style.display = 'inline';
        logoutLink.style.display = 'none';
    }
});