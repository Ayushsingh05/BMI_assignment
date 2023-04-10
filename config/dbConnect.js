
const mongoose = require('mongoose');

const connect =() => { mongoose.connect('mongodb+srv://ayush:ayush@cluster0.kpjwe1l.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});
}

module.exports = connect