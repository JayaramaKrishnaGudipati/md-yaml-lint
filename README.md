# README

The "markdown-yaml-lint" is a yaml lint checker specifically for checking the yaml syntax in a markdown file.

This extension checks the syntax of the yaml code embedded in a markdown file in a yaml snippet.

## Procedure

Open a markdown file having yaml code in a yaml code block and select 'md-yaml-lint' from vscode command palette, if any syntax issues in the yaml code block, the extension will open a console and displays the issues with Line Numbers.

example of yaml code:

```yaml
tags:
  - update: button1
    publication:
      publicName: requestGreenLeft
  - update: button2
    publication:
      publicName: requestGreenRight
```

If any syntax issues in the yaml code blocks in a markdown file the extension will open terminal and display the issues along with line numbers, if the yaml code block is fine and doesn't have any issues then the extension displays as "the code block is valid".

example of lint check results on console:

```text
YAML Code Block 1 Errors:
Line 6: [error] wrong indentation: expected 1 but found 0 (indentation)
Line 7: [error] wrong indentation: expected 3 but found 4 (indentation)
Line 7: [error] syntax error: mapping values are not allowed here (syntax)
Line 8: [error] trailing spaces (trailing-spaces)
Line 15: [error] trailing spaces (trailing-spaces)
YAML Code Block 2 is valid!
YAML Code Block 3 Errors:
Line 6: [error] trailing spaces (trailing-spaces)
Line 17: [error] trailing spaces (trailing-spaces)
Line 28: [error] trailing spaces (trailing-spaces)
```

## Requirements

Make sure the extension is selected on a .md file else vscode issues a warning as shown below.

```text
Please open a Markdown file before running YAML linting.
```

## Release Notes

This extension is released for checking the yaml lint in a Markdown file.

### 1.0.0

Initial release of md-yaml-lint extension.

---

## Working with Markdown

You can author your README using Visual Studio Code.  Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)
