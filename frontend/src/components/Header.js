export default function Header({ redirectLink, navIcon, userEmail }) {  
  return (
    <header className="header">
      <div className="header__logo" />
      <div className="header__handlers">
        { userEmail }
        { redirectLink }
      </div>
    </header>
  )
}