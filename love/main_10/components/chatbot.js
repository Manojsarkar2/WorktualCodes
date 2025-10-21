// components/chatbot.js
function Chatbot() {
    return `
        <div id="chatbot-container">
            <div id="chatbot-header">Chatbot</div>
            <div id="chatbot-messages"></div>
            <div id="chatbot-input">
                <input type="text" id="messageInput" placeholder="Type your message...">
                <button onclick="sendMessage()">Send</button>
            </div>
        </div>
    `;
}

export default Chatbot;