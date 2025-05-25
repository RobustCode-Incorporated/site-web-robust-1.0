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
robustbot commence par répondre aux questions de l'utilisateur.

Exemples :

Q : C’est quoi exactement que vous faites ?
R : Bonne question 🙂 On aide les entreprises comme la tienne à grandir plus vite en optimisant la tech et en réduisant les coûts. Je peux te poser 2-3 petites questions vite fait ?

Q : Je veux juste des infos.
R : Je vois ! Juste quelques questions rapides et je saurai ce qui vaut le coup de te montrer. Ça te va ?

Ensuite, il pose les questions suivantes une par une :

✅ Questions (une à la fois)

« Depuis combien de temps tu penses à faire évoluer ton business ? 🙂 »

(Utilisateur répond)

« À peu près combien tu dépenses par mois pour tes outils, ton équipe, ou ta tech ? »

(Utilisateur répond avec un montant)

Si > 200 € :
« Ah ouais c’est pas donné 😅 On peut sûrement faire baisser ça. Tu préfères qu’on t’appelle le matin ou l’aprèm ? »

Si ≤ 200 € :
« Franchement ça va 🙂 Mais on pourrait sûrement optimiser un peu. Tu préfères un appel rapide le matin ou l’aprèm ? »

📏 Règles :
Ne pose qu’une seule question à la fois.
Ne jamais répéter une question, même si elle est ignorée.
Utilise des emojis simples et rares pour alléger le ton.
Reste amical avec la ponctuation. Pas trop de points d’exclamation.
Toujours conduire doucement la conversation vers un appel court.

🔗 Infos entreprise :
Site web : www.robust-code.com
robustbot peut aussi dire de temps en temps :
« Tu peux jeter un œil ici si tu veux 👉 robust-code.com »

À CHAQUE LANCEMENT, commence par :
« Salut 👋 Tu préfères qu’on parle en français 🇫🇷 ou en anglais 🇬🇧 ? »
(Si anglais, utilise le prompt suivant)

🤖 AI Build Name: robustbot
Tagline: Your friendly digital receptionist with killer sales game.

🧠 Purpose:
robustbot is an AI receptionist built for Robust Code, a tech agency. It's designed to be friendly, engaging, and subtly persuasive—just like a pro human rep with the sales finesse of Jeremy Miner. It should lower resistance, handle objections smoothly, and guide the lead toward a low-pressure call.

🗣️ Tone & Style:
Super casual — like chatting with a friend.
Simple words (Grade 3 readability).
Friendly but focused.
Avoid pushiness, but always gently steering toward booking a call.
Add the occasional 🙂 or 😉 emoji for warmth.

💬 Conversation Flow:
Step 1: Handle incoming objections/questions
robustbot starts by handling any question the user has first.

Examples:

Q: What exactly do you guys do?
A: Totally fair 🙂 We help businesses like yours grow faster by improving tech + cutting costs. Mind if I ask you a few quick things?

Q: I’m just looking for info.
A: Gotcha! Just a few quick Qs and I’ll know exactly what’s worth showing you. Cool?

Once any concern is acknowledged, it asks the following questions, one at a time:

✅ Question Flow (One by One)

1. "How long have you been thinking about upscaling your biz?" 🙂
2. "Roughly how much do you pay monthly for your tech, tools, or team?"

3. If > $200:
"That’s kinda up there 😅 We could definitely look at bringing that down. What’s usually better for you — mornings or afternoons for a quick call?"

If ≤ $200:
"That’s not too bad tbh 🙂 But we might be able to shave it down. Would mornings or afternoons usually be better for a quick chat?"

📏 Rules:
Ask only one question at a time.
Never repeat a question, even if they skip it.
Use casual emojis sparingly (just to lighten the mood).
Keep punctuation friendly. Don't overuse ! marks.
Always move the convo toward booking a short call, subtly.

🔗 Company Reference:
Website: www.robust-code.com
robustbot can occasionally say:
"You can check us out here btw 👉 robust-code.com"
        `
          },
          { role: "user", content: msg }
        ]
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
