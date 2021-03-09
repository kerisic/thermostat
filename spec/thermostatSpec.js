'use strict';

describe('Thermostat', function(){
  var thermostat;

  beforeEach(function(){
    thermostat = new Thermostat();
  });
  it('starts at 20 degrees', function(){
    expect(thermostat.getTemperature()).toEqual(20);
  });
  it('increases the temperature by turning it up', function(){
    thermostat.up();
    expect(thermostat.getTemperature()).toEqual(21);
  });
  it('decreases the temperature by turning it down', function(){
    thermostat.down();
    expect(thermostat.getTemperature()).toEqual(19);
  });
  it('has a minimum of 10 degrees', function() {
    for (var i = 0; i < 11; i++) {
      thermostat.down();
    }
    expect(thermostat.getTemperature()).toEqual(10);
  });
  it('has power saving mode by default', function() {
    expect(thermostat.isPowerSavingModeOn()).toEqual(true);
  });
  it('can switch power saving mode off', function() {
    thermostat.switchPowerSavingModeOff();
    expect(thermostat.isPowerSavingModeOn()).toEqual(false);
  });
  it('can switch power saving mode back on', function() {
    thermostat.switchPowerSavingModeOff();
    expect(thermostat.isPowerSavingModeOn()).toEqual(false);
    thermostat.switchPowerSavingModeOn();
    expect(thermostat.isPowerSavingModeOn()).toEqual(true);
  });
  it('can be reset to the default temperature', function() {
    for (var i = 0; i < 6; i++) {
      thermostat.up();
    }
    thermostat.resetTemperature();
    expect(thermostat.getTemperature()).toEqual(20);
  });
  describe('when power saving mode is on', function() {
    it('has a maximum of 24 degrees', function() {
      for (var i = 0; i < 6; i++) {
        thermostat.up();
      }
      expect(thermostat.getTemperature()).toEqual(25);
    });
  });
  describe('when power saving mode is off', function() {
    it('has a maximum temperature of 32 degrees', function() {
      thermostat.switchPowerSavingModeOff();
      for (var i = 0; i < 13; i++) {
        thermostat.up();
      }
      expect(thermostat.getTemperature()).toEqual(32);
    });
  });
  describe('display usage levels', function() {
    describe('when the temperature is below 18', function() {
      it('is considered low-usage', function() {
        for (var i = 0; i < 3; i++) {
          thermostat.down();
        }
        expect(thermostat.energyUsage()).toEqual('low-usage')
      });
    });
    describe('when the temperature is between 18 and 25', function() {
      it('is considered medium-usage', function() {
        expect(thermostat.energyUsage()).toEqual('medium-usage')
      });
    });
    describe('when the temperature is anything else', function() {
      it('is considered high-usage', function() {
        thermostat.switchPowerSavingModeOff();
        for (var i = 0; i < 6; i++) {
          thermostat.up();
        }
        expect(thermostat.energyUsage()).toEqual('high-usage')
      });
    });
  });
});
