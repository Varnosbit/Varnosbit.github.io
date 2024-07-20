import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = 3000;
const app = express();
app.get('/', (req, res) => res.sendFile(__dirname + '/allou.html'));
app.get('/allou', (req, res) => res.sendFile(__dirname + '/allou.html'));
app.get('/aziz', (req, res) => res.sendFile(__dirname + '/aziz.html'));
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
