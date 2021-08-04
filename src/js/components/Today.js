import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './Today.styles';

const Today = ({ current, unitsLabels, lang, theme }) => {
  const classes = useStyles({ theme });
  const hasRange =
    current.temperature.min !== undefined &&
    current.temperature.max !== undefined;
  return (
    <div className="rw-today">
      <div className={classes.date}>{current.date}</div>
      <div className={classes.hr} />
      <div className={classes.current}>
        {current.temperature.current} {unitsLabels.temperature}
      </div>
      {hasRange && (
        <div className={classes.range}>
          {current.temperature.max} / {current.temperature.min}{' '}
          {unitsLabels.temperature}
        </div>
      )}
      <div className={classes.desc}>{current.description}</div>
    </div>
  );
};

Today.propTypes = {
  current: PropTypes.object.isRequired,
  unitsLabels: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
};

export default Today;
