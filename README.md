# Chat App with Socket.IO

A simple real-time chat application built with Node.js, Express, and Socket.IO. Open the app in multiple browser windows to exchange messages instantly.

> **Note:** This project is a learning/demo app, not a private or secure messaging service. Messages are broadcast to every connected client and kept only in server memory.

## Features

- Assigns each connected visitor a generated two-word username.
- Sends messages between connected browsers in real time.
- Shows the current in-memory chat history to new connections.
- Serves the frontend and Socket.IO client from the same Node.js server.
- Uses a responsive chat layout styled with Tailwind CSS.

## Technologies

- **Node.js** — JavaScript runtime for the server.
- **Express** — serves the frontend files and the home page.
- **Socket.IO** — provides the real-time, two-way connection between browser and server.
- **HTML, CSS, and browser JavaScript** — build the chat interface and handle user interaction.
- **Tailwind CSS 2.2.7** — utility classes for layout and styling, loaded from jsDelivr.
- **unique-names-generator** — creates a name for each connected visitor.
- **nodemon** — restarts the development server when watched files change.

## Requirements

- Node.js and npm
- A modern web browser

## Run locally

Open a terminal in this project folder:

```powershell
cd "C:\path\to\Chat-App-with-Socket.IO"
npm ci
npm run server
```

Alternatively, `npm run serve` starts the same development server. When it reports that it is listening, open [http://localhost:3000](http://localhost:3000). To test a group chat, open the address in more than one browser tab or window.

Stop the server with **Ctrl+C** in the terminal where it is running.

## How it works

1. Express serves `frontend/index.html`, the frontend script, and other static assets. The page loads the Socket.IO client from `/socket.io/socket.io.js`, which is served by the same server.
2. `frontend/script.js` connects to the server with `io()` and listens for `receive-messages`.
3. When a browser connects, the server in `backend/server-starter.js` generates a username with `unique-names-generator` and sends it along with the current chat history.
4. When the user submits the form, the frontend prevents the browser's default page reload and emits a `post-message` event with the message.
5. The server adds the message and sender's username to its in-memory array, then broadcasts the updated history to all connected browsers with `io.emit("receive-messages", ...)`.
6. The frontend creates message elements using DOM APIs and `textContent`, then replaces the chat window contents. This displays message text without treating it as HTML.

## Project structure

```text
Chat-App-with-Socket.IO/
├── backend/
│   ├── server-starter.js     # Development server used by npm run server/serve
│   └── server-completed.js   # Standalone completed server version
├── frontend/
│   ├── index.html            # Chat page and styles
│   └── script.js             # Socket.IO client and chat UI behavior
├── package.json              # Dependencies and npm scripts
├── package-lock.json         # Locked dependency versions
└── LICENSE
```

## Current limitations

- Chat history is stored in server memory. It is cleared whenever the server restarts and is not shared across multiple server instances.
- Messages are broadcast to all connected clients; there are no private rooms, accounts, or authentication.
- Tailwind CSS is loaded from a CDN, so styling requires access to jsDelivr.
- The app listens on port `3000`.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run server` | Run the development server with nodemon. |
| `npm run serve` | Alias for `npm run server`. |
| `npm run completed` | Run `backend/server-completed.js` directly with Node.js. |
