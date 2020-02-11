const router = require("express").Router();
const userRouter = require("./user.routes");
const authRouter = require("./auth.routes");

router.use("/api/user", userRouter);
router.use("/api/auth", authRouter);

module.exports = router;