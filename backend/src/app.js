const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { allowedOrigins } = require('./constants');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const cardRoutes = require('./routes/cardRoutes');
const homepageRoutes = require('./routes/homePageRoute');
const chatRouters = require('./routes/chatRouters');
const {redisMiddleware} = require('./middlewares/redisMiddleware');

const app = express();

app.use(express.json());


app.use(cookieParser());

const corsOptions = {
    origin: function (origin , callback){
        if(!origin || allowedOrigins.indexOf(origin) !== -1){
            callback(null,true);
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(redisMiddleware);

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/cards', cardRoutes);
app.use('/api/v1/homepage', homepageRoutes);
app.use('/api/v1/chat', chatRouters);


app.get("/", (req, res) => {
   res.send("Study Loop backend is running successfully!");
});
module.exports = app;