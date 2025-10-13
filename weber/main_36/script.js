document.addEventListener('DOMContentLoaded', function () {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.getElementById('hamburger');
    const contentDiv = document.getElementById('content');

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Function to load content dynamically
    function loadContent(page) {
        fetch(page + '.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                contentDiv.innerHTML = data;
                // Initialize chatbot if it's the chatbot page
                if (page === 'chatbot') {
                    initializeChatbot();
                }
            })
            .catch(error => {
                console.error('Error loading content:', error);
                contentDiv.innerHTML = '<p>Failed to load content.</p>';
            });
    }

    // Initial content load (Home page)
    loadContent('home');

    // Navigation handling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            loadContent(targetId);

            // Close the hamburger menu on mobile after clicking a link
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Chatbot functionality
    function initializeChatbot() {
        const chatContainer = document.querySelector('.chat-container');
        const messageInput = document.querySelector('#messageInput');
        const sendButton = document.querySelector('#sendButton');

        sendButton.addEventListener('click', function () {
            const messageText = messageInput.value;
            if (messageText.trim() !== '') {
                // Display user message
                const userMessageDiv = document.createElement('div');
                userMessageDiv.classList.add('user-message');
                userMessageDiv.textContent = messageText;
                chatContainer.appendChild(userMessageDiv);

                // Simulate bot response (replace with actual AI logic)
                setTimeout(() => {
                    const botResponse = getBotResponse(messageText);
                    const botMessageDiv = document.createElement('div');
                    botMessageDiv.classList.add('bot-message');
                    botMessageDiv.textContent = botResponse;
                    chatContainer.appendChild(botMessageDiv);

                    // Scroll to bottom of chat
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                }, 500);

                // Clear input
                messageInput.value = '';
            }
        });

        // Function to generate bot responses (replace with actual AI logic)
        function getBotResponse(userMessage) {
            userMessage = userMessage.toLowerCase();
            if (userMessage.includes('hello') || userMessage.includes('hi')) {
                return 'Hello! How can I assist you today?';
            } else if (userMessage.includes('services')) {
                return 'We offer a range of AI-powered productivity tools. Check out our services page for more details.';
            } else if (userMessage.includes('contact')) {
                return 'You can contact us through the contact form on our contact page.';
            } else {
                return 'I am here to help you with your queries regarding Worktual. Please be more specific.';
            }
        }
    }
});