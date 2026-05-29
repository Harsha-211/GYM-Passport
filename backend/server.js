const express = require('express');
const cors = require('cors');
const sequelize = require('./database');
require('dotenv').config();
const User = require('./models/User');
const Gym = require('./models/Gym');
const Attendance = require('./models/Attendance');
const Transaction = require('./models/Transaction');
const customerRoutes = require('./routes/CustomerRoutes');
const gymRoutes = require('./routes/gymRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000

app.get('/', (req,res)=>{
    res.send("Gym Middleware API Backend is running perfectly!");
});

// ---- Customer Route Middleware ----
app.use('/api/customer',customerRoutes);
// ---- Gym ROut Middleware ----
app.use('/api/gym',gymRoutes);

sequelize.sync({alert:true}).then(()=>{
    console.log("All Database tables created and synchronized successfully!");
    app.listen(PORT,()=>{
        console.log(`Server successfully started on port ${PORT}`);
    });
}).catch(err=>{
    console.log("Failed to sync database tables:", err);
})