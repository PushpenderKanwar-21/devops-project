 const axios = require("axios");
const os = require("os");

// 🌍 YOUR CLOUD SERVER URL (IMPORTANT)
const SERVER_URL = "https://edge-monitor-server.onrender.com/send-data";

// 🖥️ YOUR SYSTEM NAME (PROFESSIONAL)
const SYSTEM_NAME = "Pushpender-DevNode-01";

console.log("🚀 Agent started for:", SYSTEM_NAME);

// CPU usage
function getCPU() {
    const load = os.loadavg()[0];
    return Math.min(100, Math.floor(load * 20));
}

// Memory usage
function getMemory() {
    const total = os.totalmem();
    const free = os.freemem();
    return Math.floor(((total - free) / total) * 100);
}

// Dummy disk usage
function getDisk() {
    return Math.floor(Math.random() * 100);
}

// 🔁 Send data every 3 seconds
setInterval(async () => {
    const data = {
        systemName: SYSTEM_NAME,
        cpu: getCPU(),
        memory: getMemory(),
        disk: getDisk()
    };

    try {
        await axios.post(SERVER_URL, data);
        console.log("✅ Sent:", SYSTEM_NAME);
    } catch (err) {
        console.log("❌ Error:", err.message);
    }

}, 3000);