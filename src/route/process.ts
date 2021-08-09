import express from "express";
import { createTicket } from "../controller/process";

const router = express.Router();

/**
 * @api {post} /ticket/create Ticket creation endpoint
 * @apiName Create Ticket
 * @apiGroup All
 * @apiParam {String} user_id
 * @apiParam {String} title
 * @apiParam {Array} tags

 * @apiError {Object} 422 Some parameters may contain invalid values.
 */

router.post("/ticket/create", createTicket);

export default router;
