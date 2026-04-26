const API_URL = CONFIG.chatbotApi;
const sessionId = CONFIG.sessionId;

function addMessage(text, type) {
const div = document.createElement("div");
div.className = "msg " + type;
div.innerText = text;
document.getElementById("chat").appendChild(div);
document.getElementById("chat").scrollTop = 9999;
}

async function send() {
const input = document.getElementById("input");
const message = input.value;

if (!message) return;

addMessage(message, "user");
input.value = "";

addMessage("Thinking...", "bot");

try {
const res = await fetch(API_URL, {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
message,
sessionId
})
});

const data = await res.json();

document.getElementById("chat").lastChild.remove();
addMessage(data.reply, "bot");

} catch (err) {
console.error(err);
document.getElementById("chat").lastChild.remove();
addMessage("Server is currently busy. Please try again later.", "bot");

}
}

// Enter key support
document.addEventListener("DOMContentLoaded", function () {
// 👇 Welcome messages FIRST
setTimeout(() => addMessage("Hi, I am Neo 🤖", "bot"), 300);
setTimeout(() => addMessage("I can help you with our STEM kits, robotics, IoT and learning solutions.", "bot"), 800);
setTimeout(() => addMessage("How can I assist you today?", "bot"), 1300);

// 👇 Then attach Enter key listener
document.getElementById("input").addEventListener("keypress", function(e) {
if (e.key === "Enter") send();
});
});
