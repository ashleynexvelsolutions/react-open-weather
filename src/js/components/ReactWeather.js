import React from 'react';
import PropTypes from 'prop-types';
import Today from './Today';
import WeatherIcon from './WeatherIcon';
import useStyles from './ReactWeather.styles';
import defaultTheme from '../defaultTheme';

const ReactWeather = ({
  unitsLabels,
  lang,
  data,
  locationLabel,
  isLoading,
  errorMessage,
  theme,
}) => {
  if (data) {
    const classes = useStyles({ theme });
    const { current } = data;
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (errorMessage) {
      return <div>{errorMessage}</div>;
    }
    return (
      <div className={classes.container}>
        <div className={classes.main}>
        <div className={classes.right}>
            <WeatherIcon
              path={current.icon}
              size={120}
              color={theme.todayIconColor}
              title={current.description}
            />
          </div>
          <div className={classes.left}>
            <p className={classes.header}>{locationLabel}</p>
            <Today
              current={current}
              unitsLabels={unitsLabels}
              lang={lang}
              theme={theme}
            />
          </div>
        </div>
      </div>
    );
  }
  return null;
};

ReactWeather.propTypes = {
  data: PropTypes.object,
  isLoading: PropTypes.bool,
  errorMessage: PropTypes.string,
  unitsLabels: PropTypes.object,
  lang: PropTypes.string,
  locationLabel: PropTypes.string,
  theme: PropTypes.object,
};

ReactWeather.defaultProps = {
  data: null,
  locationLabel: '',
  errorMessage: null,
  isLoading: false,
  unitsLabels: {
    temperature: 'F',
  },
  lang: 'en',
  theme: defaultTheme,
};

export default ReactWeather;
