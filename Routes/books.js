const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const ical=require( 'ical-generator');

// User Model
const Book = require('../models/bookings.model.js');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'benchbookess@gmail.com',
    pass: 'snj2cobgtp'
  }
});



router.post('/newBook', (req, res) => {
    var bookFlag=0
    let reqedFrom=new Date(req.body.From)
    let reqedTo=new Date(req.body.To)

    Book.find({bench:req.body.bench},function(err,books){
      if(books.length){
        for (book of books)
        {
          if((reqedFrom>=book.From && reqedFrom<book.To) || (reqedTo>book.From && reqedTo<book.To) ||(book.From>reqedFrom && book.From<reqedTo))
             { res.json({message:"Overlapping Time : already booked by " + book.name,status:0});
               bookFlag=0  
               break;}
          else
            { 
              bookFlag=1
              continue;
           }  
       }
       Free2Book(bookFlag)
    }
     else{
        bookFlag=1
        Free2Book(bookFlag)
      }
    })
 
    function Free2Book(bookFlag){      
        if(bookFlag){
            const newBook=new Book({
                name:req.body.name,
                username:req.body.username,
                mobilenumber:req.body.mobilenumber,
                bench:req.body.bench,
                From:req.body.From,
                To:req.body.To
                
            })
         
          
            
            newBook.save()
                .then(user=>{
                  const calendar = ical();
                  calendar.createEvent({
                    start: new Date(user.From),
                    end: new Date(user.To),
                    summary: user.bench+' bench booking',
                    location: 'COB-GTP',
                  
                  });
                  var mailOptions = {
                                      from: 'benchbookess@gmail.com',
                                      to: user.username,
                                      subject: user.bench + ' Bench booking',
                                      text: user.bench+' Bench has been booked\n\n From: '+user.From+'\n\nTo: '+user.To,
                                      icalEvent: {
                                                  filename: 'invite.ics',
                                                  method: 'PUBLISH',
                                                  content:String(calendar)
                                      }
                                    };
                  transporter.sendMail(mailOptions)
                  res.json({...user,status:1})})
                  .catch(res1=>res.json({status:0}))
          }
    }
});

router.post('/check', (req, res) => {
    var currentbook={status:0}
     //console.log({bench:req.body.bench,date:req.body.date});
     let current= new Date(req.body.date)
     Book.find({bench:req.body.bench},function(err,books){
       if(books.length){
         var book
         for (book of books){
         if(current>=book.From && current<=book.To){
          currentbook={username:book.name,mobilenumber:book.mobilenumber,To:book.To,status:1};
         }
         
       }
      res.send(currentbook)
      }
       else{
         res.json({bench:req.body.bench,message:"no",status:0});
       }
   })
});

router.post('/allbook', (req, res) => {
  //console.log({bench:req.body.bench});
  Book.find({bench:req.body.bench}).sort({From:1}).exec(function(err,books){
    if(books.length){
     
       res.send(books);
   }
    else{
      res.send(books);
    }
})
});

router.delete('/delbook/:id', (req, res) => {
  Book.deleteOne({_id:req.params.id},function(err){
  if(err)
    res.send({delstatus:0})
  else 
    res.send({delstatus:1}) 
})
});

module.exports=router;

























// router.post('/allbook', (req, res) => {
//   console.log({bench:req.body.bench});
//   Book.find({bench:req.body.bench},function(err,books){
//     if(books.length){
     
//        res.json(books);
//    }
//     else{
//       res.json({message:"no",status:0});
//     }
// })
// });