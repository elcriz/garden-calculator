import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { format } from 'date-fns';
import plantsService from './services/plantsService';

const months = {
  1: 'Januari',
  2: 'Februari',
  3: 'Maart',
  4: 'April',
  5: 'Mei',
  6: 'Juni',
  7: 'Juli',
  8: 'Augustus',
  9: 'September',
  10: 'Oktober',
  11: 'November',
  12: 'December',
};

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
      <header>
        <h1>Garden Calendar</h1>
      </header>
      <nav>
        <ul className="months">
          {Object.keys(months).map(month => (
            <li
              key={month}
              className={classNames('month', {
                'is-current': month === currentMonth,
              })}
            >
              <button
                type="button"
                onClick={() => {
                  setCurrentMonth(month)
                }}
              >
                {months[month]}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <main>
        <ul className="plants">
          {!isFetching && plants.map(({ name, tasks }, taskIndex) => (
            <li
              key={taskIndex}
              className="plant"
            >
              <h2>{name}</h2>
              <ul className="tasks">
                {tasks.map(({ title, description, infoUrl }, taskIndex) => (
                  <li
                    key={taskIndex}
                    className="task"
                  >
                    <h3>{title}</h3>
                    {description && (
                      <div className="task__description">
                        {description}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
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
