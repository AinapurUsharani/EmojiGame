import './index.css'

const NavBar = props => {
  const {currentScore, isActive, currentTopScore} = props

  return (
    <nav className="nav-bar-container">
      <div className="title-with-score-container">
        <div className="logo-and-title-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/game-logo-img.png"
            alt="emoji logo"
            className="emoji-logo"
          />
          <h1 className="title">Emoji Game</h1>
        </div>

        {isActive && (
          <div className="scores-container">
            <p className="score">Score : {currentScore}</p>
            <p className="score">TopScore: {currentTopScore}</p>
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavBar
