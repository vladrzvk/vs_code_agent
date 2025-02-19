import * as vscode from 'vscode';
import { AgentProcessor } from './AgentProcessor';
import { UserInputHandler } from './UserInputHandler';
import { ChatUI } from './ChatUI';

export class ChatController {
    private panel: vscode.WebviewPanel | null = null;
    private agentProcessor: AgentProcessor;
    private userInputHandler: UserInputHandler;

    constructor(context: vscode.ExtensionContext) {
        this.agentProcessor = new AgentProcessor();
        this.userInputHandler = new UserInputHandler();

        // Enregistre la commande pour ouvrir le chat
        let disposable = vscode.commands.registerCommand('agent.openChat', () => {
            this.createWebviewPanel(context);
        });

        context.subscriptions.push(disposable);
    }

    private createWebviewPanel(context: vscode.ExtensionContext) {
        if (this.panel) {
            this.panel.reveal(vscode.ViewColumn.One);
            return;
        }

        this.panel = vscode.window.createWebviewPanel(
            'chatPanel',
            'My Chat AI',
            vscode.ViewColumn.One,
            { enableScripts: true }
        );

        this.panel.webview.html = ChatUI.getWebviewContent();
        this.setupMessageListener();

        this.panel.onDidDispose(() => {
            this.panel = null;
        }, null, context.subscriptions);
    }

    private setupMessageListener() {
        this.panel?.webview.onDidReceiveMessage(
            async (message) => {
                console.log(`Message reçu depuis la WebView: ${message.text}`);

                // Vérifie si c'est une commande ou un message normal
                const processedInput = this.userInputHandler.processInput(message.text);

                // Simulation de la réponse sans API externe (Mode test)
                const response = await this.agentProcessor.getMockResponse(processedInput);

                console.log(`Réponse de l'AgentProcessor: ${response}`);

                this.panel?.webview.postMessage({ text: response });
            },
            undefined
        );
    }
}
