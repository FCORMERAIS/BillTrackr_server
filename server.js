const express = require("express");
const cors = require("cors");
const session = require("express-session");
const { AllRoutes } = require("./routes/allRoutes");
const db = require("./models");
const path = require("path");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger-output.json');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(session({
    secret: 'GodsLovesChildren2010',
    resave: true,
    saveUninitialized: true,
}));

app.use(express.json());
app.use('/', AllRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.get('/cache', async (req, res) => {
//     const key = 'client:1';    
//     try {
//         const cachedValue = await db.redisClient.get(key);
//         res.send(`Cached value: ${cachedValue}`);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send("Error with Redis");
//     }
// });

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("the server is running at port 3001");
    });
});
