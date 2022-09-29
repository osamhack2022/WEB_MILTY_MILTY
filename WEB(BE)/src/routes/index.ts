/* module */
import express from "express";

/* controller */
import loginController from "../controller/login.controller";

/* routes */
const router = express.Router();
router.use("/api/login", loginController);
//auth 라우터 미구현
//router.use('/auth', authRouter);

export default router;
