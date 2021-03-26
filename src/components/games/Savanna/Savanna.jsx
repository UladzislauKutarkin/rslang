import { useState } from "react"
import { useDispatch } from "react-redux"
import { setPageActionCreator } from "../../../redux/pages/pages"

const Savanna = () => {
  const [page] = useState({ name: "savanna", showNavbar: false })
  const dispatch = useDispatch()
  dispatch(setPageActionCreator({ page, showNavbar: false }))
  return <div>{page.name}</div>
}

export default Savanna
