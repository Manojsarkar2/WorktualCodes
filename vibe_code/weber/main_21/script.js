document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const navLinks = document.querySelectorAll('nav a');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    const themeToggle = document.getElementById('theme-toggle');

    // Load initial content (Home page)
    loadContent('home');

    // Theme functionality
    const storedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (storedTheme) {
        document.documentElement.setAttribute('data-theme', storedTheme);
    }

    themeToggle.addEventListener('click', (e) => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', targetTheme);
        localStorage.setItem('theme', targetTheme);
    });

    // Navigation functionality
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            loadContent(page);
        });
    });

    // Hamburger menu functionality
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Function to load content dynamically
    async function loadContent(page) {
        try {
            const response = await fetch(`${page}.html`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            contentDiv.innerHTML = html;

            // Initialize chatbot if it's the chatbot page
            if (page === 'chatbot') {
                initializeChatbot();
            }

            // Initialize login form if it's the login page
            if (page === 'login') {
                initializeLoginForm();
            }

             // Initialize signup form if it's the signup page
             if (page === 'signup') {
                initializeSignupForm();
            }

        } catch (error) {
            console.error('Failed to load content:', error);
            contentDiv.innerHTML = '<p>Failed to load page content.</p>';
        }
    }

    // Chatbot functionality
    function initializeChatbot() {
        const chatLog = document.getElementById('chat-log');
        const chatInput = document.getElementById('chat-input');
        const sendButton = document.getElementById('send-button');

        sendButton.addEventListener('click', sendMessage);
        chatInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                sendMessage();
            }
        });

        function sendMessage() {
            const messageText = chatInput.value.trim();
            if (messageText) {
                appendMessage('user', messageText);
                chatInput.value = '';
                // Simulate bot response (replace with actual AI logic)
                setTimeout(() => {
                    const botResponse = getBotResponse(messageText);
                    appendMessage('bot', botResponse);
                }, 500);
            }
        }

        function appendMessage(sender, message) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', `${sender}-message`);
            messageDiv.textContent = message;
            chatLog.appendChild(messageDiv);
            chatLog.scrollTop = chatLog.scrollHeight; // Scroll to bottom
        }

        function getBotResponse(userMessage) {
            // Replace with actual AI logic here
            userMessage = userMessage.toLowerCase();

            if (userMessage.includes('hello') || userMessage.includes('hi')) {
                return 'Hello there! How can I assist you today?';
            }
            else if (userMessage.includes('how are you')) {
                return 'I am doing well, thank you for asking!';
            }
            else if (userMessage.includes('help')) {
                return 'Sure, I can help you with many things. What do you want to know?';
            }
            else if (userMessage.includes('what is your name')) {
                return 'I am AgentAI, your helpful assistant.';
            }
            else {
                return 'I am still learning, but I will try my best to answer your question.';
            }
        }
    }

    // Login Form functionality
    function initializeLoginForm() {
        const loginForm = document.getElementById('login-form');

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            // Mock authentication (replace with actual authentication logic)
            if (email === 'test@example.com' && password === 'password') {
                alert('Login successful!');
                // Store session data in localStorage
                localStorage.setItem('user', JSON.stringify({ email: email }));
                // Redirect to home page or another authorized page
                loadContent('home');
            } else {
                alert('Invalid credentials.');
            }
        });
    }

    // Signup Form functionality
    function initializeSignupForm() {
        const signupForm = document.getElementById('signup-form');

        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }

            // Mock user registration (replace with actual registration logic)
            localStorage.setItem('user', JSON.stringify({ email: email }));
            alert('Signup successful!');
            loadContent('login');
        });
    }
});