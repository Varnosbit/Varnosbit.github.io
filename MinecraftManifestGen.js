<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minecraft Manifest Generator</title>
    <style>
        * {
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }

        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f4f4f9;
        }

        .container {
            width: 100%;
            max-width: 500px;
            padding: 20px;
            border-radius: 8px;
            background-color: #fff;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            text-align: center;
            color: #333;
        }

        form label {
            display: block;
            margin: 10px 0;
            color: #666;
        }

        form input, form textarea, form select, button {
            width: 100%;
            padding: 8px;
            margin-top: 5px;
            font-size: 1em;
        }

        textarea {
            height: 200px;
            width: 100%;
        }

        button {
            margin-top: 15px;
            background-color: #5c6bc0;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        button:hover {
            background-color: #3949ab;
        }

        .checkboxes {
            display: flex;
            justify-content: space-between;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Minecraft Manifest Generator</h1>
        <form id="manifestForm">
            <label>Name: <input type="text" id="name" required></label>
            <label>Description: <textarea id="description" required></textarea></label>
            <label>Author: <input type="text" id="author" value="Allou Mohamed"></label>
            <label>Main File: <input type="text" id="mainFile" value="scripts/index.js"></label>
            <label>Version (comma separated): <input type="text" id="version" value="1,0,0"></label>
            <label>Min Engine Version (comma separated): <input type="text" id="minEngineVersion" value="1,21,0"></label>
            <label>Module Type:
                <select id="moduleType">
                    <option value="script">Script</option>
                    <option value="data">Data</option>
                </select>
            </label>
            <label>Module Description: <input type="text" id="moduleDesc" value="For Support Realm and Server"></label>
            <label>Capabilities (comma separated): <input type="text" id="capabilities" value="script_eval"></label>
            <label>License: <input type="text" id="license" value="MIT"></label>
            <label>Metadata URL: <input type="url" id="url" value="https://fb.me/proarcoder"></label>

            <div class="checkboxes">
                <label><input type="checkbox" id="minecraftServer" checked> @minecraft/server</label>
                <label><input type="checkbox" id="minecraftServerUi" checked> @minecraft/server-ui</label>
            </div>

            <button type="button" onclick="generateManifest()">Generate Manifest</button>
        </form>
        <textarea id="output" readonly></textarea>
        <button id="copyButton" onclick="copyToClipboard()">Copy to Clipboard</button>
    </div>

    <script>
        function generateUUID() {
            return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[x]/g, function() {
                const randomHex = (Math.random() * 16) | 0;
                return randomHex.toString(16);
            });
        }

        function Manifest({
            NAME,
            DESCRIPTION,
            AUTHOR = "Allou Mohamed",
            MAIN_FILE = "scripts/index.js",
            VERSION = [1, 0, 0],
            MIN_ENGINE_VERSION = [1, 21, 0],
            FORMAT_VERSION = 2,
            MODULE_TYPE = "script",
            MODULE_DESC = "For Support Realm and Server",
            DEPENDENCIES = [],
            CAPABILITIES = ["script_eval"],
            METADATA = {
                authors: ["Allou Mohamed"],
                license: "MIT",
                url: "https://fb.me/proarcoder"
            }
        } = {}) {
            return {
                "format_version": FORMAT_VERSION,
                "header": {
                    "name": NAME,
                    "description": DESCRIPTION,
                    "uuid": generateUUID(),
                    "version": VERSION,
                    "min_engine_version": MIN_ENGINE_VERSION
                },
                "modules": [
                    {
                        "type": MODULE_TYPE,
                        "description": MODULE_DESC,
                        "uuid": generateUUID(),
                        "version": VERSION,
                        "language": "javascript",
                        "entry": MAIN_FILE
                    }
                ],
                "dependencies": DEPENDENCIES,
                "capabilities": CAPABILITIES,
                "metadata": {
                    "authors": METADATA.authors,
                    "license": METADATA.license,
                    "url": METADATA.url
                }
            };
        }

        function generateManifest() {
            const name = document.getElementById("name").value;
            const description = document.getElementById("description").value;
            const author = document.getElementById("author").value;
            const mainFile = document.getElementById("mainFile").value;
            const version = document.getElementById("version").value.split(',').map(Number);
            const minEngineVersion = document.getElementById("minEngineVersion").value.split(',').map(Number);
            const moduleType = document.getElementById("moduleType").value;
            const moduleDesc = document.getElementById("moduleDesc").value;
            const capabilities = document.getElementById("capabilities").value.split(',');
            const license = document.getElementById("license").value;
            const url = document.getElementById("url").value;

            const dependencies = [];
            if (document.getElementById("minecraftServer").checked) {
                dependencies.push({ module_name: "@minecraft/server", version: "1.15.0" });
            }
            if (document.getElementById("minecraftServerUi").checked) {
                dependencies.push({ module_name: "@minecraft/server-ui", version: "1.3.0" });
            }

            const manifest = Manifest({
                NAME: name,
                DESCRIPTION: description,
                AUTHOR: author,
                MAIN_FILE: mainFile,
                VERSION: version,
                MIN_ENGINE_VERSION: minEngineVersion,
                MODULE_TYPE: moduleType,
                MODULE_DESC: moduleDesc,
                DEPENDENCIES: dependencies,
                CAPABILITIES: capabilities,
                METADATA: {
                    authors: [author],
                    license: license,
                    url: url
                }
            });

            document.getElementById("output").value = JSON.stringify(manifest, null, 2);
        }

        function copyToClipboard() {
            const output = document.getElementById("output");
            output.select();
            document.execCommand("copy");
            alert("Manifest copied to clipboard!");
        }
    </script>
</body>
</html>