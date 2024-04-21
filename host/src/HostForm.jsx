// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './HostForm.css'; // Import CSS file for styling
import houseIcon from './assets/house_icon.jpeg';
import sharedroom_Icon from './assets/sharedroom_icon.png';
import roomIcon from './assets/room_icon.jpeg';


function HostForm() {
  const [formData, setFormData] = useState({
    typeOfListing: '',
    location: '',
    maxGuests: '',
  });
  const [numGuests, setNumGuests] = useState(1);
  const [location, setLocation] = useState('');
  const incrementGuests = () => {
    setNumGuests(numGuests + 1);
  };

  const decrementGuests = () => {
    if (numGuests > 1) {
      setNumGuests(numGuests - 1);
    }
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  const handleTypeOfListingChange = (type) => {
    setFormData({
      ...formData,
      typeOfListing: type,
    });
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <div>
    <div className='first_step'>
      <h2>First step: Tell us about your place.</h2>
      <p>In this step,
       we'll ask you which type of property you have and if<br /> 
       guests will book the entire place or just a room.
        Then let us know the<br /> location and how many guests can stay.</p>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="button-container">
        <h2>What type of place will guests have?</h2>
          <button
            type="button"
            className={`listing-button ${formData.typeOfListing === 'House' ? 'active' : ''}`}
            onClick={() => handleTypeOfListingChange('House')}
          >
            <img src={houseIcon} alt="House" />
            <span>House</span>
          </button>
          <button
            type="button"
            className={`listing-button ${formData.typeOfListing === 'Shared room' ? 'active' : ''}`}
            onClick={() => handleTypeOfListingChange('Shared room')}
          >
            <img src={sharedroom_Icon} alt="Shared room" />
            <span>Shared room</span>
          </button>
          <button
            type="button"
            className={`listing-button ${formData.typeOfListing === 'Room' ? 'active' : ''}`}
            onClick={() => handleTypeOfListingChange('Room')}
          >
            <img src={roomIcon} alt="Room" />
            <span>Room</span>
          </button>
        </div>
        <br />
        <h2>Where's your place located ?</h2>
          Location:
          <div>
          <input
        type="text"
        id="location"
        name="location"
        value={location}
        onChange={handleLocationChange}
        placeholder="Enter location"
      />
        
      </div>
        <br />
        <h2>Share some basics about your place.</h2>
        <label>
          <p>Max Guests:</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
        <button className='decguests' onClick={decrementGuests}>-</button>
        <span style={{ backgroundColor: 'gray', padding: '0.5rem',width:'150px',
        textAlign:'center', margin: '0 0.5rem' }}>{numGuests}</span>
        <button className='incguests' onClick={incrementGuests}>+</button>
      </div>
        </label>
        <br />
      </form>
    </div>
  );
}

export default HostForm;
