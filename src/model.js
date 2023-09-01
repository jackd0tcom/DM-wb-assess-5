import { DataTypes, Model } from "sequelize";
import util from "util";
import connectToDB from "./db.js";

const db = await connectToDB("postgresql:///animals");

export class Human extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }

  getFullName() {
    const first = this.fname;
    const last = this.lname;
    return first + " " + last;
  }
}

// const newGuy = Human.create({
//   humanId: 1,
//   fname: "al",
//   lname: "capone",
//   email: "lalalal@email.com",
// });

// const hisName = newGuy.getFullName();
// console.log();

Human.init(
  {
    humanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    fname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
  },
  {
    modelName: "human",
    sequelize: db,
  }
);

export class Animal extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Animal.init(
  {
    animalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthYear: {
      type: DataTypes.INTEGER,
    },
  },
  {
    modelName: "animal",
    sequelize: db,
  }
);

Human.hasMany(Animal, { foreignKey: "humanId" });
Animal.belongsTo(Human, { foreignKey: "humanId" });

export default db;
