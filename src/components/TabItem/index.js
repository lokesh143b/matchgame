import './index.css'

const TabItem = props => {
  const {tabDetails, clickTabItem, isActive} = props
  const {displayText, tabId} = tabDetails

  const onClickTabItem = () => {
    clickTabItem(tabId)
  }

  const activeBtnTabClassName = isActive ? 'active-btn' : ''

  return (
    <li>
      <button
        className={`tab-item-btn ${activeBtnTabClassName}`}
        type="button"
        onClick={onClickTabItem}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
