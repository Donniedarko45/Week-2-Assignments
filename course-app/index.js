const express = require('express');
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

app.post('/admin/signup', (req, res) => {
 
});

app.post('/admin/login', (req, res) => {

});

app.post('/admin/courses', (req, res) => {

});

app.put('/admin/courses/:courseId', (req, res) => {
         
});

app.get('/admin/courses', (req, res) => {
 
});



app.post('/users/signup', (req, res) => {
  
});

app.post('/users/login', (req, res) => {

});

app.get('/users/courses', (req, res) => {

});

app.post('/users/courses/:courseId', (req, res) => {

});

app.get('/users/purchasedCourses', (req, res) => {

});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});



