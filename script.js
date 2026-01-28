// EDIT THESE TWO LINES:
const SERVER_IP = "deadlymines.minehut.gg";            // <- put your server IP here
const DISCORD_URL = "https://discord.gg/deadlymines"; // <- put your discord invite link here

function setNavLinks() {
  const discordBtns = document.querySelectorAll("[data-discord]");
  discordBtns.forEach(b => b.setAttribute("href", DISCORD_URL));

  const ipSpans = document.querySelectorAll("[data-ip]");
  ipSpans.forEach(s => s.textContent = SERVER_IP);
}

async function copyIP() {
  try {
    await navigator.clipboard.writeText(SERVER_IP);
    alert("Copied IP: " + SERVER_IP);
  } catch {
    const temp = document.createElement("input");
    temp.value = SERVER_IP;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    temp.remove();
    alert("Copied IP: " + SERVER_IP);
  }
}

async function loadStatus() {
  const el = document.getElementById("statusBox");
  if (!el) return;

  el.textContent = "Loading status...";

  const url = `https://api.mcsrvstat.us/2/${encodeURIComponent(SERVER_IP)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.online) {
      el.innerHTML = `
        <div style="display:inline-block;padding:6px 10px;border:1px solid #243245;border-radius:999px;color:#9aa7b2;">
          <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:#ff4d4d;margin-right:8px;"></span>
          Offline
        </div>
        <div style="margin-top:10px" class="small">Server did not respond.</div>
      `;
      return;
    }

    const players = data.players ? `${data.players.online}/${data.players.max}` : "Unknown";
    const version = data.version || "Unknown";

    el.innerHTML = `
      <div style="display:inline-block;padding:6px 10px;border:1px solid #243245;border-radius:999px;color:#9aa7b2;">
        <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:#4dff7a;margin-right:8px;"></span>
        Online
      </div>
      <div style="margin-top:10px"><b>IP:</b> <span class="mono">${SERVER_IP}</span></div>
      <div style="margin-top:6px"><b>Players:</b> ${players}</div>
      <div style="margin-top:6px"><b>Version:</b> ${version}</div>
    `;
  } catch {
    el.innerHTML = `
      <div style="display:inline-block;padding:6px 10px;border:1px solid #243245;border-radius:999px;color:#9aa7b2;">
        <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:#ffb000;margin-right:8px;"></span>
        Unknown
      </div>
      <div style="margin-top:10px" class="small">Could not fetch status.</div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setNavLinks();
  loadStatus();

  const copyBtns = document.querySelectorAll("[data-copyip]");
  copyBtns.forEach(btn => btn.addEventListener("click", copyIP));
});
