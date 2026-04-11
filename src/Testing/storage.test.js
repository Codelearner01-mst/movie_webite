/**
 * @jest-environment jsdom
 */

import { saveToLocalStorage } from "../Utils/storage";
import { getFromLocalStorage } from "../Utils/storage";
import { isMovieInFavourites } from "../Utils/helper";

const mockedtestArray = [{
  id:
    1,
  name: "Movie 1"
}, { id: 2, name: "Movie 2" }];

test("Storage functionality works correctly", () => {
  saveToLocalStorage("favourite", mockedtestArray);
  expect(getFromLocalStorage("favourite")).toEqual(mockedtestArray); // Placeholder assertion, replace with actual test logic
  // Test implementation
});

test("Helper function works correctly", () => {
  expect(isMovieInFavourites(mockedtestArray[0])).toBe(true);
});
