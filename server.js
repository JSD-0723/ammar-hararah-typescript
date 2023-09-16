require('dotenv').config();

const express = require('express');
const path = require('path');
const fs = require('fs');

let rawBooks = fs.readFileSync('books.json');
let booksList = JSON.parse(rawBooks);


const app = express();
const port = process.env.PORT;

app.set("view engine", "pug");
app.set("views", path.resolve("./templates"));

app.listen(port, () => {
    console.log("Express app is listening on the port 3000!");
});

app.get('/', (req, res) => {
    res.render("index");
})

app.get('/books', (req, res) => {
    res.render("books",books=booksList);
})


app.get('/books/:id([0-9]*)', (req, res) => {
    const id = req.params.id;
    const book = bookExists(id);
    if (book?.name){
        res.render("book",{"book":book});
    }else{
        res.send(`Book with id ${id} Does not Exist!`);

    }
})

app.get('/books/:text([%a-zA-Z]*)', (req,res) => {
    const title = req.params.text;
    const matchingBooks = booksList.filter((book)=>{
        const exp = new RegExp('^'+ title + '[\w\W]*')
        return book.name.match(exp)
    })
    res.send(matchingBooks)
});


function bookExists(id){
    let bookObj;
    booksList.forEach(book => {
        if (book.id === id){
            bookObj = book;
            return bookObj;
        }
    });
    return bookObj;
}
