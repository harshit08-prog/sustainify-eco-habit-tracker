/*********************************
 DID YOU KNOW – ADD MORE FACTS
**********************************/

const facts = [
  "Producing 1 plastic bottle takes up to 3 liters of water.",
  "LED bulbs use 75% less energy than traditional bulbs.",
  "Turning off taps while brushing saves up to 8 liters of water.",
  "Recycling one aluminum can saves enough energy to run a TV for 3 hours.",
  "Trees help reduce air temperature by up to 8°C in urban areas.",
  "Using public transport reduces carbon emissions significantly."
];

const tipsSection = document.querySelector(".tips ul");

if (tipsSection) {
  tipsSection.innerHTML = ""; // clear existing list

  facts.forEach(text => {
    const li = document.createElement("li");
    li.className = "fact-card";
    li.textContent = text;
    tipsSection.appendChild(li);
  });
}

/* ================================
   ECO TRACK – MAIN JAVASCRIPT
   Beginner Safe | No Backend
================================ */

// ---------- HABIT TRACKING ----------
const habitButtons = document.querySelectorAll(".card button");
const progressText = document.querySelector(".progress p");
const progressFill = document.querySelector(".progress-fill");

let completedHabits = 0;
/*********************************
 START TRACKING BUTTON LOGIC
**********************************/

const startTrackingBtn = document.querySelector(".hero button");
const habitsSection = document.querySelector(".habits");

if (startTrackingBtn && habitsSection) {
  startTrackingBtn.addEventListener("click", () => {
    habitsSection.scrollIntoView({
      behavior: "smooth"
    });
  });
}
/*********************************
 EDIT HABIT BUTTON LOGIC
**********************************/

document.addEventListener("click", function (e) {
  // Check if Edit button is clicked
  if (e.target.classList.contains("edit-icon")) {
    const card = e.target.closest(".card");
    const titleElement = card.querySelector("h3");

    const currentTitle = titleElement.innerText;
    const newTitle = prompt("Edit habit name:", currentTitle);

    if (newTitle && newTitle.trim() !== "") {
      titleElement.innerText = newTitle.trim();
    }
  }
});

habitButtons.forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".card");

    if (!card.classList.contains("done")) {
      card.classList.add("done");
      button.textContent = "Completed ✔";
      completedHabits++;
    } else {
      card.classList.remove("done");
      button.textContent = "Mark Done";
      completedHabits--;
    }

    updateProgress();
  });
});

function updateProgress() {
  const totalHabits = document.querySelectorAll(".card").length;
  const percentage = Math.round((completedHabits / totalHabits) * 100);

  progressText.textContent = `Eco Score: ${percentage}%`;
  progressFill.style.width = `${percentage}%`;
}

// ---------- ADD NEW HABIT ----------
const addCardBtn = document.querySelector(".add-card-button");
const habitContainer = document.querySelector(".habit-cards");

addCardBtn.addEventListener("click", () => {
  const title = prompt("Enter new eco habit:");
  if (!title) return;

  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <div class="edit-icon">EDIT</div>
    <h3>${title}</h3>
    <p>Custom eco-friendly habit.</p>
    <button>Mark Done</button>
  `;

  habitContainer.insertBefore(card, addCardBtn);

  const newButton = card.querySelector("button");
  newButton.addEventListener("click", () => {
    if (!card.classList.contains("done")) {
      card.classList.add("done");
      newButton.textContent = "Completed ✔";
      completedHabits++;
    } else {
      card.classList.remove("done");
      newButton.textContent = "Mark Done";
      completedHabits--;
    }
    updateProgress();
  });
});

// ---------- AI CHATBOT ----------
const chatbot = document.createElement("div");
chatbot.innerHTML = `
  <div id="eco-chatbot">
    <div class="chat-header">🌱 Eco Assistant</div>
    <div class="chat-body" id="chatBody">
      <p><strong>Bot:</strong> Hi! Ask me eco-friendly tips 🌍</p>
    </div>
    <input id="chatInput" placeholder="Ask something..." />
  </div>
`;

document.body.appendChild(chatbot);

// Chatbot Styles are now in style.css

// Chat Logic (AI-like responses)
const chatInput = document.getElementById("chatInput");
const chatBody = document.getElementById("chatBody");

chatInput.addEventListener("keypress", e => {
  if (e.key === "Enter" && chatInput.value.trim()) {
    const userText = chatInput.value;
    chatBody.innerHTML += `<p><strong>You:</strong> ${userText}</p>`;
    chatInput.value = "";

    setTimeout(() => {
      chatBody.innerHTML += `<p><strong>Bot:</strong> ${getEcoReply(userText)}</p>`;
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 600);
  }
});

function getEcoReply(message) {
  message = message.toLowerCase();

  if (message.includes("water"))
    return "Try reducing shower time and fixing leaks 💧";
  if (message.includes("plastic"))
    return "Use reusable bags and bottles ♻";
  if (message.includes("electric"))
    return "Switch off unused appliances ⚡";
  if (message.includes("help"))
    return "I help you build eco-friendly habits 🌱";

  return "Small habits make a big impact 🌍";
}