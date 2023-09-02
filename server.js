import { appendFile } from 'fs/promises';
import * as http from 'http';

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    var url = req.url;

    try {
        const urlString = `Request URL: ${url} - `;
        const timestampString = `Timestamp: ${Date().toString()}\n`;

        console.log("Adding request log..")
        appendFile("requests.txt", urlString + timestampString);
        console.log("Request Log Added!");

        res.end("Request Log Added Succesfully!");
    } catch (error) {
        console.log(error);
        res.end("Failed to add request to file!");
    }


});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});