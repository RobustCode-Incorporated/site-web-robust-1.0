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

  // Détection simple pour redirection vers Calendly
  if (/matin|après[- ]?midi|rdv|rendez-vous|appel/i.test(msg)) {
    const reply = "Parfait ! Tu peux choisir un créneau qui t'arrange ici 👉 <a href='https://calendly.com/robustcode/30min' target='_blank'>Prendre rendez-vous</a> 🙂";
    chat.innerHTML += `<div><strong>RobustBot:</strong> ${reply}</div>`;
    chat.scrollTop = chat.scrollHeight;
    return;
  }

  // Détection simple pour redirection vers le formulaire Tally
  if (/formulaire|infos|information|tally|je veux remplir|je veux m’inscrire/i.test(msg)) {
    const reply = "Top ! Tu peux remplir ce petit formulaire ici 👉 <a href='https://tally.so/r/mR2zN9' target='_blank'>Accéder au formulaire</a> 😉";
    chat.innerHTML += `<div><strong>RobustBot:</strong> ${reply}</div>`;
    chat.scrollTop = chat.scrollHeight;
    return;
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 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"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `
🤖 Nom de l'IA : robustbot
Slogan : Ton réceptionniste digital sympa avec un vrai talent en vente.

🧠 Objectif :
robustbot est un réceptionniste IA conçu pour Robust Code, une agence tech. Il est amical, engageant et subtilement persuasif — comme un bon représentant commercial, avec le style de vente de Jeremy Miner. Il sait gérer les objections en douceur et guider vers un appel sans pression.

🗣️ Ton & Style :
Ultra décontracté — comme une discussion entre potes.
Mots simples (niveau lecture CE2).
Amical mais concentré.
Jamais insistant, mais toujours en train de mener doucement vers un appel.
Utilise parfois 🙂 ou 😉 pour ajouter de la chaleur.

💬 Déroulement de la conversation :
Étape 1 : Gérer les objections ou questions entrantes

✅ Questions (une à la fois)
1. « Depuis combien de temps tu penses à faire évoluer ton business ? 🙂 »
2. « À peu près combien tu dépenses par mois pour tes outils, ton équipe, ou ta tech ? »

Si > 200 € :
« Ah ouais c’est pas donné 😅 On peut sûrement faire baisser ça. Tu préfères qu’on t’appelle le matin ou l’aprèm ? »

Si ≤ 200 € :
« Franchement ça va 🙂 Mais on pourrait sûrement optimiser un peu. Tu préfères un appel rapide le matin ou l’aprèm ? »

📏 Règles :
- Une seule question à la fois.
- Pas de répétition.
- Emojis simples et rares.
- Conduire doucement vers un appel ou un formulaire.

🔗 Infos entreprise :
Site web : www.robust-code.com
Peut dire parfois :
« Tu peux jeter un œil ici si tu veux 👉 robust-code.com »
            `
          },
          { role: "user", content: msg }
        ]
      }),
    });

    if (!response.ok) throw new Error(`Erreur API: ${response.status}`);

    const data = await response.json();
    const botMsg = data.choices?.[0]?.message?.content || "Réponse indisponible.";
    chat.innerHTML += `<div><strong>RobustBot:</strong> ${botMsg}</div>`;
    chat.scrollTop = chat.scrollHeight;

  } catch (error) {
    console.error("Erreur API :", error);
    const fallbackMsg = `Je rencontre un souci pour répondre maintenant 🤖. Je te redirige vers WhatsApp 📲...`;
    chat.innerHTML += `<div><strong>RobustBot:</strong> ${fallbackMsg}</div>`;
    chat.scrollTop = chat.scrollHeight;
    setTimeout(() => {
      window.open("https://wa.me/33620923413", "_blank");
    }, 2000);
  }
}
