// index.js

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 8080;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/passwordValidation', (req, res) => {
    res.render('passwordValidation');
});


app.post('/submitFormData', (req, res) => {
    const formData = req.body;

    writeFormDataToFile(formData, (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json({ message: 'Form data successfully written to file.' });
        }
    });
});


const writeFormDataToFile = (formData, callback) => {
    const filePath = path.join(__dirname, 'formData.txt');
    // console.log(filePath);

    const dataString = `Email: ${formData.email}\nPassword: ${formData.password}\n\n`;


    // fs.appendFile(filePath, dataString, (err) => {
    //     if (err) {
    //         callback(err);
    //     } else {
    //         callback(null);
    //     }
    // });
    fs.writeFileSync("formData.txt", dataString);
};

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
