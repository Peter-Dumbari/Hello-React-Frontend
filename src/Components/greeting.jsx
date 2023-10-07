import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRandomGreeting } from '../store';

function Greeting() {
  const dispatch = useDispatch();
  const { greeting, loading, error } = useSelector((state) => state.greeting);

  useEffect(() => {
    dispatch(fetchRandomGreeting());
  }, [dispatch]);

  return (
    <div>
      <h1>Our Greetings to you 👇</h1>
      {loading && <p>Loading...</p>}
      {error && (
        <p>
          Error:
          {error}
        </p>
      )}
      {greeting && <p>{greeting}</p>}
    </div>
  );
}

export default Greeting;
