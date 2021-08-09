import { assert } from "chai";
import {
  createTicket,
  validation,
  createTag,
  ticketStore,
  tagStore,
  mostOccurrentTag,
} from "../../src/store/model";
import {
  create,
  fetchTickets,
  fetchTags,
  fetchMostOccurrentTag,
} from "../../src/store/process";

describe("Database", function () {
  const record = {
    user_id: "477-000-0043",
    title: "Dentist",
    createdAt: "2021-08-08T23:00:21.892Z",
    tags: ["tags1", "Tags1", "tag3"],
  };

  const noUser_ID = {
    user_id: "",
    title: "Dentist",
    createdAt: "2021-08-08T23:00:21.892Z",
    tags: ["tags1", "Tags1", "tag3"],
  };

  const maxTag = {
    tag1: 4,
    tag2: 7,
    tag3: 1,
  };

  const noTitle = {
    user_id: "",
    title: "",
    createdAt: "2021-08-08T23:00:21.892Z",
    tags: ["tags1", "Tags1", "tag3"],
  };

  const tagsEqual5 = {
    user_id: "",
    title: "",
    createdAt: "2021-08-08T23:00:21.892Z",
    tags: ["tags1", "Tags1", "tag3", "tag3", "tag3"],
  };

  it("should create a ticket on store", function (done) {
    const store = ticketStore;
    const initialSize = store.length;

    createTicket(record);

    const currentSize = store.length;
    assert.isAbove(currentSize, initialSize);
    done();
  });

  it("should create a tag on store", function (done) {
    createTag(record.tags);

    const tagCount = Object.keys(tagStore).length;

    assert.isAbove(tagCount, 0);

    done();
  });

  it("should fail if user_id is not provided", function (done) {
    const validated = validation(noUser_ID);
    assert.equal(validated.isError, true);
    done();
  });

  it("should fail if title is not provided", function (done) {
    const validated = validation(noTitle);
    assert.equal(validated.isError, true);
    done();
  });

  it("should fail if tags is equal or more than 5", function (done) {
    const validated = validation(tagsEqual5);
    assert.equal(validated.isError, true);
    done();
  });

  it("should succeed if fields are valid", function (done) {
    const validated = validation(record);
    assert.equal(validated.isError, false);
    done();
  });

  it("should create tickets successfully", function (done) {
    const store = ticketStore;
    const initialSize = store.length;

    create(record);

    const currentSize = store.length;
    assert.isAbove(currentSize, initialSize);
    done();
  });

  it("should fail if validation fails", function (done) {
    const response = create(noTitle);

    assert.equal(response.success, false);
    done();
  });

  it("should fetch tickets successfully", function (done) {
    const store = fetchTickets();

    assert.isAbove(store.length, 0);
    done();
  });

  it("should fetch tags successfully", function (done) {
    const store = fetchTags();

    const tagCount = Object.keys(store).length;

    assert.isAbove(tagCount, 0);
    done();
  });

  it("should return most occurrent tag", function (done) {
    const maxOccrrentTag = mostOccurrentTag(maxTag);

    assert.equal(maxOccrrentTag, "tag2");
    done();
  });

  it("should return most occurrent tag from store", function (done) {
    const maxOccrrentTag = fetchMostOccurrentTag();

    assert.equal(maxOccrrentTag, "tags1");
    done();
  });
});
