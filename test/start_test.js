import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { constructSlab } from "../src/construct_highway.js";
import { highway_details } from "../src/highway_details.js";
import { highwayMaterials } from "../src/materials.js";
import { BLACK_DIV, CEMENT_BLOCK, YELLOW_DIV } from "../src/materials.js";

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

describe("HIGH_WAY MEASUREMENTS", () => {
  it("Carriageway Width", () => {
    const hightwayDetails = highway_details();
    assertEquals(hightwayDetails.cwayWidth(), 3);
  });
  it("Carriageway Height", () => {
    const hightwayDetails = highway_details();
    assertEquals(hightwayDetails.cwayHeight(), 12);
  });
  it("Carriageways Count", () => {
    const hightwayDetails = highway_details();
    assertEquals(hightwayDetails.cwaysCount(), 3);
  });
  it("Carriageway currentDividerColor", () => {
    const hightwayDetails = highway_details();
    assertEquals(hightwayDetails.currDivColor(), "black");
    assertEquals(hightwayDetails.currDivColor(), "yellow");
    assertEquals(hightwayDetails.currDivColor(), "black");
  });
  it("Divider Count", () => {
    const hightwayDetails = highway_details();
    assertEquals(hightwayDetails.dividersCount(), 2);
  });
});

describe("Highway Materials", () => {
  const hightwayDetails = highway_details();
  const materials = highwayMaterials(hightwayDetails);

  it("Get cway segmenats", () => {
    assertEquals(materials.getSegements(), [
      [CEMENT_BLOCK, CEMENT_BLOCK, CEMENT_BLOCK],
      [CEMENT_BLOCK, CEMENT_BLOCK, CEMENT_BLOCK],
      [CEMENT_BLOCK, CEMENT_BLOCK, CEMENT_BLOCK],
    ]);
  });

  it("Get Dividers", () => {
    assertEquals(materials.getDividers(), [
      BLACK_DIV,
      BLACK_DIV,
    ]);
    assertEquals(materials.getDividers(), [
      YELLOW_DIV,
      YELLOW_DIV,
    ]);
    assertEquals(materials.getDividers(), [
      BLACK_DIV,
      BLACK_DIV,
    ]);
    assertEquals(materials.getDividers(), [
      YELLOW_DIV,
      YELLOW_DIV,
    ]);
  });
});
