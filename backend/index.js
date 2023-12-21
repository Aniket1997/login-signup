// server.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config(); // Load environment variables from .env

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  
}));

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('db connected');
  })
  .catch((error) => {
    console.error('Error connecting to database:', error.message);
  });

// Multer configuration for file upload
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

// Create schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  mobile: String,
  profilePicture: {
    data: Buffer,
    contentType: String,
  },
});

const User = mongoose.model("User", userSchema);

// Routes
app.post('/register', upload.single('profilePicture'), async (req, res) => {
  const { username, email, password, mobileNumber,profilePicture } = req.body;
  console.log('Received registration request:', req.body);
  // Check if the required fields are provided
  if (!username || !email || !password || !mobileNumber) {
    return res.status(400).json({ message: 'Please provide all mandatory fields' });
  }

  const newUser = new User({
    username,
    email,
    password,
    mobile: mobileNumber,
    profilePicture: {
      data: req.file ? req.file.buffer : null,
      contentType: req.file ? req.file.mimetype : null,
    },
  });

  try {
    await newUser.save();
    res.status(200).json({ message: 'User registered successfully', userId: newUser._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user' });
  }
});
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const loginUser = await User.findOne({ email: email });
  
      if (loginUser) {
        if (password === loginUser.password) {
          res.status(200).json({ message: "Login Done", userId: loginUser._id });
        } else {
          res.status(401).json({ message: "Wrong Password" });
        }
      } else {
        res.status(404).json({ message: "User Not registered" });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error', error: error.message });
    }
  });

// Add this route to fetch user details by ID
app.get('/user/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const { _id, username, email, mobile, profilePicture } = user;
      const userDetails = {
        userId: _id,
        username,
        email,
        mobile,
        profilePicture: profilePicture ? true : false, // Indicates if profile picture is present
      };
  
      res.status(200).json({ user: userDetails });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving user details' });
    }
  });

  
  
  app.get('/users', async (req, res) => {
    try {
      const users = await User.find({});
      if (!users || users.length === 0) {
        return res.status(404).json({ message: 'No users found' });
      }
  
      res.status(200).json({ users });
      console.log("User data from api",users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving user details' });
    }
  });
const PORT = process.env.PORT || 9002;
app.listen(PORT, () => {
  console.log(`BE started at port ${PORT}`);
});
