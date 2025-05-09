// chatbot.js
document.addEventListener("DOMContentLoaded", function () {
  const chatContainer = document.createElement("div");
  chatContainer.id = "robust-chatbot";
  chatContainer.innerHTML = `
    <style>
      #robust-chatbot {
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 9999;
        font-family: Arial, sans-serif;
      }
      #chatbox {
        width: 300px;
        height: 400px;
        border-radius: 12px;
        box-shadow: 0 0 15px rgba(0,0,0,0.2);
        background: white;
        display: none;
        flex-direction: column;
      }
      #chatbox.open { display: flex; }
      #chatHeader {
        padding: 10px;
        background: #000;
        color: white;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
      }
      #chatMessages {
        flex: 1;
        padding: 10px;
        overflow-y: auto;
      }
      #chatInput {
        border-top: 1px solid #ddd;
        display: flex;
      }
      #chatInput input {
        flex: 1;
        padding: 10px;
        border: none;
        outline: none;
      }
      #chatInput button {
        padding: 10px;
        border: none;
        background: #000;
        color: white;
        cursor: pointer;
      }
      #openChatBtn {
        background: #000;
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 30px;
        cursor: pointer;
      }
    </style>
    <div id="chatbox">
      <div id="chatHeader">RobustBot 🤖</div>
      <div id="chatMessages"></div>
      <div id="chatInput">
        <input type="text" id="userInput" placeholder="Écris un message..." />
        <button id="sendBtn">Envoyer</button>
      </div>
    </div>
    <button id="openChatBtn">💬</button>
  `;
  document.body.appendChild(chatContainer);

  document.getElementById("openChatBtn").addEventListener("click", toggleChat);
  document.getElementById("sendBtn").addEventListener("click", sendChat);
  document.getElementById("userInput").addEventListener("keydown", function (e) {
    if (e.key === "Enter") sendChat();
  });
});

function toggleChat() {
  const box = document.getElementById("chatbox");
  box.classList.toggle("open");
}

async function sendChat() {
  const input = document.getElementById("userInput");
  const msg = input.value.trim();
  if (!msg) return;

  const chat = document.getElementById("chatMessages");
  chat.innerHTML += `<div><strong>Vous:</strong> ${msg}</div>`;
  input.value = "";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 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"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: msg }]
      }),
    });

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    const data = await response.json();
    const botMsg = data.choices?.[0]?.message?.content || "Réponse indisponible.";
    chat.innerHTML += `<div><strong>RobustBot:</strong> ${botMsg}</div>`;
    chat.scrollTop = chat.scrollHeight;

  } catch (error) {
    console.error("Erreur API :", error);
    const fallbackMsg = `Je rencontre un souci pour répondre maintenant 🤖. Je vous mets en relation avec notre service client sur WhatsApp 📲...`;
    chat.innerHTML += `<div><strong>RobustBot:</strong> ${fallbackMsg}</div>`;
    chat.scrollTop = chat.scrollHeight;

    setTimeout(() => {
      window.open("https://wa.me/33745515093", "_blank");
    }, 2000);
  }
}