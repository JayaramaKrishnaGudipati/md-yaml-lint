const vscode = require('vscode');
const path = require('path');
const { spawnSync } = require('child_process');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Congratulations, your extension "md-yaml-lint" is now active!');

    let disposable = vscode.commands.registerCommand('md-yaml-lint.runYamlLint', function () {
        const editor = vscode.window.activeTextEditor;

        if (editor && editor.document.languageId === 'markdown') {
            const markdownFilePath = editor.document.uri.fsPath;
            runYamlLint(markdownFilePath);
        } else {
            vscode.window.showErrorMessage('Please open a Markdown file before running YAML linting.');
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

function extractYamlCodeBlocks(markdownContent) {
    const yamlCodeBlocks = [];
    const lines = markdownContent.split('\n');
    let isYamlBlock = false;
    let currentBlock = [];

    for (const line of lines) {
        if (line.trim().startsWith('```yaml')) {
            isYamlBlock = true;
            currentBlock = [];
        } else if (isYamlBlock && line.trim() === '```') {
            isYamlBlock = false;
            yamlCodeBlocks.push(currentBlock.join('\n'));
        } else if (isYamlBlock) {
            currentBlock.push(line);
        }
    }

    return yamlCodeBlocks;
}

function runYamlLint(markdownFilePath) {
	const fs = require('fs'); // Import the 'fs' module
	const markdownContent = fs.readFileSync(markdownFilePath, 'utf-8');
	const yamlCodeBlocks = extractYamlCodeBlocks(markdownContent);

	//Create an output channel for displaying messages in the VS Code terminal
    const outputChannel = vscode.window.createOutputChannel('YAML Lint Output');
    outputChannel.show(true);
    const yamllintPath = 'yamllint';

    yamlCodeBlocks.forEach((yamlBlock, index) => {
        try {
            // Run the yamllint command synchronously
            const result = spawnSync(yamllintPath, ['-f', 'parsable', '--no-warnings', '-'], { input: yamlBlock, encoding: 'utf-8' });

            if (result.stdout) {
                // outputChannel.appendLine(`Code Block ${index + 1} Errors:\n${result.stdout}`);
                outputChannel.appendLine(`YAML Code Block ${index + 1} Errors:`);
                const linesWithIssues = result.stdout.split('\n');
                linesWithIssues.forEach((lineWithIssue) => {
                    if (lineWithIssue) {
                        const [, lineNumber, , issue] = lineWithIssue.match(/:(\d+):(\d+):\s*(.*)/);
                        if (lineNumber !== undefined && issue !== undefined) {
                            const errorMessage = `Line ${lineNumber}: ${issue}`;
                            outputChannel.appendLine(`${errorMessage}`);
                        }
                    }
                });
            } else {
                outputChannel.appendLine(`YAML Code Block ${index + 1} is valid!`);
            }
        } catch (error) {
            vscode.window.showErrorMessage(`Error: ${error.message}`);
        }
    });
}

module.exports = {
    activate,
    deactivate
};
