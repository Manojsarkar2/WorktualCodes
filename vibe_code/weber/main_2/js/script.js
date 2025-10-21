document.addEventListener('DOMContentLoaded', function() {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatLog = document.getElementById('chat-log');

    sendButton.addEventListener('click', function() {
        const message = messageInput.value.trim();
        if (message !== '') {
            appendMessage('You', message);
            messageInput.value = '';
            // Simulate chatbot response
            setTimeout(function() {
                appendMessage('Chatbot', 'This is a simulated response to: ' + message);
            }, 1000);
        }
    });

    messageInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendButton.click();
        }
    });

    function appendMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatLog.appendChild(messageElement);
        chatLog.scrollTop = chatLog.scrollHeight; // Scroll to bottom
    }
});