const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`User service running on port ${PORT}`);
});
