import { assert } from "chai";
import sinon from "sinon";
import axios from "axios";

import { sendWebHook } from "../../src/services/sendWebHook";

describe("WebHook", function () {
  const sandbox = sinon.createSandbox();

  after(() => {
    sandbox.restore();
  });

  it("should send request successfully", function (done) {
    const resolved = Promise.resolve({});
    sandbox.stub(axios, "get").returns(resolved);

    sendWebHook("tag1").then((response) => {
      assert.equal(response.isError, false);
      done();
    });
  });
});
