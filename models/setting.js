"use strict";

var moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  var Setting = sequelize.define("Setting", {
    ckey: {
      allowNull: false,
      type: DataTypes.STRING
    },
    cval: {
      allowNull: true,
      type: DataTypes.STRING,
      validate: {
        fn : function(val) {
          
          if(!val && val != 0 && this.isrequired) {
            throw Error(this.label + ', cannot be empty');
          }
          
          if(val) {
            switch (this.typeData) {
              case 'DATE' :
                if (!moment(val, 'DD-MM-YYYY').isValid()) {
                  throw Error(this.label + ', invalid date ');
                }
                break;
              case 'NUMBER' :
                if (!val.match(/^[0-9]+$/)) {
                  throw Error(this.label + ', invalid date format');
                }
                break;
              case 'EMAIL' :
                if (!val.match(/^([a-zA-Z0-9]+(?:[.-_]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,7})$/)) {
                  throw Error(this.label + ', invalid email format');
                }
                break;
              case 'URL' :
                if (!val.match(/^(\w{3,6}\:\/\/[\w\-]+(?:\.[\w\-]+)+(?:\:\d{2,4})*(?:\/?|(?:\/[\w\-]+)*)(?:\/?|\/\w+\.\w{2,4}(?:\?[\w]+\=[\w\-]+)?)?(?:\&[\w]+\=[\w\-]+)*)$/)) {
                  throw Error(this.label + ', invalid url format');
                }
                break;
            }
          }
        }
      }
    },
    label: {
      allowNull: false,
      type: DataTypes.STRING
    },
    typeData: {
      allowNull: false,
      defaultValue: 'STRING',
      type: DataTypes.ENUM('STRING', 'DATE', 'NUMBER', 'EMAIL', 'URL')
    },
    isrequired: {
      allowNull: false,
      defaultValue: true,
      type: DataTypes.BOOLEAN
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Setting;
};