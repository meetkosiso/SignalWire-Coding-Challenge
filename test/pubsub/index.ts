import { assert } from "chai";
import { subscribe, subscribers } from "../../src/services/pubsub";

describe("Pubsub", function () {
  it("should subscribe successfully", function (done) {
    subscribe("test", function () {
      //
    });
    const subscribes = Object.keys(subscribers);
    assert.isAbove(subscribes.length, 0);
    done();
  });
});
