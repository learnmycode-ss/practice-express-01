const express = require('express');
const app = express();
const session = require('express-session');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const user = require('./model/user.mdl');

mongoose.connect('mongodb://127.0.0.1:27017/user-crud')
.then(()=> console.log('Connected!'))

app.use(session({
    secret : 'sharad32',
    resave : false,
    saveUninitialized :false
}))

let checkLogin = (r,res,n)=>{
    if(r.session.user){
        n()
    }else{
        res.redirect('/login')
    }
}

let isLogin = (r,res,n)=>{
     if(!r.session.user){
        n()
    }else{
        res.redirect('/')
    }
}
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set("view engine", "ejs");

app.get('/',checkLogin,(r,res)=>{
    res.send("<h1>Home Page</h1> <p>Hello, "+r.session.user+"</p>")
})
app.get('/login',isLogin,(r,res)=>{
    res.render("login",{msg:""});
})
app.get('/registration',(r,res)=>{
    res.render("registration");
})
app.post('/registration',async(r,res)=>{
    const {username , password} = r.body;
    const hashedPassword = await bcrypt.hash(password,10);
    
    // res.send({username,password : hashedPassword});
    await user.create({
        username : username,
        password : hashedPassword
    })
    res.redirect('/login',{msg:""});
})
app.post('/login',async(r,res)=>{
    const {username , password} = r.body;

    const userD = await user.findOne({username});
    if(!userD){
        return res.render('login',{msg:"User not Found"});
    }

    const isMatch = await bcrypt.compare(password,userD.password);

    if(!isMatch) return res.render('login',{msg : "Username OR Password Is Wrong"})
        r.session.user = username
        res.redirect('/');

})

app.get('/logout',(r,res)=>{
    r.session.destroy(()=>{
        res.redirect('/login');
    })
})

app.use((r,res)=>{
    res.status(400).send("Page Not Found")
})
app.listen(4500,()=>{
    console.log("server is running on port 4500")
})