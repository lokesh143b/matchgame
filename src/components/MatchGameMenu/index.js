import {Component} from 'react'

import TabItem from '../TabItem'

import ImageList from '../ImageList'

import './index.css'

class MatchGameMenu extends Component {
  state = {
    score: 0,
    activeTabId: 'FRUIT',
    timerElapsedSeconds: 60,
    timeComplete: false,
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/orange-thumbnail-img.png',
  }

  componentDidMount() {
    this.timerId = setInterval(this.incrementElapsedSeconds, 1000)
  }

  incrementElapsedSeconds = () => {
    const {timerElapsedSeconds} = this.state
    if (timerElapsedSeconds !== 0) {
      this.setState(prevState => ({
        timerElapsedSeconds: prevState.timerElapsedSeconds - 1,
      }))
    } else {
      clearInterval(this.timerId)

      this.setState({timeComplete: true})
    }
  }

  getFilteredImages = imagesList => {
    const {activeTabId} = this.state

    const filteredImages = imagesList.filter(
      eachImage => eachImage.category === activeTabId,
    )
    return filteredImages
  }

  clickTabItem = tabId => {
    this.setState({activeTabId: tabId})
  }

  onClickImg = thumbnailUrl => {
    const {imageUrl} = this.state
    const {imagesList} = this.props

    if (imageUrl === thumbnailUrl) {
      const newImgUrl =
        imagesList[Math.floor(Math.random() * imagesList.length)].thumbnailUrl
      console.log(newImgUrl)
      this.setState(prevState => ({
        score: prevState.score + 1,
        imageUrl: newImgUrl,
      }))
    } else {
      clearInterval(this.timerId)
      this.setState({timeComplete: true, timerElapsedSeconds: 0})
    }
  }

  playAgain = () => {
    this.setState({
      score: 0,
      activeTabId: 'FRUIT',
      timerElapsedSeconds: 60,
      timeComplete: false,
      imageUrl:
        'https://assets.ccbp.in/frontend/react-js/match-game/orange-thumbnail-img.png',
    })

    this.timerId = setInterval(this.incrementElapsedSeconds, 1000)
  }

  render() {
    const {
      activeTabId,
      timeComplete,
      imageUrl,
      score,
      timerElapsedSeconds,
    } = this.state

    const {tabsList, imagesList} = this.props

    const filteredImages = this.getFilteredImages(imagesList)

    return (
      <div className="bg-container">
        <nav className="header">
          <div>
            <img
              className="logo"
              src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
              alt="website logo"
            />
          </div>
          <ul className="header-score-timer-container">
            <li className="score-text">
              <p>
                Score:
                <span className="score-count">{score}</span>
              </p>
            </li>

            <li className="timer-container">
              <img
                className="timer-logo"
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png "
                alt="timer"
              />
              <p className="timer-count">{timerElapsedSeconds} sec</p>
            </li>
          </ul>
        </nav>

        <div className="content-div">
          {!timeComplete && (
            <div className="bottom-container">
              <div className="thumbnail-img">
                <img className="thumbnail-img" src={imageUrl} alt="thumbnail" />
              </div>

              <ul className="tab-item-container">
                {tabsList.map(each => (
                  <TabItem
                    key={each.tabId}
                    tabDetails={each}
                    clickTabItem={this.clickTabItem}
                    isActive={activeTabId === each.tabId}
                  />
                ))}
              </ul>

              <ul className="image-list-container">
                {filteredImages.map(each => (
                  <ImageList
                    key={each.imageUrl}
                    imageDetails={each}
                    imageUrl={each.imageUrl}
                    onClickImg={this.onClickImg}
                  />
                ))}
              </ul>
            </div>
          )}

          {timeComplete && (
            <div className="second-div">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
                className="trophy-image"
                alt="trophy"
              />
              <p className="main-heading">YOUR SCORE</p>
              <p className="your-score">{score}</p>
              <button
                type="button"
                className="play-button"
                onClick={this.playAgain}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                  className="restart"
                  alt="reset"
                />
                PLAY AGAIN
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default MatchGameMenu
