import { Request, Response } from "express";

import { create, fetchMostOccurrentTag } from "../store/process";
import { sendWebHook } from "../services/sendWebHook";
import { success, fail } from "../services/response";
import { subscribe, publish } from "../services/pubsub";

const topic = "webhook-service";

/**
  Create Ticket
 **/
export function createTicket(req: Request, res: Response): void {
  const creationInstance = create(req.body);

  if (creationInstance.success === false) {
    fail(res, 422, creationInstance.error);
    return;
  }

  // I used publication-subscribtion model to
  // asynchronously invoke a call that
  // will send the most occurrent tags
  // to a web hook.
  // I did this asynchronously because, the time
  // complexity of getting the most occurrent tags is
  // O(n) and because is triggered on every ticket creation
  // this will means that it will slow down ticket creation when number of tags
  // in the store gets very big
  // and this may lead to a degraded user experience while doing it asynchronously means
  // that the ticket creation function is totaly decoupled from the method that sends tags to a webhook
  publish(topic, "");
  success(res, 200, creationInstance, "Ticket was created successfully");
}

/**
  Asynchronouse invocation of a process to send most occurrent tag to web hook
*/
subscribe(topic, () => {
  const tag = fetchMostOccurrentTag();

  sendWebHook(tag);
});
