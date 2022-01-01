import React, { useState } from 'react';
import { saveShippingAddress } from '../services/shippingService';

const STATUS = {
  IDLE: 'IDLE', // When the form is loaded,
  SUBMITTED: 'SUBMITTED',
  SUBMITTING: 'SUBMITTING',
  COMPLETED: 'COMPLETED'
};

// Declaring outside component to avoid recreation on each render
const emptyAddress = {
  city: '',
  country: ''
};

export default function Checkout({ cart, emptyCart }) {
  const [address, setAddress] = useState(emptyAddress);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [saveError, setSaveError] = useState(null);

  function handleChange(e) {
    e.persist(); // Makes sure React does not garbage collect the event before usage (to avoids null references) (Only needed in React versions less than 17 when using the function version of setState)
    console.log(e.target.id, e.target.value);
    setAddress((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  }

  function handleBlur(event) {
    // TODO
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(STATUS.SUBMITTING);
    try {
      await saveShippingAddress(address);
      setStatus(STATUS.COMPLETED);
    } catch (err) {
      setSaveError(err);
    } finally {
    }
  }

  if (saveError) throw saveError;

  if (status === STATUS.COMPLETED) {
    return <h1>Thanks for spending your money with us:-)</h1>;
  }

  return (
    <>
      <h1>Shipping Info</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="city">City</label>
          <br />
          <input
            id="city"
            type="text"
            value={address.city}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <br />
          <select
            id="country"
            value={address.country}
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            <option value="China">China</option>
            <option value="India">India</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="USA">USA</option>
          </select>
        </div>

        <div>
          <input
            type="submit"
            className="btn btn-primary"
            value="Save Shipping Info"
            disabled={status === STATUS.SUBMITTING}
          />
        </div>
      </form>
    </>
  );
}
