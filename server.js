 const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// CONNECT DB
mongoose.connect("mongodb://127.0.0.1:27017/devops", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// SCHEMA
const systemSchema = new mongoose.Schema({
    systemName: String,
    cpu: Number,
    memory: Number,
    disk: Number,
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
    const { systemName, cpu, memory, disk } = req.body;

    try {
        let system = await System.findOne({ systemName });

        if (system) {
            system.cpu = cpu;
            system.memory = memory;
            system.disk = disk;
            system.lastUpdated = new Date();

            system.logs.push({
                cpu,
                memory,
                disk
            });

            if (system.logs.length > 10) {
                system.logs.shift();
            }

            await system.save();
        } else {
            const newSystem = new System({
                systemName,
                cpu,
                memory,
                disk,
                logs: [{ cpu, memory, disk }]
            });

            await newSystem.save();
        }

        res.send("Data saved");
    } catch (err) {
        console.log(err);
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