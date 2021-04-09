import React from "react"
import renderer from "react-test-renderer"
import FooterLinks from "../FooterLinks"

const mockProps = {
  gitLink: "https://github.com/yauheni-beiduk",
  gitName: "Yauheni Beiduk",
  icon: "../src/assets/img/icons/github.png",
}
it("renders correctly", () => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  const tree = renderer.create(<FooterLinks {...mockProps} />).toJSON()
  expect(tree).toMatchSnapshot()
})
