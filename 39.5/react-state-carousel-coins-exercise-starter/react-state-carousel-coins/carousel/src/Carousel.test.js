import { render, fireEvent} from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

// Smoke test
it("renders without crashing", function () {
  render(<Carousel photos={TEST_IMAGES} title="images for testing"/>);
});

// Snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(<Carousel photos={TEST_IMAGES} title="images for testing"/>);
  expect(asFragment()).toMatchSnapshot();
});

it("clicking right arrow then left arrow should go back to same image", () => {
  const { container} = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );

  // Original image source
const before=container.querySelector(".Card-image").getAttribute("src")

  // Clicking right arrow, then left arrow
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

// New image source
  const after = container.querySelector(".Card-image").getAttribute("src");
  expect(before).toEqual(after)
});

it("works when you click on the right arrow", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});
