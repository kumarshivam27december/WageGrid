import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import FileUpload from 'express-fileupload';

import UserRoute from './routes/UserRoute.js';
import AuthRoute from './routes/AuthRoute.js';

dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});



app.use(cors({
  origin: 'https://lively-moonbeam-e659fe.netlify.app', // your real frontend domain
  credentials: true
}));

  

app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));

// Middleware
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions'
    }),
    cookie: {
          httpOnly: true,
        sameSite: 'none', // must be 'none' for cross-origin cookies
        secure: true      // must be true when using HTTPS (Render uses HTTPS)
    }

}));


// Mount routes under /api prefix
app.use('/api', UserRoute);
app.use('/api', AuthRoute);

app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running... at port ' + process.env.APP_PORT);
});