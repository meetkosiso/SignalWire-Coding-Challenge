"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon_1 = __importDefault(require("sinon"));
const axios_1 = __importDefault(require("axios"));
const sendWebHook_1 = require("../../src/services/sendWebHook");
describe("WebHook", function () {
    const sandbox = sinon_1.default.createSandbox();
    after(() => {
        sandbox.restore();
    });
    it("should send request successfully", function (done) {
        const resolved = Promise.resolve({});
        sandbox.stub(axios_1.default, "get").returns(resolved);
        sendWebHook_1.sendWebHook("tag1").then((response) => {
            chai_1.assert.equal(response.isError, false);
            done();
        });
    });
});
