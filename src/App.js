import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { format } from 'date-fns';
import Months from './components/Months';
import Plants from './components/Plants';
import plantsService from './services/plantsService';

const App = () => {
  const [currentMonth, setCurrentMonth] = useState(
    Number(format(new Date(), 'M'))
  );
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState('');
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchPlants = () => {
      setError('');
      plantsService.retrieveMonth(currentMonth)
        .then((items) => {
          setPlants(items);
        })
        .catch(({ message }) => {
          setError(message);
        })
        .finally(() => {
          setIsFetching(false);
        })
    };

    fetchPlants();
  }, [currentMonth]);

  return (
    <div className={classNames('app', {
      'is-loading': isFetching,
    })}>
      <header className="app__header">
        <h1>Garden Calendar</h1>
      </header>
      <Months
        currentMonth={currentMonth}
        isLoading={isFetching}
        onChange={setCurrentMonth}
      />
      <main>
        <Plants
          currentMonth={currentMonth}
          items={plants}
          isLoading={isFetching}
        />
        {error && (
          <div className="error">
            {error}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
