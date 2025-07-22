const express = require('express');
const app = express();
const router = express.Router();
function mid2(r,res,n){
    console.log('mid2');
    n();
}
app.use((e,r,res,n)=>{
    console.log("Error: "+e);
    res.status(500).send("Error");    
    n();
})
router.use((r,res,n)=>{
    console.log("Router Level middleware");
    n();
})
app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`)
    next(); 
})

app.get('/', (req, res) => {
    res.send("<h1>Home</h1>");
});

app.get('/about',mid2,(r,res,n)=>{
    console.log("Hello This iS middleware");
    n();
}, (req, res) => {
    res.send("<h1>About Page</h1>");
    
});

router.get('/',(r,res)=>{
    res.send('Router');
})
// error base middleware
app.use((error,r,res,next)=>{
    console.error(error.stack);
    res.status(500).send("Server Error");
    next();
})
// 404 Error 
app.use((r,res)=>{
    res.send("404 not Found");
})

app.use('/r',router);
app.listen("2025",()=>{
    console.log('http://localhost:2025');
})