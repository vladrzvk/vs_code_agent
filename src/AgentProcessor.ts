import {AIResponse} from './IAReponse';

export class AgentProcessor {

    async getMockResponse(userMessage: string): Promise<string> {
        // Mode test : répondre toujours "Hello World"
        return "Hello World";
    }
    async getResponse(userMessage: string): Promise<string> {
        try {
            const response = await fetch('http://localhost:11434/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ model: 'codellama', prompt: userMessage }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = (await response.json()) as AIResponse;
            return data.response || "No response from AI.";
        } catch (error) {
            return `Error: ${error instanceof Error ? error.message : "Unknown error"}`;
        }
    }
}
