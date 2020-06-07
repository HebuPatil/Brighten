const express = require('express');
const cors = require('cors');
const monk = require('monk');

const app  = express();
const db = monk('localhost/Brighten');
const allMessages = db.get('messages');

app.use(cors()); //cors issue
app.use(express.json()); //json parser

app.get('/', (req, res) => {
    res.json({
      message: 'Hello, Brighten'
    });
  });

  /// INSTEAD OF THSI USE YUP OR JOI (VALIDATION)
function isValidMessage(userMessage) {
    return userMessage.name && userMessage.name.toString().trim() !== '' && userMessage.message && userMessage.message.toString().trim()
}


app.post('/messages', (req, res) => {
    if(isValidMessage(req.body)) {
        const userMessage = {
            name: req.body.name.toString(),
            content: req.body.message.toString(),
            created: new Date()
        };
        allMessages
            .insert(userMessage)
            .then(createdMessage => {
                res.json(createdMessage);
            })
    } else {
        res.status(422);
        res.json({
            message: 'Please send a thoughtful message...'
        });
    }
});

app.listen(5000, () => {
    console.log('Listening on http://localhost:5000')
})