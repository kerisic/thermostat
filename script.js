$(document).ready(function(){
  var thermostat = new Thermostat;
  updateTemperature();

  $('#temperature-up').on('click',function() {
    thermostat.up();
    updateTemperature();
  });

  $('#temperature-down').on('click',function() {
    thermostat.down();
    updateTemperature();
  });

  $('#temperature-reset').on('click',function() {
    thermostat.resetTemperature();
    updateTemperature();
  });

  $('#powersaving-on').on('click',function() {
    thermostat.switchPowerSavingModeOn();
    $('#power-saving-status').text('on');
    updateTemperature;
  });

  $('#powersaving-off').on('click',function() {
    thermostat.switchPowerSavingModeOff();
    $('#power-saving-status').text('off');
    updateTemperature;
  });

  displayWeather('London');

  $('#current-city').change(function() {
    var city = $('#current-city').val();
    displayWeather(city);
  });

  function displayWeather(city) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;
    var token = '&appid=a5b3bae99948c408ffcd3eb416f730ab';
    var units = '&units=metric';
    $.get(url + token + units, function(data) {
      $('#current-temperature').text(data.main.temp);
    })
  }

  function updateTemperature() {
    $('#temperature').text(thermostat.temperature);
    $('#temperature').attr('class', thermostat.energyUsage());
  }
})
