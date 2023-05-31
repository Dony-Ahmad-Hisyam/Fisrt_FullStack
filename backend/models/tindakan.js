import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Petugas from "./petugas.js";
import Pemohon from "./Pemohon.js";

const { DataTypes } = Sequelize;

const Tindakan = db.define(
  "Tindakan",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    tanggal_Tindakan: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    PermohonanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    PetugasId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    keterangan: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

// Establishing the relationship

Tindakan.belongsTo(Petugas, { foreignKey: "PetugasId" });
Tindakan.belongsTo(Pemohon, { foreignKey: "PermohonanId" });

(async () => {
  await db.sync();
})();

export default Tindakan;
