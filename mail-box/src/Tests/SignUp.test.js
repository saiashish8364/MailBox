import SignUp from "../Components/Pages/SignUp";
import { render, screen } from "@testing-library/react";

test("renders the SignUp component", () => {
  render(<SignUp />);

  // Check that the "Sign Up" legend is present
  const signUpLegend = screen.getByText("Sign Up");
  expect(signUpLegend).toBeInTheDocument();
});
