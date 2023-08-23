import './index.css'

const ImageList = props => {
  const {imageDetails, imageUrl, onClickImg} = props
  const {thumbnailUrl} = imageDetails

  const clickOnImg = () => {
    onClickImg(thumbnailUrl)
  }

  return (
    <li>
      <button onClick={clickOnImg} className="img-btn" type="button">
        <img className="img" src={imageUrl} alt="match" />
      </button>
    </li>
  )
}

export default ImageList
