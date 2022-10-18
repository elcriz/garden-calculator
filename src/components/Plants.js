import React from 'react';
import PropTypes from 'prop-types';

const Plants = ({
  items,
  isLoading,
}) => (
  <ul className="plants">
    {!isLoading && items.map(({ name, tasks }, taskIndex) => (
      <li
        key={taskIndex}
        className="plants__plant"
      >
        <h2>{name}</h2>
        <ul className="plants__tasks">
          {tasks.map(({ title, description }, taskIndex) => (
            <li
              key={taskIndex}
              className="plants__task"
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
              />
            </li>
          ))}
        </ul>
      </li>
    ))}
  </ul>
);

Plants.propTypes = {
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
