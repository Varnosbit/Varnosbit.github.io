import express from "express";
const port = 3000;
const app = express();
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});