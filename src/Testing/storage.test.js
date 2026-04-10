/**
 * @jest-environment jsdom
 */

import { saveToLocalStorage } from "../Utils/storage";
import { getFromLocalStorage } from "../Utils/storage";

const mockedtestArray = [{ id: 1, name: "Movie 1" }, { id: 2, name: "Movie 2" }];

test("Storage functionality works correctly", () => {
  saveToLocalStorage("testKey", mockedtestArray);
  expect(getFromLocalStorage("testKey")).toEqual(mockedtestArray); // Placeholder assertion, replace with actual test logic
  // Test implementation
});
