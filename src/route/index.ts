import express from "express";

import ticket from "./process";

const router = express.Router();

router.use(ticket);

export default router;
