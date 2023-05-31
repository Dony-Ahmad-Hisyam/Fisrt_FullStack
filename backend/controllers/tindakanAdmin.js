import Pemohon from "../models/Pemohon.js";
import Petugas from "../models/petugas.js";
import Tindakan from "../models/tindakan.js";

export const getTindakanAdmin = async (req, res) => {
  try {
    const response = await Tindakan.findAll({
      attributes: ["id", "uuid", "PetugasId", "PermohonanId", "tanggal_Tindakan", "status", "keterangan"],
      include: [
        {
          model: Pemohon, // Ganti dengan nama model yang sesuai
          attributes: ["nama", "id"], // Kolom yang ingin ditampilkan dari model Pemohon
        },
        {
          model: Petugas, // Ganti dengan nama model yang sesuai
          attributes: ["nama", "id"], // Kolom yang ingin ditampilkan dari model Pelayanan
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getTindakanAdminById = async (req, res) => {
  try {
    const response = await Tindakan.findOne({
      attributes: ["id", "uuid", "PetugasId", "PermohonanId", "tanggal_Tindakan", "status", "keterangan"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createTindakanAdmin = async (req, res) => {
  const { PetugasId, PermohonanId, status, keterangan, tanggal_Tindakan } = req.body;
  try {
    await Tindakan.create({
      PetugasId: PetugasId,
      PermohonanId: PermohonanId,
      tanggal_Tindakan: tanggal_Tindakan,
      status: status,
      keterangan: keterangan,
    });
    res.status(201).json({ msg: "Berhasil Ditambahkan" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateTindakanAdmin = async (req, res) => {
  const { PetugasId, PermohonanId, status, keterangan, tanggal_Tindakan } = req.body;
  try {
    const tindakan = await Tindakan.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!tindakan) {
      return res.status(404).json({ msg: "Tindakan tidak ditemukan" });
    }

    tindakan.PetugasId = PetugasId;
    tindakan.PermohonanId = PermohonanId;
    tindakan.status = status;
    tindakan.keterangan = keterangan;
    tindakan.tanggal_Tindakan = tanggal_Tindakan;

    await tindakan.save();

    res.status(200).json({ msg: "Berhasil Diperbarui" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteTindakanAdmin = async (req, res) => {
  try {
    const tindakan = await Tindakan.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!tindakan) {
      return res.status(404).json({ msg: "Tindakan tidak ditemukan" });
    }
    await tindakan.destroy();

    res.status(200).json({ msg: "Berhasil Dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
