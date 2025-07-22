const express = require("express");
const app = express();
const { body, validationResult } = require("express-validator");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const validationRegistration = [
  body("username")
    .notEmpty()
    .withMessage("Username is Required")
    .isLength({ min: 3 })
    .withMessage("Username Must be at least 3 or more character"),
  body("email")
    .isEmail()
    .withMessage("Please Provide Valid Email Address")
    .normalizeEmail(),
  body("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol"
    )
    .isLength({ min: 8, max: 24 })
    .withMessage("Password must be between 8 and 24 characters long"),
  body("age")
    .isNumeric()
    .withMessage("Valid Age Enter")
    .isInt({ min: 18 })
    .withMessage("Age must be at least 18 Years."),
  body("city")
    .isIn(["Rajkot", "Ahmedabad", "Amreli"])
    .withMessage("City must be Rajkot, Ahmedabad, or Amreli"),
];

app.get("/myform", (r, res) => {
  res.render("myform",{error : 0});
});

app.post("/sav", validationRegistration, (r, res) => {
  const errors = validationResult(r);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
  res.render('myform',{error : errors.array()})
//   res.send(r.body);
});

app.listen(3030, () => {
  console.log("http://localhost:3030/myform");
});
