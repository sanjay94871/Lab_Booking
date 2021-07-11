const express = require('express');
const mongoose = require('mongoose');
const user = require('./routes/user');
const books = require('./routes/books');
const cors = require('cors');


const app = express();

app.use(express.json());
app.use(cors());

const uri = 'mongodb+srv://admin:sanjay28199@cluster0.afewl.mongodb.net/users?retryWrites=true&w=majority'

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true });

app.use('/user', user);
app.use('/book', books);

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('frontend/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
  }

  const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
