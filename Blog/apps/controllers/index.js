var express = require("express") ; 
var router = express.Router();

router.use("/admin" , require( "./admin"));
router.use("/blog" , require("./blog"));

router.get("/" , (req , res) => {
    res.render("dashboard");
})



module.exports = router; 