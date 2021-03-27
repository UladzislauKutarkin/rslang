import { useState } from "react"
import { useDispatch } from "react-redux"
import { setPageActionCreator } from "../../../redux/pages/pages"
import savannaBack from "../../../assets/img/games/savanna_back.jpg"
import lotos from "../../../assets/img/games/lotos_1.png"

const Savanna = () => {
  const [page] = useState({ name: "savanna", showNavbar: false })
  const dispatch = useDispatch()
  dispatch(setPageActionCreator({ page, showNavbar: false }))
  return (
    <div
      className="h-screen w-screen bg-cover   bg-center"
      style={{ backgroundImage: `url(${savannaBack})` }}
    >
      {page.name}
      <div className="absolute bottom-10 w-full">
        <img
          className=" animate-lotosRotate mx-auto  bottom-10 left-1/2 w-24 h-24"
          src={lotos}
          alt="lotos"
        />
      </div>
    </div>
  )
}
export default Savanna
