import React from 'react'
import './message-popup.css'

const MessagePopup = ({ message, closePopup }) => (
  <div>
    <div className="white_content">
      <h3>{message}</h3>
      <button onClick={closePopup}>Close</button>
    </div>
    <div  className="black_overlay" onClick={closePopup} ></div>
  </div>
)

export default MessagePopup