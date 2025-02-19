export class ChatUI {
    static getWebviewContent(): string {
        return /*html*/`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Chat AI</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                #chat-container {
                    display: flex;
                    flex-direction: column;
                    height: 400px;
                    border: 1px solid #ccc;
                    padding: 10px;
                    overflow-y: auto;
                }
                .message {
                    margin: 5px 0;
                    padding: 8px;
                    border-radius: 5px;
                    max-width: 80%;
                }
                .user { background-color: #0078d7; color: white; align-self: flex-end; }
                .ai { background-color: #eee; color: black; align-self: flex-start; }
                #input-container {
                    display: flex;
                    margin-top: 10px;
                }
                input {
                    flex: 1;
                    padding: 10px;
                }
                button {
                    padding: 10px;
                    background-color: #0078d7;
                    color: white;
                    border: none;
                    cursor: pointer;
                }
                button:hover {
                    background-color: #005a9e;
                }
            </style>
        </head>
        <body>
            <h2>Chat AI</h2>
            <div id="chat-container"></div>
            <div id="input-container">
                <input type="text" id="input" placeholder="Type a message..." />
                <button id="ask-button">Ask</button>
            </div>

            <script>
                const vscode = acquireVsCodeApi();

                document.getElementById('ask-button').addEventListener('click', sendMessage);
                document.getElementById('input').addEventListener('keydown', function(event) {
                    if (event.key === 'Enter') {
                        sendMessage();
                    }
                });

                function sendMessage() {
                    const inputField = document.getElementById('input');
                    const message = inputField.value.trim();
                    if (!message) return;

                    inputField.value = '';
                    addMessage('You', message, 'user');
                    vscode.postMessage({ text: message });
                }

                function addMessage(user, text, type) {
                    const container = document.getElementById('chat-container');
                    const msgDiv = document.createElement('div');
                    msgDiv.classList.add('message', type);
                    msgDiv.innerHTML = '<strong>' + user + ':</strong> ' + text;
                    container.appendChild(msgDiv);
                    container.scrollTop = container.scrollHeight;
                }

                window.addEventListener('message', event => {
                    const message = event.data.text;
                    addMessage('AI', message, 'ai');
                });
            </script>
        </body>
        </html>`;
    }
}
