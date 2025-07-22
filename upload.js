const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set('view engine','ejs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads') //call back function
    },
    filename: (req, file, cb) => {
        const nefile = Date.now() + path.extname(file.originalname) //rename file current date and time + original file extesion
        cb(null,nefile); // null is error
    }
})

const fileFilter =(r,file,cb)=>{
    if(file.mimetype.startsWith('image/')){ // image/ type file to allowed ,minetype is file type return
        cb(null,true) // null is error return parameter, true is file upload
    }else{
        cb(new Error('Only image are allowed!'),false) // error return fist parameter , second false is not upload file

    }
}
const fileFilterOnly =(r,file,cb)=>{
    if(file.fieldname === 'uploadfile'){
        if(file.mimetype == 'image/jpeg'){ 
            cb(null,true) // null is error return parameter, true is file upload
        }else{
            cb(new Error('Only JPEG File are allowed!'),false) // error return fist parameter , second false is not upload file
        }

    }else if(file.fieldname === 'uploaddoc'){
        if(file.mimetype == 'application/pdf'){ 
            cb(null,true) // null is error return parameter, true is file upload
        }else{
            cb(new Error('Only PDF File are allowed!'),false) // error return fist parameter , second false is not upload file
        }
    }else{
        cb(new Error('Only uploadfile and uploaddoc are allowed!'),false) //
    }
    // if(file.mimetype == 'image/jpeg'){ 
    //     cb(null,true) // null is error return parameter, true is file upload
    // }else{
    //     cb(new Error('Only JPEG File are allowed!'),false) // error return fist parameter , second false is not upload file

    // }
}

const upload = multer({
    storage : storage, //diskStorage pass
    limits: {fieldSize: 1024 * 1024 * 5}, //file upload size limit  5MB set limit
    // fileFilter : fileFilter //optional parameter  ,not add this to all type file return
    fileFilter : fileFilterOnly
})

app.get('/',(r,res)=>{
    res.render('fileupload');
})

//single file upload
// app.post('/upload',upload.single('uploadfile'),(r,res)=>{
//     if(!r.file || r.file.length === 0){
//         return res.status(400).send({message:'Please choose a file'})
//     }
//     res.send(r.file.path)
// },(e,r,res,n)=>{ //error handling middleware added
//     if (e instanceof multer.MulterError) {
//         return res.status(400).send(`Multer Error: ${e.message}`)
//     } else if(e) {
//         return res.status(500).send(`Something went wrong : ${e.message}`)
        
//     }

//     n();
// })

//multiple file upload
// app.post('/upload',upload.array('uploadfile',3),(r,res)=>{ // array (field_name, how many file upload)
//     if(!r.files || r.files.length === 0){
//         return res.status(400).send({message:'Please choose a file'})
//     }
//     res.send(r.files)
// })

// multiple field file uploads
app.post('/upload',upload.fields([
    {name:'uploadfile',maxCount:1}, //single file upload
    {name:'uploaddoc',maxCount:3} //multiple file upload
]),(r,res)=>{ 
    if(!r.files || r.files.length === 0){
        return res.status(400).send({message:'Please choose a file'})
    }
    res.send(r.files)
})

app.use((e,r,res,n)=>{ //error handling middleware added
    if (e instanceof multer.MulterError) {
        if(e.code === 'LIMIT_UNEXPECTED_FILE'){
            return res.status(400).send({message:'to many file uploaded'})
        }
        return res.status(400).send(`Multer Error: ${e.message} : ${e.code}`)
    } else if(e) {
        return res.status(500).send(`Something went wrong : ${e.message}`)
        
    }

    n();
})


app.listen(4545,()=>{
    console.log('server is running on http://localhost:4545')
})