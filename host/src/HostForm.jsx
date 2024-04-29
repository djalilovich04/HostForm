import React, { useState, useRef } from 'react';
import './HostForm.css'; // Import CSS file for styling
import houseIcon from './assets/house_icon.jpeg';
import sharedroom_Icon from './assets/sharedroom_icon.png';
import roomIcon from './assets/room_icon.jpeg';
import virement1 from './assets/virement1.jpeg';
import carte1 from './assets/carte1.jpeg';

function HostForm() {
  const [formData, setFormData] = useState({
    typeOfListing: '',
    location: '',
    maxGuests: '',
  });
  const [numGuests, setNumGuests] = useState(1);
  const incrementGuests = () => {
    setNumGuests(numGuests + 1);
  };
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };
  const handleAnchorClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };
  const decrementGuests = () => {
    if (numGuests > 1) {
      setNumGuests(numGuests - 1);
    }
  };
  const minPrice = 0;
  const [price, setPrice] = useState('');
  const handlePriceChange = (e) => {
    let newValue = e.target.value;
    newValue = newValue.replace(/\D/g, '');

    let numericValue = parseInt(newValue, 10);
    const maxPrice = 1000000;
    if (numericValue >= maxPrice) {
      return;
    }
    if (numericValue < minPrice) {
      newValue = minPrice.toString();
    }
    setPrice(newValue);
  };
  const handleTypeOfListingChange = (type) => {
    setFormData({
      ...formData,
      typeOfListing: type,
    });
  };

  const [features, setFeatures] = useState({
    wifi: false,
    kitchen: false,
    gym: false,
    bathtub: false,
    tv: false,
    garage: false,
    pool: false,
    beachView: false,
    bbqGrill: false,
  });

  const toggleFeature = (feature) => {
    setFeatures((prevFeatures) => ({
      ...prevFeatures,
      [feature]: !prevFeatures[feature],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  const isFormValid = () => {
    // Check if all required fields are filled
    return (
      formData.typeOfListing &&
      formData.location &&
      formData.maxGuests &&
      Object.values(features).some((feature) => feature) &&
      selectedFiles.length > 0 &&
      price && paymentMethod
    );
  };

  return (
    <div>
      <div className="first_step">
        <h2>First step: Tell us about your place.</h2>
        <p>
          In this step, we'll ask you which type of property you have and if<br />
          guests will book the entire place or just a room. Then let us know <br />
          the location and how many guests can stay.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="button-container">
          <h2>What type of place will guests have?</h2>
          <button
            type="button"
            className={`listing-button ${
              formData.typeOfListing === 'House' ? 'active' : ''
            }`}
            onClick={() => handleTypeOfListingChange('House')}
            required
          >
            <img src={houseIcon} alt="House" />
            <span>House</span>
          </button>
          <button
            type="button"
            className={`listing-button ${
              formData.typeOfListing === 'Shared room' ? 'active' : ''
            }`}
            onClick={() => handleTypeOfListingChange('Shared room')}
            required
          >
            <img src={sharedroom_Icon} alt="Shared room" />
            <span>Shared room</span>
          </button>
          <button
            type="button"
            className={`listing-button ${
              formData.typeOfListing === 'Room' ? 'active' : ''
            }`}
            onClick={() => handleTypeOfListingChange('Room')}
            required
          >
            <img src={roomIcon} alt="Room" />
            <span>Room</span>
          </button>
        </div>
        <br />
        <h2>Where's your place located ?</h2>
        <p
          style={{
            marginLeft: '150px',
            fontSize: '18px',
            color: 'black',
            marginTop: '-20px',
            fontWeight: 'bold',
          }}
        >
          Paste your location link here:
        </p>
        <div>
          <input
            style={{
              backgroundColor: 'white',
              padding: '0.5rem',
              width: '250px',
              textAlign: 'center',
              margin: '0 0.5rem',
              borderRadius: '8px',
              color: 'black',
              marginLeft: '400px',
            }}
            type="text"
            id="location"
            name="location"
            placeholder="Enter location"
            required
          />
        </div>
        <br />
        <h2>How much guests can you receive ?</h2>
        <label>
          <p style={{ marginLeft: '-30px', fontSize: '18px', color: 'black' }}>
            Max Guests:
          </p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button className="decguests" onClick={decrementGuests} required>
              -
            </button>
            <span
              style={{
                backgroundColor: 'gray',
                padding: '0.5rem',
                width: '150px',
                textAlign: 'center',
                margin: '0 0.5rem',
                borderRadius: '8px',
              }}
            >
              {numGuests}
            </span>
            <button className="incguests" onClick={incrementGuests}>
              +
            </button>
          </div>
        </label>
        <br />
        <div className="second_step">
          <h2>Second step: Make your place stand out.</h2>
          <p
            style={{
              marginLeft: '50px',
              fontSize: '18px',
              color: 'black',
              marginTop: '-20px',
            }}
          >
            In this step, you'll add some of the amenities your place offers,
            some pictures. <br />Then, you'll create a title and description.
          </p>
        </div>
        <br />
        <h2 style={{ margin: '-10px', marginLeft: '50px' }}>
          What your place has to offer ?
        </h2>
        <br />
        <br />
        <div className="amenities">
          <label>
            <input
              type="checkbox"
              checked={features.wifi}
              onChange={() => toggleFeature('wifi')}
            />
            <p>Wifi</p>
          </label>
          <label>
            <input
              type="checkbox"
              checked={features.kitchen}
              onChange={() => toggleFeature('kitchen')}
            />
            <p>Kitchen</p>
          </label>
          <label>
            <input
              type="checkbox"
              checked={features.gym}
              onChange={() => toggleFeature('gym')}
            />
            <p>Gym</p>
          </label>
          <br />
          <br />
          <label>
            <input
              type="checkbox"
              checked={features.bbqGrill}
              onChange={() => toggleFeature('bbqGrill')}
            />
            <p>BBQ Grill</p>
          </label>
          <label>
            <input
              type="checkbox"
              checked={features.bathtub}
              onChange={() => toggleFeature('bathtub')}
            />
            <p>Bath tub</p>
          </label>
          <label>
            <input
              type="checkbox"
              checked={features.tv}
              onChange={() => toggleFeature('tv')}
            />
            <p>TV</p>
          </label>
          <br />
          <br />
          <label>
            <input
              type="checkbox"
              checked={features.garage}
              onChange={() => toggleFeature('garage')}
            />
            <p>Garage</p>
          </label>
          <label>
            <input
              type="checkbox"
              checked={features.pool}
              onChange={() => toggleFeature('pool')}
            />
            <p>Pool</p>
          </label>
          <label>
            <input
              type="checkbox"
              checked={features.beachView}
              onChange={() => toggleFeature('beachView')}
            />
            <p>Beach view</p>
          </label>
        </div>
        <br />
        <h2>Add some pics of your house.</h2>
        <br />
        <div>
          <a
            href="#"
            onClick={handleAnchorClick}
            style={{
              display: 'inline-block',
              marginLeft: '430px',
              padding: '10px',
              color: 'black',
              textDecoration: 'underline',
              borderRadius: '5px',
            }}
            required
          >
            Upload images from your device.
          </a>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
            multiple
            required
          />
          <br />
          <br />
          {selectedFiles.map((file, index) => (
            <div className="index" key={index}>
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '200px',
                  marginRight: '10px',
                  marginBottom: '10px',
                }}
              />
              <p
                style={{
                  marginLeft: '-30px',
                  fontSize: '15px',
                  color: 'black',
                  fontWeight: '1000',
                }}
              >
                {file.name}
              </p>
            </div>
          ))}
        </div>
        <br />
        <h2>Now, let's give your house a title.</h2>
        <p
          style={{
            marginLeft: '50px',
            fontSize: '18px',
            color: 'gray',
            marginTop: '-20px',
          }}
        >
          Short titles work best. Have fun with it—you can always change it
          later.
        </p>
        <textarea rows={5} style={{ marginLeft: '100px', height: '150px' }} />
        <h2>Create your description.</h2>
        <p
          style={{
            marginLeft: '50px',
            fontSize: '18px',
            color: 'gray',
            marginTop: '-20px',
          }}
        >
          Share what makes your place special..
        </p>
        <textarea
          className="text2"
          rows={5}
          style={{ marginLeft: '100px', height: '250px' }}
        />
        <br />
        <div className="second_step">
          <h2>Third step: Finish up and publish.</h2>
          <p
            style={{
              marginLeft: '50px',
              fontSize: '18px',
              color: 'black',
              marginTop: '-20px',
            }}
          >
            Finally, you'll set up pricing, choose payment methods, and publish
            your listing.
          </p>
        </div>
        <br />
        <h2>Now, set your price.</h2>
        <p
          style={{
            marginLeft: '50px',
            fontSize: '18px',
            color: 'gray',
            marginTop: '-20px',
          }}
        >
          You can change it anytime..
        </p>
        <br />
        <div className="price">
          <input
            inputMode="numeric"
            type="text"
            id="price"
            value={price}
            onChange={handlePriceChange}
            min="1000"
            max="1000000"
            placeholder="3000"
          />
          <span
            style={{
              fontSize: '70px',
              marginTop: '50px',
              color: 'black',
            }}
          >
            DZD
          </span>
        </div>
        <h2>Now, choose your payment method.</h2>
        <p
          style={{
            marginLeft: '50px',
            fontSize: '18px',
            color: 'gray',
            marginTop: '-20px',
          }}
        >
          Here, you can choose how your customers make their payment.
        </p>
        <br />
        <div className="paymentMeth">
          <button
            type="button"
            onClick={() => handlePaymentMethod('paypal')}
            className={
              paymentMethod === 'paypal'
                ? 'payment-button active'
                : 'payment-button'
            }
          >
            <p
              style={{
                fontSize: '18px',
                color: 'black',
                marginTop: '22px',
              }}
            >
              CCP Transfer
            </p>
            <img src={virement1} alt="CCP Transfer" />
          </button>
          <br />
          <br />
          <button
            type="button"
            onClick={() => handlePaymentMethod('credit_card')}
            className={
              paymentMethod === 'credit_card'
                ? 'payment-button active'
                : 'payment-button'
            }
          >
            <p
              style={{
                fontSize: '18px',
                color: 'black',
                marginTop: '22px',
              }}
            >
              {' '}
              Credit Card (BaridiMob)
            </p>
            <img src={carte1} alt="Credit Card" />
          </button>
        </div>
        <br />
        
        <div className="submitbtn">
          <button type="submit" disabled={!isFormValid()}>
            <p
              style={{
                fontSize: '25px',
                color: 'white',
                marginTop: '0px',
                marginLeft: '60px',
              }}
            >
              Publish
            </p>
          </button>
        </div>
        <br />
        <br />
        <br />
      </form>
    </div>
  );
}
export default HostForm;
