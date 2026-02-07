import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { constructSlab } from "../src/start.js";

const CEMENT_BLOCK = "\x1B[48;5;254m" + "  " + "\x1B[0m";
const YELLOW_DIV = "\x1B[48;5;226m" + " " + "\x1B[0m";

describe("ADD DIVIDERS", () => {
  it("Adds dividers sucessfully", () => {
    const segment = Array.from({ length: 3 }, () => CEMENT_BLOCK);
    const segments = Array.from({ length: 3 }, () => segment);
    const divs = Array.from({ length: 2 }, () => YELLOW_DIV);
    const roadWithDivs = constructSlab(segments, divs);
    assertEquals(roadWithDivs, [
      CEMENT_BLOCK,
      CEMENT_BLOCK,
      CEMENT_BLOCK,
      YELLOW_DIV,
      CEMENT_BLOCK,
      CEMENT_BLOCK,
      CEMENT_BLOCK,
      YELLOW_DIV,
      CEMENT_BLOCK,
      CEMENT_BLOCK,
      CEMENT_BLOCK,
    ]);
  });
});
