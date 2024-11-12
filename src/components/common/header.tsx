import React from "react"

import FullScreenButton from "./full-screen-button"
import Logo from "./logo"

type Props = {}

const Header = async (props: Props) => {
  return (
    <header className="fixed inset-x-0 top-0 bg-default-100">
      <div className="flex items-center justify-between px-6">
        <div>
          <Logo variant="horizontal" />
        </div>
        <div>
          <FullScreenButton />
        </div>
      </div>
    </header>
  )
}

export default Header
