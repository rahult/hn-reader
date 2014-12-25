import Server from "../../../helpers/hacker-news-server";
import { moduleFor, test } from "ember-qunit";
import fixtures from "../../../fixtures/index/ask";
import { resetGuid } from "hn-reader/extractors/index-page";

var server;

moduleFor("adapter:index/ask", "AskIndexAdapter", {
  setup: function() {
    resetGuid();
    server = new Server();
  },

  teardown: function() {
    server.shutdown();
  }
});

test("Finding a page that exists", function() {
  return this.subject().find(null, { typeKey: "index/ask" }, 1).then(function(json) {
    deepEqual( json, fixtures["1.json"] );
  });
});

test("Finding a page that does not exist", function() {
  return this.subject().find(null, { typeKey: "index/ask" }, "zomg").catch(function(reason) {
    equal( reason, "Not Found" );
  });
});