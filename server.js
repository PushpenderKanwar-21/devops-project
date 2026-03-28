 const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// CONNECT DB
mongoose.connect("mongodb+srv://pushpenderkanwar:kanwar212006@cluster0.v4g9xph.mongodb.net/devops", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// SCHEMA
const systemSchema = new mongoose.Schema({
    systemName: String,
    cpu: Number,
    memory: Number,
    disk: Number,
    uptime: Number,
    network: Number,
    lastUpdated: { type: Date, default: Date.now },
    logs: [
        {
            cpu: Number,
            memory: Number,
            disk: Number,
            time: { type: Date, default: Date.now }
        }
    ]
});

const System = mongoose.model("System", systemSchema);


// ✅ FINAL WORKING ROUTE

    app.post("/send-data", async (req, res) => {
    console.log("📥 DATA RECEIVED:", req.body);

    const { systemName, cpu, memory, disk, uptime, network } = req.body;

    try {
        let system = await System.findOne({ systemName });

        if (!system) {
            system = new System({
                systemName,
                cpu,
                memory,
                disk,
                uptime,
                network,
                lastUpdated: new Date(),
                logs: [{ cpu, memory, disk }]
            });
        } else {
            system.cpu = cpu;
            system.memory = memory;
            system.disk = disk;
            system.uptime = uptime;
            system.network = network;
           
            system.logs.push({ cpu, memory, disk });
            system.lastUpdated = new Date();        }

        await system.save();

        res.send("OK");

    } catch (err) {
        console.log("❌ ERROR:", err.message);
        res.status(500).send("Error");
    }
});


// GET SYSTEMS
app.get("/systems", async (req, res) => {
    const systems = await System.find();
    res.json(systems);
});


// START SERVER
app.listen(3000, () => {
    console.log("🚀 Server running on port 3000");
});