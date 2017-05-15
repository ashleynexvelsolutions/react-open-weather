import React from 'react';
import style from '../css/react-weather.scss';
import owApi from './owApi';
import utils from './utils';

class ReactWeather extends React.Component {
  constructor(props) {
    super(props);
    this.api = new owApi(props.unit, props.apikey);
    this.state = {
      data: null
    }
  }
  static get defaultProps() {
    return {
      unit: "metric",
      type: "geo",
      forecast: "today"
    }
  }
  static get propTypes() {
    return {
      unit: React.PropTypes.oneOf(['metric', 'imperial']),
      type: React.PropTypes.oneOf(['geo', 'city']),
      lat: React.PropTypes.string,
      lon: React.PropTypes.string,
      city: React.PropTypes.string,
      forecast: React.PropTypes.oneOf(['today', '5days']),
      apikey: React.PropTypes.string.isRequired
    }
  }
  render() {
    const data = this.state.data;
    const {forecast} = this.props;
    const units = utils.getUnits(this.props.unit);
    if(data){
      const days = data.days;
      return (
        <div className="rw-box">
          <h2>{data.city.name}</h2>
          <div className="rw-container">
          {
            days.map(function(day, i){
              const iconCls = utils.getIcon(day.weather.icon);
              return(
                <div key={`day-${i}`} className={`rw-day rw-${forecast}`}>
                  <div className="rw-date">{day.date}</div>
                  <i className={`wicon wi ${iconCls}`}></i>
                  <div className="rw-desc">{day.weather.description}</div>
                  <div className="rw-current">{day.temprature.current} {units.temp}</div>
                  <div className="rw-range">{day.temprature.min} {units.temp} / {day.temprature.max} {units.temp} </div>
                  <div className="rw-info">
                    <div>Wind Speed: <b>{day.wind.speed}</b> {units.speed}</div>
                    <div>Humidity: <b>{day.humidity}</b> %</div>
                  </div>
                </div>
              )
            })
          }
          </div>
        </div>
      );
    }
    else{
      return(<div>Loading...</div>)
    }
    
  }
  componentDidMount() {
    this.getWeatherData();
  }
  getWeatherData() {
    var self = this;
    var forecast = self.props.forecast;
    var params = self._getParams();
    var promise = null;
    if(forecast==="today"){
      promise = self.api.getWeatherData(params);
    }else if(forecast==="5days"){
      params.cnt=5;
      promise = self.api.getForecastData(params);
    }
    promise.then(function (data) {
      
      self.setState({
        data: data
      });
    })
  }
  _getParams() {
    const { type, lon, lat, city, cityId, country } = this.props;
    switch(type){
      case "geo": 
        return { "lon": lon, "lat": lat }   
      case "city":
        return { "q" : city }  
    }
  }
}

export default ReactWeather;