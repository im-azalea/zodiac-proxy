import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/api/proxy", async (req, res) => {
    const { sign, day } = req.query;
    if (!sign) {
        return res.status(400).json({ error: 'Parameter "sign" diperlukan' });
    }

    const apiUrl = `https://aztro.sameerkumar.website/?sign=${sign}&day=${day || "today"}`;
    try {
        const response = await fetch(apiUrl, { method: "POST" });
        if (!response.ok) {
            return res.status(response.status).json({ error: "Error fetching data" });
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
