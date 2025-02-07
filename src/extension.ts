import * as vscode from 'vscode';

interface TerminalCommand {
  commandId: string;
  // A terminal name is still useful when creating a new terminal if none is active.
  terminalName: string;
  commandText: string;
  buttonText: string;
  tooltip: string;
}

export function activate(context: vscode.ExtensionContext) {
  const terminalCommands: TerminalCommand[] = [
    {
      commandId: 'extension.runNpmIos',
      terminalName: 'Default Terminal',
      commandText: 'npm run ios',
      buttonText: '$(terminal) npm run ios',
      tooltip: 'Run "npm run ios"',
    },
    {
      commandId: 'extension.runNpmAndroid',
      terminalName: 'Default Terminal',
      commandText: 'npm run android',
      buttonText: '$(terminal) npm run android',
      tooltip: 'Run "npm run android"',
    },
    {
      commandId: 'extension.runExpoPrebuild',
      terminalName: 'Default Terminal',
      commandText: 'expo prebuild --clean',
      buttonText: '$(terminal) Expo Prebuild',
      tooltip: 'Run "expo prebuild"',
    },
    {
      commandId: 'extension.runPodInstall',
      terminalName: 'Default Terminal',
      commandText: 'pod install --repo-update',
      buttonText: '$(terminal) pod install --repo-update',
      tooltip: 'Run "pod install --repo-update"',
    },
    {
      commandId: 'extension.cleanProject',
      terminalName: 'Default Terminal',
      commandText: 'rm -rf node_modules ios',
      buttonText: '$(terminal) rm node_modules ios',
      tooltip: 'Run "rm -rf node_modules ios .expo"',
    },
    {
      commandId: 'extension.runNpmInstall',
      terminalName: 'Default Terminal',
      commandText: 'npm install',
      buttonText: '$(trashcan) npm install',
      tooltip: 'Run "npm install"',
    }
  ];

  terminalCommands.forEach((cmd) => {
    const disposable = vscode.commands.registerCommand(cmd.commandId, () => {
      // Use the active terminal if available.
      let terminal = vscode.window.activeTerminal;
      if (!terminal) {
        // If there is no active terminal, create one.
        terminal = vscode.window.createTerminal(cmd.terminalName);
      }
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
