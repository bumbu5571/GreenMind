const router = require("express").Router();
const promotionsRouter = require("./promotions.api.router");
const authRouter = require("./auth.api.router");
const tokenRouter = require("./token.api.router");
const usersRouter = require("./users.api.router");
const companyRouter = require("./company.api.router");
const participantsRouter = require("./participants.api.router");

router.use("/promotions", promotionsRouter);
router.use("/auth", authRouter);
router.use("/token", tokenRouter);
router.use("/users", usersRouter);
router.use("/companies", companyRouter);
router.use("/participants", participantsRouter);

module.exports = router;
