const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`User service running on port ${PORT}`);
});
