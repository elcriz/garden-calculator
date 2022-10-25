import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getFromStorage, saveToStorage } from '../services/storageService';

const Plants = ({
  currentMonth,
  items,
  isLoading,
}) => {

  const [enrichedItems, setEnrichedItems] = useState(
    getFromStorage(`gardenCalendar-${currentMonth}`, [])
  );

  const handleChange = (itemIndexToChange, taskIndexToChange) => {
    const updatedItems = enrichedItems.map((item, itemIndex) => ({
      ...item,
      tasks: itemIndex === itemIndexToChange
        ? item.tasks.map((task, taskIndex) => ({
          ...task,
          isDone: taskIndex === taskIndexToChange
            ? !task.isDone : task.isDone,
        })) : item.tasks,
    }));

    console.log({ updatedItems });

    saveToStorage(`gardenCalendar-${currentMonth}`, updatedItems);
    setEnrichedItems(updatedItems);
  };

  useEffect(() => {
    console.log('Updating with new items');
    setEnrichedItems(
      getFromStorage(`gardenCalendar-${currentMonth}`, items)
    );
  }, [items]);

  return (
    <ul className="plants">
      {!isLoading && enrichedItems.map(({ name, image, tasks }, itemIndex) => (
        <li
          key={`${itemIndex}-${Math.random()}`}
          className={classnames('plants__plant', {
            'plants__plant--with-image': !!image,
          })}
        >
          <h2>{name}</h2>
          {image && (
            <figure className="plants__image">
              <img
                src={image.url}
                alt={name}
              />
              <figcaption>
                {image.author}, <a href={image.licenseUrl}>{image.license} license</a>.
              </figcaption>
            </figure>
          )}
          <ul className="plants__tasks">
            {tasks.map(({ title, description, isDone }, taskIndex) => (
              <li
                key={`${taskIndex}-${Math.random()}`}
                className={classnames('plants__task', {
                  'is-done': isDone,
                })}
              >
                <h3>{title}</h3>
                {description && (
                  <div className="plants__task-description">
                    {description}
                  </div>
                )}
                <input
                  className="plants__checkbox"
                  type="checkbox"
                  data-checked={isDone ? 'yes' : 'no'}
                  defaultChecked={isDone}
                  onChange={() => {
                    handleChange(itemIndex, taskIndex);
                  }}
                />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

Plants.propTypes = {
  currentMonth: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      tasks: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          description: PropTypes.string,
          infoUrl: PropTypes.string,
        }).isRequired,
      )
    })
  ),
  isLoading: PropTypes.bool.isRequired,
};

export default Plants;
