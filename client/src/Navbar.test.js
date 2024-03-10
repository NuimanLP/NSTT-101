import Sidebar from "./compo/sidebar";
import { getByTestId, render,screen } from "@testing-library/react"

test("Admin login show booking in sidebar ",()=>{
    sessionStorage.setItem("role","Admin")
    render(<Sidebar/>)

    const booking = screen.getByTestId("bookside")
    expect(booking).toBeInTheDocument()
})
