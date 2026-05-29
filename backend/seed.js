const sequelize = require('./database');
const Gym = require('./models/Gym');
const User = require('./models/User');

const seedDatabase = async () => {
    try {
        // Connect and sync database
        await sequelize.sync({ force: true }); // 'force: true' drops old tables and recreates them clean
        console.log("🧹 Database cleared and reset for seeding...");

        // 1. Insert Mock Gyms
        await Gym.bulkCreate([
            {
                gym_name: "Gold's Gym, Madhapur",
                owner_name: "Rahul Sharma",
                city: "Hyderabad",
                rating: 4.7,
                credit_per_day: 200,
                credit_per_week: 1000,
                credit_per_month: 3500,
                total_earned_credits: 0
            },
            {
                gym_name: "Cult.fit, Gachibowli",
                owner_name: "Anjali Rao",
                city: "Hyderabad",
                rating: 4.5,
                credit_per_day: 150,
                credit_per_week: 800,
                credit_per_month: 2800,
                total_earned_credits: 0
            },
            {
                gym_name: "Power House Gym, Benz Circle",
                owner_name: "Srinivas Rao",
                city: "Vijayawada",
                rating: 4.6,
                credit_per_day: 120,
                credit_per_week: 650,
                credit_per_month: 2200,
                total_earned_credits: 0
            },
            {
                gym_name: "Titan Fitness, MG Road",
                owner_name: "K. Prasad",
                city: "Vijayawada",
                rating: 4.2,
                credit_per_day: 100,
                credit_per_week: 500,
                credit_per_month: 1800,
                total_earned_credits: 0
            }
        ]);
        console.log("🏋️‍♂️ Mock gyms successfully created!");

        // 2. Insert a Mock Customer User
        await User.create({
            name: "Sandeep Kumar",
            email: "sandeep@gmail.com",
            wallet_balance: 1500 // Pre-loaded with 1500 credits for testing
        });
        console.log("👤 Mock customer account created (Balance: 1500 Credits)!");

        console.log("✨ Seeding completed successfully! Exiting script...");
        process.exit(0); // Safely close the script process
    } catch (error) {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    }
};

seedDatabase();