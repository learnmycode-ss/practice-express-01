
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const port = 4545;

// app.use(cookieParser()) //this middleware to enable kare se cookies ne koy pan page par use kar va mate
app.use(cookieParser('sharadkey')) 
app.set('view engine',' ejs');
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.get('/',(r,res)=>{
    res.header('application/json');
    res.send({
        msg : "Unauthorizations"
    })
})
app.get('/set-cookie',(r,res)=>{
    // res.cookie('cookiename','value of cookies')
    res.cookie('cookiename','value of cookies')
    res.cookie('name','sharad',{
        maxAge : 1000 * 60,
        httpOnly : true, //the cookue only accessible by the web server
        signed : true, //it will encrypt the cookie value (if cookieparser is used password)


    })
    res.send('Verify');
})
app.get('/get-cookie',(r,res)=>{
    // const name = r.cookies.name;
    const name = r.signedCookies.name; //to get signed cookie we need to use signedCookies property of req object 

    if(name){
        res.send('Welcome Back '+name+'<br>');
    }else{
        res.send('Who Are YOu ?');
    }       
        console.log(r.cookies);

})
app.get('/del-cookie',(r,res)=>{
    // res.clearCookie('cookiename');
    res.clearCookie('name');
    res.send('deleted Cookies');
})

app.listen(port , ()=>{
    console.log("http://localhost:"+port);    
})