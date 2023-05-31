import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Pelayanan from "./pelayanan.js";
import Pemohon from "./Pemohon.js";

const { DataTypes } = Sequelize;

const Permohonan = db.define(
  "Permohonan",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    tanggal_permohonan: {
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
    pelayananId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    pemohonId: {
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
Permohonan.belongsTo(Pelayanan, { foreignKey: "pelayananId" });
Permohonan.belongsTo(Pemohon, { foreignKey: "pemohonId" });

export default Permohonan;

// (async () => {
//   await db.sync();
// })();
