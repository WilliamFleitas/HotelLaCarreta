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
      email: {
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
        type: DataTypes.ENUM("partial", "complete"),
        allowNull: false,
      },
      roomId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      payAmount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    },
    {
      // Other model options go here
    }
  );
};
