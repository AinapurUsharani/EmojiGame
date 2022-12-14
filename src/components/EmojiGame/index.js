import {Component} from 'react'

import NavBar from '../NavBar'
import EmojiCard from '../EmojiCard'
import WinOrLoseCard from '../WinOrLoseCard'

import './index.css'

class EmojiGame extends Component {
  state = {clickedEmojisList: [], isGameActive: true, TopScore: 0}

  resetGame = () => {
    this.setState({clickedEmojisList: [], isGameActive: true})
  }

  renderScoreCard = () => {
    const {clickedEmojisList} = this.state
    const {emojisList} = this.props

    const isWon = clickedEmojisList.length === emojisList.length
    return (
      <WinOrLoseCard
        resetGame={this.resetGame}
        isWon={isWon}
        score={clickedEmojisList.length}
      />
    )
  }

  finishGameAndSendScore = currentScore => {
    const {topScore} = this.state

    let newScore = topScore
    if (currentScore > newScore) {
      newScore = currentScore
    }
    this.setState({topScore: newScore, isGameActive: false})
  }

  clickEmoji = id => {
    const {emojisList} = this.props
    const {clickedEmojisList} = this.state
    const clickedEmojisListLength = clickedEmojisList.length
    const checkWhetherContain = clickedEmojisList.includes(id)

    if (checkWhetherContain) {
      this.finishGameAndSendScore(clickedEmojisListLength)
    } else if (emojisList.length - 1 === clickedEmojisListLength) {
      this.finishGameAndSendScore(emojisList.length)
    }
    this.setState(prevState => ({
      clickedEmojisList: [...prevState.clickedEmojisList, id],
    }))
  }

  getShuffledEmojisList = () => {
    const {emojisList} = this.props
    return emojisList.sort(() => Math.random() - 0.5)
  }

  renderEmojiList = () => {
    const shuffledEmojisList = this.getShuffledEmojisList()

    return (
      <ul className="emojis-list-container">
        {shuffledEmojisList.map(each => (
          <EmojiCard
            key={each.id}
            emojiDetails={each}
            clickEmoji={this.clickEmoji}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {clickedEmojisList, isGameActive, TopScore} = this.state
    return (
      <div className="app-container">
        <NavBar
          currentScore={clickedEmojisList.length}
          isActive={isGameActive}
          currentTopScore={TopScore}
        />
        <div className="emoji-game-container">
          {isGameActive ? this.renderEmojiList() : this.renderScoreCard()}
        </div>
      </div>
    )
  }
}

export default EmojiGame
