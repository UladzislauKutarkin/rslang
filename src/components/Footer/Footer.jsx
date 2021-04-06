import React from "react"
import FooterLinks from "./FooterLinks"
import githubIcon from "../../assets/img/icons/github.png"
import rs from "../../assets/img/icons/rs_school_js.svg"

export default function Footer() {
  return (
    <>
      <footer className="relative bg-blueGray-200 pt-8 pb-6">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-14 h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            />
          </svg>
        </div>
        <div className="container min-h-screen-75 mx-auto px-4 mt-6 mb-0 mb-6">
          <div className="flex mx-auto flex-col">
            <div className="flex justify-center">
              <FooterLinks
                gitLink="https://github.com/ya6"
                gitName="Alexandr Yakubouski"
                icon={githubIcon}
              />
              <FooterLinks
                gitLink="https://github.com/yauheni-beiduk"
                gitName="Yauheni Beiduk"
                icon={githubIcon}
              />
              <FooterLinks
                gitLink="https://github.com/UladzislauKutarkin"
                gitName="Uladzislau Kutarkin"
                icon={githubIcon}
              />
              <FooterLinks
                gitLink="https://github.com/AlekseyGrimm"
                gitName="Alexey Stalpec"
                icon={githubIcon}
              />
            </div>
            <div className="flex justify-center mt-8">
              <div className="">2021 &copy;</div>
              <FooterLinks gitLink="https://rs.school/js/" icon={rs} />
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
