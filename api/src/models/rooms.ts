import { DataTypes } from "sequelize";
// name es habitacion nombre, descripcion es "aca va una descript", preDescription es "habitacion premium con cama tamañoking", roomZone es "Moderna o rustica", capacity es la capacidad maxima de personas, room_feature es "caracteristicas de la habitacion", bathroom_feature es caracteristicas del baño, room services es servicio a la habitacion. MIRAR EL FIGMA EN MODO VISTA DEKSTOP, Detalles de habitacion
module.exports = (sequelize: any) => {
  sequelize.define(
    "Room",
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
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      preDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      capacity: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      roomZone: {
        type: DataTypes.ENUM("Rustica", "Moderna"),
        allowNull: false
      },
      room_features: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      bathroom_features: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      room_services: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
