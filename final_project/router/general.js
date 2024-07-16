const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
   let username = req.body.username;
    let password = req.body.password;
    if (username && password){
        if(username.isValid){
            users.push({
                "username":username,
                "password":password
        });
        }else{
            return res.status(300).json({message: "user exists already"});
        }
    }else{
        return res.status(300).json({message: "user or password missing"});
    }
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).send(JSON.stringify(books));
 // return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  return res.status(200).json(books[isbn]);
 // return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let author = req.params.author;
   let result =[];

  for(let i=1;i<11;i++){
        if(books[i].author===author){ 
           result.push(books[i]);
        } 
    }
    if(result.length>0){
        return res.status(200).send(JSON.stringify(result));
    }else{
        return res. status (300).json({message: "No-book for this author found" }) ;
    }
 // return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let title = req.params.title;
   let result =[];

  for(let i=1;i<11;i++){
        if(books[i].title===title){ 
           result.push(books[i]);
        } 
    }
    if(result.length>0){
        return res.status(200).send(JSON.stringify(result));
    }else{
        return res. status (300).json({message: "No-book for this title found" }) ;
    }
 // return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  let lkeys = Object.keys(books[isbn].reviews);
  if(lkeys.length === 0){
    return res.status(300).json({message: "No reviews available"});
}else{
    return res.status(200).json(books[isbn].reviews);
    }
 // return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
