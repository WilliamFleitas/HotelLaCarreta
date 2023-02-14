import { DataTypes } from "sequelize";
import { userType } from "../Typos";

module.exports = (sequelize: any) => {
  sequelize.define(
    "User",
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 4,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      privilege: {
        type: DataTypes.ENUM("none", "king"),
        defaultValue: "none"
      }
    },
    
    {
      timestamps: false,
      hooks: {
        beforeCreate: function(user: userType){

          
            user.username = user.username.toLowerCase();

            return user;

        }
    },
    },
    
  );
};
