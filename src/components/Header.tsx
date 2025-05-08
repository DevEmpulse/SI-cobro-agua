import type React from "react"

interface HeaderProps {
  title: string
  subtitle?: string
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold text-center text-slate-800 ">{title}</h1>
      {subtitle && <p className="text-center text-slate-600  mt-2">{subtitle}</p>}
    </header>
  )
}

export default Header
