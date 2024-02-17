const express = require("express");
const path = require('path');
const dotenv = require("dotenv");
const morgan = require('morgan');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const authRoutes = require('./routes/auth');
const app = express();

dotenv.config('.ENV');
connectDB();

app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100
});

app.use(fileupload());
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(limiter);
app.use(hpp());
app.use(cors());

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
app.use('/api/v1/auth', authRoutes);


app.use(errorHandler);
app.listen(process.env.PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode at port ${process.env.PORT}`);
})

