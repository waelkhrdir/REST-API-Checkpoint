const { register, login, getCurrentUser } = require("../controllers/userCtrl");
const isAuth = require("../middleware/isAuth");
const {
  registerRules,
  bodyValidator,
  loginRules,
} = require("../middleware/validator");

const router = require("express").Router();
router.post("/register", registerRules(), bodyValidator, register);
router.post("/login", loginRules(), bodyValidator, login);
router.get("/current", isAuth, getCurrentUser);

module.exports = router;