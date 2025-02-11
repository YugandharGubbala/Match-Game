import {Component} from 'react'

// import local files
import './App.css'
import {tabsList, imagesList} from './Data'

// import local components
import Header from './component/Header'
import Game from './component/Game'
import GameOver from './component/GameOver'

const defaultValues = {
  activeTabId: tabsList[0].tabId,
  currentImageId: imagesList[0].id,
  score: 0,
  timer: 60,
  gameOver: false,
}

// Replace your code here
class App extends Component {
  state = {
    ...defaultValues,
  }

  componentDidMount() {
    this.setTimerInterval()
  }

  setTimerInterval = () => {
    this.timerId = setInterval(this.setTimer, 1000)
  }

  setTimer = () => {
    const {timer} = this.state
    if (timer > 0) {
      this.setState({timer: timer - 1})
    } else {
      clearInterval(this.timerId)
      this.setState({gameOver: true})
    }
  }

  onClickTab = activeTabId => this.setState({activeTabId})

  onClickThumbnail = id => {
    const {currentImageId} = this.state
    if (id !== currentImageId) {
      clearInterval(this.timerId)
      this.setState({gameOver: true})
    } else {
      this.generateRandomImage()
    }
  }

  generateRandomImage = () => {
    const index = Math.floor(Math.random() * imagesList.length)
    const currentImageId = imagesList[index].id
    const {score} = this.state
    this.setState({currentImageId, score: score + 1})
  }

  onClickGameOver = () => {
    this.setState({...defaultValues}, this.setTimerInterval)
  }

  render() {
    const {activeTabId, currentImageId, score, timer, gameOver} = this.state
    const thumbnailImagesList = imagesList.filter(
      imageDetails => imageDetails.category === activeTabId,
    )
    return (
      <div className='app-container'>
        <Header score={score} timer={timer} />
        <div className='maincontainer'>
          {gameOver ? (
            <GameOver score={score} onClick={this.onClickGameOver} />
          ) : (
            <Game
              tabs={tabsList}
              allImagesList={imagesList}
              thumbnailImages={thumbnailImagesList}
              activeTabId={activeTabId}
              currentImageId={currentImageId}
              onClickTab={this.onClickTab}
              onClickThumbnail={this.onClickThumbnail}
            />
          )}
        </div>
      </div>
    )
  }
}

export default App
