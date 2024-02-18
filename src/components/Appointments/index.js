import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

import './index.css'

let filterdList
class Appointments extends Component {
  state = {appointmentsList: [], nameInput: '', dateInput: '', isActive: false}

  onchangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {nameInput, dateInput} = this.state
    const formatDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyy, EEEE')
      : ''
    if (nameInput !== '' && dateInput !== '') {
      const newAppointment = {
        id: uuidv4(),
        nameInput,
        date: formatDate,
        isStarred: false,
      }
      this.setState(prevState => ({
        appointmentsList: [...prevState.appointmentsList, newAppointment],
        nameInput: '',
        dateInput: '',
      }))
    }
  }

  onChangeStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppot => {
        if (eachAppot.id === id) {
          return {...eachAppot, isStarred: !eachAppot.isStarred}
        }
        return eachAppot
      }),
    }))
  }

  filteredStarredAppointments = () => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.filter(
        eachAppoit => eachAppoit.isStarred === true,
      ),
    }))
  }

  onChangeActiveStatus = () => {
    const {isActive, appointmentsList} = this.state
    if (!isActive) {
      filterdList = appointmentsList.filter(
        eachAppoit => eachAppoit.isStarred === true,
      )
      this.setState(prevState => ({
        isActive: !prevState.isActive,
      }))
    } else {
      this.setState(prevState => ({
        isActive: !prevState.isActive,
        appointmentsList: prevState.appointmentsList,
      }))
    }
  }

  render() {
    const {appointmentsList, nameInput, dateInput, isActive} = this.state

    const bgClassName = isActive ? 'bg-color' : ''

    const finalAppointmentList = isActive ? filterdList : appointmentsList

    return (
      <div className="bg-container">
        <div className="content-container">
          <div className="top-container">
            <form className="form-container" onSubmit={this.onAddAppointment}>
              <h1>Add Appointment</h1>
              <label htmlFor="title" className="label">
                TITLE
              </label>
              <input
                id="title"
                type="text"
                className="input-ele"
                placeholder="Title"
                onChange={this.onchangeNameInput}
                value={nameInput}
              />
              <label htmlFor="date" className="label">
                DATE
              </label>
              <input
                id="date"
                type="date"
                className="input-ele"
                onChange={this.onChangeDateInput}
                value={dateInput}
              />
              <button type="submit" className="button">
                ADD
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="main-image"
            />
          </div>
          <hr className="seperator" />
          <div className="appoinment-star-container">
            <h1 className="bottom-heading">Appointments</h1>
            <button
              className={`starred-button ${bgClassName}`}
              type="button"
              onClick={this.onChangeActiveStatus}
            >
              Starred
            </button>
          </div>
          <ul className="appoinment-list-container">
            {finalAppointmentList.map(eachAppot => (
              <AppointmentItem
                eachAppot={eachAppot}
                key={eachAppot.id}
                onChangeStarred={this.onChangeStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
