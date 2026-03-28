 const os = require("os");
const axios = require("axios");

const SERVER_URL = "http://localhost:3000/send-data";

// 👇 system name from terminal
const SYSTEM_NAME = process.env.SYSTEM_NAME || "Production Server";

const os = require("os");

function getCPU() {
    const load = os.loadavg()[0]; // 1 min load
    return Math.min(100, Math.floor(load * 20));
}

function getMemory() {
    const total = os.totalmem();
    const free = os.freemem();
    return Math.floor(((total - free) / total) * 100);
}

function getDisk() {
    return Math.floor(Math.random() * 100);
}

setInterval(async () => {
    const data = {
        systemName: SYSTEM_NAME,
        cpu: getCPU(),
        memory: getMemory(),
        disk: getDisk()
    };

    try {
        await axios.post(SERVER_URL, data);
        console.log("Sent:", SYSTEM_NAME);
    } catch (err) {
        console.log("Error:", err.message);
    }
}, 3000);