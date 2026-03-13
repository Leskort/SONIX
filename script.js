// ВСТАВЬ СЮДА СВОЙ ТОКЕН И CHAT_ID
const TELEGRAM_BOT_TOKEN = "8587706427:AAG6y3rUQqCWGLL59y2x68Gb0Ex_IPx4AWg";
const TELEGRAM_CHAT_ID = "2114967558";

function sendTelegramMessage(text) {
  // Если токен/чат не указаны, просто ничего не делаем
  if (
    !TELEGRAM_BOT_TOKEN ||
    TELEGRAM_BOT_TOKEN === "<ВАШ_TELEGRAM_BOT_TOKEN>"  ||
    !TELEGRAM_CHAT_ID ||
    TELEGRAM_CHAT_ID === "<ВАШ_CHAT_ID>"
  ) {
    console.warn("Укажи TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID в script.js");
    return Promise.resolve();
  }

  return fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text,
    }),
  }).catch((err) => {
    console.error("Ошибка отправки в Telegram", err);
  });
}

// Уведомление при первом открытии главной страницы (index.html)
if (
  window.location.pathname.endsWith("index.html") &&
  !localStorage.getItem("sonix_notified_opened")
 ) {
  sendTelegramMessage("💖 Она открыла страницу с признанием!").then(() => {
    localStorage.setItem("sonix_notified_opened", "true");
  });
}

// Обработка кликов по кнопкам ДА / НЕТ
document.querySelectorAll(".answer-btn").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const answer = this.dataset.answer === "yes" ? "ДА 💖" : "НЕТ 😿";
    const nextHref = this.getAttribute("href");

    sendTelegramMessage(`Она нажала: ${answer}`).finally(() => {
      if (nextHref && nextHref !== "#") {
        window.location.href = nextHref;
      }
    });
  });
});

// Логика убегающей кнопки "НЕТ" на no3.html
function moveRandomEl(elm) {
  elm.style.position = "absolute";
  elm.style.top = Math.floor(Math.random() * 90 + 5) + "%";
  elm.style.left = Math.floor(Math.random() * 90 + 5) + "%";
}

const moveRandom = document.querySelector("#move-random");

if (moveRandom) {
  moveRandom.addEventListener("mouseenter", function (e) {
    moveRandomEl(e.target);
  });
}

