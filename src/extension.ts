import * as vscode from 'vscode';

// This interface defines each custom terminal command
interface TerminalCommand {
  commandId: string;
  terminalName: string;
  commandText: string;
  buttonText: string;
  tooltip: string;
}

export function activate(context: vscode.ExtensionContext) {
	console.log('Custom terminal extension activated!');

  // Define the commands you want to create buttons for.
  const terminalCommands: TerminalCommand[] = [
    {
      commandId: 'extension.runNpmIos',
      terminalName: 'Terminal - npm run ios',
      commandText: 'npm run ios',
      buttonText: '$(terminal) npm run ios',
      tooltip: 'Run "npm run ios"',
    },
    {
      commandId: 'extension.runPodInstall',
      terminalName: 'Terminal - pod install',
      commandText: 'pod install --repo-upgrade',
      buttonText: '$(terminal) pod install',
      tooltip: 'Run "pod install --repo-upgrade"',
    },
    {
      commandId: 'extension.cleanProject',
      terminalName: 'Terminal - Clean Project',
      commandText: 'rm -rf node_modules ios .expo',
      buttonText: '$(terminal) Clean Project',
      tooltip: 'Run "rm -rf node_modules ios .expo"',
    },
  ];

  // Iterate over each command, register it, and create a corresponding status bar button.
  terminalCommands.forEach((cmd) => {
    // Register the command with VS Code’s command palette.
    const disposable = vscode.commands.registerCommand(cmd.commandId, () => {
      // Look for an existing terminal with the given name.
      let terminal = vscode.window.terminals.find(t => t.name === cmd.terminalName);
      if (!terminal) {
        terminal = vscode.window.createTerminal(cmd.terminalName);
      }
      // Send the desired terminal command.
      terminal.sendText(cmd.commandText);
      terminal.show();
    });
    context.subscriptions.push(disposable);

    // Create a status bar item (button) to trigger the command.
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    statusBarItem.text = cmd.buttonText;
    statusBarItem.command = cmd.commandId;
    statusBarItem.tooltip = cmd.tooltip;
    statusBarItem.show();

    context.subscriptions.push(statusBarItem);
  });
}

export function deactivate() {}
