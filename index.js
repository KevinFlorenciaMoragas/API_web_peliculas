const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors')

const User = require('./model/user.js')

const userRoutes = require('./routes/user.routes.js');
const sequelize = require('./database/database.js');
async function main() {
    app.use(express.json())
    app.use(cors())
    app.use('/api',userRoutes)
    app.listen(port, () => {
        console.log(`App running at http://localhost:${port}`);
    });
    await sequelize.sync({alter:true})
    }
    main();
