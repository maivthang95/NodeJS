var express = require("express") ; 
var router = express.Router();

router.route("/")
.get( (req , res) => {
    res.send("Hello this is Blog  page");
})


module.exports = router 