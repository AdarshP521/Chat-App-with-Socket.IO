const chat = document.querySelector(".chat");
const chatWindow = document.querySelector(".chat-window");
let chatHistory = [];

const socket = io();

socket.on("receive-messages", (data) => {
  const { chatHistory, username } = data || {};
  if (username !== undefined) updateUsername(username);
  render(chatHistory);
});

chat.addEventListener("submit", function (e) {
  e.preventDefault();
  sendMessage(chat.elements.message.value);
  chat.elements.message.value = "";
});

async function sendMessage(message) {
  socket.emit("post-message", {
    message,
  });
}

function render(messages = []) {
  const fragment = document.createDocumentFragment();

  for (const { username, message } of messages) {
    const row = document.createElement("div");
    row.className = "flex items-center";

    const avatar = document.createElement("div");
    avatar.className =
      "w-5 h-5 bg-green-400 text-white rounded-full flex items-center justify-center mr-2";
    avatar.setAttribute("aria-hidden", "true");
    avatar.textContent = "🌏";

    const text = document.createElement("p");
    text.className = "text-gray-100 text-lg";
    text.textContent = `${username}: ${message}`;

    row.append(avatar, text);
    fragment.append(row);
  }

  chatWindow.replaceChildren(fragment);
}

function updateUsername(username) {
  document.querySelector("h1").innerHTML = username;
}
