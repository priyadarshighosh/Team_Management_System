const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
var cors = require('cors')
const app = express();
const upload = multer({ dest: 'uploads/' });

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/teamDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Member Schema
const memberSchema = new mongoose.Schema({
  name: String,
  registernumber: String,
  year: String,
  degree: String,
  about: String,
  certificate: String,
  internship: String,
  profileImage: String
});

const Member = mongoose.model('Member', memberSchema);

// API Endpoint
app.post('/members', upload.single('profileImage'), async (req, res) => {
  try {
    const newMember = new Member({
      ...req.body,
      profileImage: req.file.path
    });

    await newMember.save();
    res.status(201).send(newMember);
  } catch (error) {
    res.status(400).send(error);
  }
});
// GET /user - Fetch all users
app.get('/user', async (req, res) => {
  try {
    const users = await Member.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Start server
app.listen(3001, () => {
  console.log('Server running on port 3001');
});