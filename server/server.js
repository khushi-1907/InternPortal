const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Intern Schema
const internSchema = new mongoose.Schema({
    name: String,
    referralCode: String,
    donationsRaised: Number,
    rewards: [String]
});

const Intern = mongoose.model('Intern', internSchema);

// Routes
app.get('/api/intern/:id', async (req, res) => {
    try {
        // For demo, we'll just get the first intern
        const intern = await Intern.findOne();
        if (!intern) {
            // Create a demo intern if none exists
            const newIntern = new Intern({
                name: 'John Doe',
                referralCode: 'johndoe2025',
                donationsRaised: 1250,
                rewards: ['Bronze Badge', 'Silver Star', 'Gold Trophy']
            });
            await newIntern.save();
            return res.json(newIntern);
        }
        res.json(intern);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/leaderboard', async (req, res) => {
    try {
        const leaderboard = await Intern.find().sort({ donationsRaised: -1 }).limit(5);
        if (leaderboard.length === 0) {
            // Create some dummy data
            const dummyInterns = [
                { name: 'Alice Smith', referralCode: 'alice2025', donationsRaised: 2500, rewards: ['Gold Trophy'] },
                { name: 'Bob Johnson', referralCode: 'bob2025', donationsRaised: 1800, rewards: ['Silver Star', 'Gold Trophy'] },
                { name: 'John Doe', referralCode: 'johndoe2025', donationsRaised: 1250, rewards: ['Bronze Badge', 'Silver Star'] },
                { name: 'Emma Wilson', referralCode: 'emma2025', donationsRaised: 900, rewards: ['Bronze Badge'] },
                { name: 'Mike Brown', referralCode: 'mike2025', donationsRaised: 600, rewards: [] }
            ];
            await Intern.insertMany(dummyInterns);
            return res.json(dummyInterns);
        }
        res.json(leaderboard);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});