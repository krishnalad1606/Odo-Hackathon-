const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Home / test

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Globe Trotter Backend is running 🚀"
    });
});

// Temporary data

const users = [];
const trips = [];

// SIGNUP

app.post("/api/signup", (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Name, email and password are required"
        });
    }

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        return res.status(409).json({
            success: false,
            message: "User already exists"
        });
    }

    const user = {
        id: users.length + 1,
        name,
        email,
        password
    };

    users.push(user);

    res.status(201).json({
        success: true,
        message: "Signup successful",
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });
});

// LOGIN

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    const user = users.find(
        user => user.email === email && user.password === password
    );

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        });
    }

    res.json({
        success: true,
        message: "Login successful",
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });
});

// DESTINATIONS

const destinations = [
    {
        id: 1,
        name: "Paris",
        country: "France",
        description: "The city of love and lights."
    },
    {
        id: 2,
        name: "Tokyo",
        country: "Japan",
        description: "A beautiful mix of tradition and technology."
    },
    {
        id: 3,
        name: "Dubai",
        country: "UAE",
        description: "Luxury, shopping and modern architecture."
    },
    {
        id: 4,
        name: "London",
        country: "United Kingdom",
        description: "Historic landmarks and modern culture."
    },
    {
        id: 5,
        name: "Mumbai",
        country: "India",
        description: "The city of dreams."
    }
];

app.get("/api/destinations", (req, res) => {
    res.json({
        success: true,
        destinations
    });
});

// ACTIVITIES

const activities = [
    {
        id: 1,
        name: "City Tour",
        category: "Sightseeing"
    },
    {
        id: 2,
        name: "Museum Visit",
        category: "Culture"
    },
    {
        id: 3,
        name: "Beach Visit",
        category: "Relaxation"
    },
    {
        id: 4,
        name: "Food Tour",
        category: "Food"
    }
];

app.get("/api/activities", (req, res) => {
    res.json({
        success: true,
        activities
    });
});

// CREATE TRIP

app.post("/api/trips", (req, res) => {
    const {
        userId,
        name,
        destination,
        startDate,
        endDate,
        budget
    } = req.body;

    if (!name || !destination) {
        return res.status(400).json({
            success: false,
            message: "Trip name and destination are required"
        });
    }

    const trip = {
        id: trips.length + 1,
        userId: userId || null,
        name,
        destination,
        startDate: startDate || null,
        endDate: endDate || null,
        budget: budget || 0,
        itinerary: []
    };

    trips.push(trip);

    res.status(201).json({
        success: true,
        message: "Trip created successfully",
        trip
    });
});


// GET ALL TRIPS


app.get("/api/trips", (req, res) => {
    res.json({
        success: true,
        trips
    });
});

// GET ONE TRIP

app.get("/api/trips/:id", (req, res) => {
    const trip = trips.find(
        trip => trip.id === Number(req.params.id)
    );

    if (!trip) {
        return res.status(404).json({
            success: false,
            message: "Trip not found"
        });
    }

    res.json({
        success: true,
        trip
    });
});

// ADD ITINERARY ITEM

app.post("/api/trips/:id/itinerary", (req, res) => {
    const trip = trips.find(
        trip => trip.id === Number(req.params.id)
    );

    if (!trip) {
        return res.status(404).json({
            success: false,
            message: "Trip not found"
        });
    }

    const {
        date,
        time,
        activity,
        location,
        notes
    } = req.body;

    const item = {
        id: trip.itinerary.length + 1,
        date: date || null,
        time: time || null,
        activity: activity || "",
        location: location || "",
        notes: notes || ""
    };

    trip.itinerary.push(item);

    res.status(201).json({
        success: true,
        message: "Itinerary item added",
        item
    });
});

// GET ITINERARY

app.get("/api/trips/:id/itinerary", (req, res) => {
    const trip = trips.find(
        trip => trip.id === Number(req.params.id)
    );

    if (!trip) {
        return res.status(404).json({
            success: false,
            message: "Trip not found"
        });
    }

    res.json({
        success: true,
        itinerary: trip.itinerary
    });
});

// 404

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// START SERVER

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});