import { DataTypes } from "sequelize";

module.exports = (sequelize: any) => {
  sequelize.define(
    "Reservation",
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      entryDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      exitDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      payment: {
        type: DataTypes.ENUM("none", "partial", "complete"),
        allowNull: false,
      },
      payAmount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      reservedDays: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      },
      adults: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      childs: {
        type: DataTypes.INTEGER,
      },
      nightQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      dni: {
        type: DataTypes.STRING,
      }
    },
    {
      // Other model options go here
    }
  );
};
