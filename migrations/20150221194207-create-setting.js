"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Settings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      ckey: {
        allowNull: false,
        type: DataTypes.STRING
      },
      cval: {
        allowNull: true,
        type: DataTypes.STRING
      },
      label: {
        allowNull: false,
        type: DataTypes.STRING
      },
      typeData: {
        allowNull: false,
        defaultValue: 'STRING',
        type: DataTypes.ENUM('STRING', 'NUMBER', 'EMAIL', 'URL', 'DATE')
      },
      isrequired: {
        allowNull: false,
        defaultValue: true,
        type: DataTypes.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(function() {
      migration.addIndex(
          'Settings',
          ['ckey'],
          { indexName: 'Key Config', indicesType: 'UNIQUE' }
        ).done(function() {
            migration.sequelize.query(
                "INSERT INTO `Settings` (`ckey`,`cval`,`label`,`typeData`) VALUES (?, ?, ?, ?)", null,
                { raw: true }, ['SITE_TITLE', 'MY WEB', 'Site Title', 'STRING']
            );
            done();
          });
    });
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("Settings").done(done);
  }
};