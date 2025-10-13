document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.querySelector('.hamburger');
    const navLinksList = document.querySelector('.nav-links');
    const themeToggle = document.getElementById('theme-toggle');
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const closeButton = document.querySelector('.close-button');

    // Load initial content (Home)
    loadContent('home');

    // Event listeners for navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const page = link.dataset.page;
            loadContent(page);
        });
    });

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        navLinksList.classList.toggle('show');
    });

    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        main.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('dark-mode', isDarkMode);
    });

    // Load theme from localStorage
    const storedTheme = localStorage.getItem('dark-mode');
    if (storedTheme === 'true') {
        document.body.classList.add('dark-mode');
        main.classList.add('dark-mode');
    }

    // Function to load content dynamically
    async function loadContent(page) {
        try {
            const response = await fetch(`${page}.html`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            contentDiv.innerHTML = html;

            // Attach event listeners for forms after content is loaded
            if (page === 'login' || page === 'signup') {
                attachFormListeners(page);
            }

            if (page === 'home') {
                attachChatbot();
            }

        } catch (error) {
            contentDiv.innerHTML = `<p>Error loading content: ${error}</p>`;
        }
    }

    // Function to attach event listeners to forms
    function attachFormListeners(formType) {
        const form = document.getElementById(`${formType}-form`);
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Mock validation and storage
            if (formType === 'login') {
                if (data.username === 'user' && data.password === 'password') {
                    localStorage.setItem('loggedIn', 'true');
                    alert('Login successful!');
                    loadContent('home');
                } else {
                    alert('Invalid credentials.');
                }
            } else if (formType === 'signup') {
                localStorage.setItem('user', JSON.stringify(data));
                alert('Signup successful!');
                loadContent('login');
            }
        });
    }

    // Modal functions
    function openModal(content) {
        modalBody.innerHTML = content;
        modal.style.display = 'block';
    }

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    function attachChatbot() {
        const chatbotContainer = document.createElement('div');
        chatbotContainer.id = 'chatbot-container';
        chatbotContainer.style.position = 'fixed';
        chatbotContainer.style.bottom = '20px';
        chatbotContainer.style.right = '20px';
        chatbotContainer.style.width = '300px';
        chatbotContainer.style.height = '400px';
        chatbotContainer.style.backgroundColor = '#fff';
        chatbotContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
        chatbotContainer.style.borderRadius = '10px';
        chatbotContainer.style.overflow = 'hidden';

        const chatHeader = document.createElement('div');
        chatHeader.style.backgroundColor = '#007bff';
        chatHeader.style.color = '#fff';
        chatHeader.style.padding = '10px';
        chatHeader.style.textAlign = 'center';
        chatHeader.textContent = 'AI Chatbot';
        chatbotContainer.appendChild(chatHeader);

        const chatBody = document.createElement('div');
        chatBody.id = 'chat-body';
        chatBody.style.padding = '10px';
        chatBody.style.height = 'calc(100% - 100px)';
        chatBody.style.overflowY = 'auto';
        chatbotContainer.appendChild(chatBody);

        const chatInputArea = document.createElement('div');
        chatInputArea.style.padding = '10px';
        chatInputArea.style.display = 'flex';
        chatbotContainer.appendChild(chatInputArea);

        const chatInput = document.createElement('input');
        chatInput.type = 'text';
        chatInput.id = 'chat-input';
        chatInput.style.flexGrow = '1';
        chatInput.style.padding = '5px';
        chatInput.style.borderRadius = '5px';
        chatInput.style.border = '1px solid #ccc';
        chatInputArea.appendChild(chatInput);

        const sendButton = document.createElement('button');
        sendButton.textContent = 'Send';
        sendButton.style.backgroundColor = '#007bff';
        sendButton.style.color = '#fff';
        sendButton.style.border = 'none';
        sendButton.style.padding = '5px 10px';
        sendButton.style.borderRadius = '5px';
        sendButton.style.cursor = 'pointer';
        chatInputArea.appendChild(sendButton);

        contentDiv.appendChild(chatbotContainer);

        sendButton.addEventListener('click', () => {
            const message = chatInput.value;
            if (message) {
                displayMessage(message, 'user');
                getBotResponse(message).then(response => {
                    displayMessage(response, 'bot');
                });
                chatInput.value = '';
            }
        });

        function displayMessage(message, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.textContent = `${sender}: ${message}`;
            messageDiv.style.marginBottom = '5px';
            chatBody.appendChild(messageDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        }

        async function getBotResponse(message) {
            // Replace with actual API call to a chatbot service
            // This is a mock response
            await new Promise(resolve => setTimeout(resolve, 500));
            if (message.toLowerCase().includes('services')) {
                return 'We offer cutting-edge AI solutions tailored to your needs, including machine learning, natural language processing, and computer vision.';
            } else if (message.toLowerCase().includes('contact')) {
                return 'You can reach us at contact@aisolutions.com or call us at 555-123-4567.';
            } else {
                return 'I am an AI chatbot. How can I assist you today?';
            }
        }
    }
});