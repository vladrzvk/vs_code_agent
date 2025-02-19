export class UserInputHandler {
    processInput(input: string): string {
        input = input.trim();
        if (input.startsWith("/")) {
            return this.handleCommand(input);
        }
        return input;
    }

    private handleCommand(command: string): string {
        switch (command) {
            case "/help":
                return "Available commands: /clear, /help";
            case "/clear":
                return "Chat cleared.";
            default:
                return "Unknown command. Type /help for a list of commands.";
        }
    }
}
