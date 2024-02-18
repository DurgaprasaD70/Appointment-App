import './index.css'

const AppointmentItem = props => {
  const {eachAppot, onChangeStarred} = props
  const {nameInput, date, id, isStarred} = eachAppot

  const onMarkAsStarred = () => {
    onChangeStarred(id)
  }

  const starredUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="card-container">
      <div className="name-star-container">
        <p className="name">{nameInput}</p>
        <button
          className="star-button"
          type="button"
          data-testid="star"
          onClick={onMarkAsStarred}
        >
          <img src={starredUrl} alt="star" />
        </button>
      </div>
      <p className="time">{date}</p>
    </li>
  )
}

export default AppointmentItem
