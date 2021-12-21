import React from "react"

 const Layout = ({ children }) => {
  return (
    <main className="layout">
      <section>{children}</section>
    </main>
  )
}

export default Layout;
