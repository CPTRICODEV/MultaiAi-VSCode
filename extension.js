const vscode = require('vscode');
const { Configuration, OpenAIApi } = require("openai");
const copy = require("copy-paste");

exports.activate = function(context) {
  let disposable = vscode.commands.registerCommand('multiai.helloWorld', async function() {
    // Code to send request and get response
    const configuration = new Configuration({
      apiKey: ``,
    });
    const openai = new OpenAIApi(configuration);
    const input = await vscode.window.showInputBox({
      prompt: "Enter a value"
    });
    const response = await openai.createCompletion({
      model: "code-cushman-001",
      prompt: `${input}`,
      max_tokens: 100,
      temperature: 0.0,
    });
    vscode.window.showInformationMessage("Code is ready. Click to copy.", "Copy")
    .then(async (selection) => {
      if (selection === "Copy") {
        // Copy the response to the clipboard
        copy.copy(response.data.choices[0].text);
      }
    });
  });
  context.subscriptions.push(disposable);
};

