import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

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

const Months = ({
  currentMonth,
  isLoading,
  onChange,
}) => {
  const handleChange = (to) => {
    const newMonth = currentMonth + to;
    onChange((newMonth > 12) ? 1 : (newMonth === 0 ? 12 : newMonth));
  };

  return (
    <div
      className={classnames('months', {
        'is-loading': isLoading,
      })}
    >
      <button
        className="months__action months__action--previous"
        type="button"
        title="Previous month"
        onClick={() => {
          handleChange(-1);
        }}
      >
        &lt;
      </button>
      <div className="months__current">
        {months[currentMonth]}
      </div>
      <button
        className="months__action months__action--next"
        type="button"
        title="Next month"
        onClick={() => {
          handleChange(1);
        }}
      >
        &gt;
      </button>
    </div>
  );
};

Months.propTypes = {
  currentMonth: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Months;
