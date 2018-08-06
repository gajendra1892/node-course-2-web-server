const express =require('express');
const hbs =require('hbs');
const fs =require('fs');
const port =process.env.PORT ||3000;

var app =express();

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs');

app.use((req,res,next)=>{
    var  now= new Date().toString();
    var log=`${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log +'\n' ,(err)=>{
console.log('Unable to append to the server.')
    })
next();
});

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
  
// });

app.use(express.static(__dirname+'/public'));
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})

hbs.registerHelper("ScreemIt",(text)=>{
    return text.toUpperCase();
})

app.get('/',(req , res)=>{
//res.send('<h1>Hello Express</h1>');
//  res.send({
//     name:'Andrew',
//     likes:[
//         'Biking',
//         'Cities'
//  ]
//  });
res.render('home.hbs',{
    name:'Andrew',
    pageTitle:'Home Page',
  //  currentYear: new Date().getFullYear()
})
});


app.get('/about',(req,res)=>{
    // res.send('About Page');
    // res.render('about.hbs');
    res.render('about.hbs',{
        pageTitle:'About Page',
      //  currentYear: new Date().getFullYear()
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        error:'Error Message'
    });
});

// app.listen(3000);
// app.listen(3000,()=>{
//     console.log('Server is up on port 3000')
// });
app.listen(port,()=>{
    console.log(`Server is up on port ${port}`)
});