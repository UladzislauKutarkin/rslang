import React from "react"
import renderer from "react-test-renderer"
import FooterLinks from "../src/components/Footer/FooterLinks"

it("renders correctly", () => {
  const tree = renderer
    .create(
      <FooterLinks
        href="https://github.com/yauheni-beiduk"
        gitName="Yauheni Beiduk"
        icon="../src/assets/img/icons/github.png"
      >
        Yauheni Beiduk
      </FooterLinks>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
