import Pemohon from "../models/Pemohon.js";
import Permohonan from "../models/permohonan.js";
import Petugas from "../models/petugas.js";
import Tindakan from "../models/tindakan.js";

export const getTindakan = async (req, res) => {
  try {
    const response = await Tindakan.findAll({
      where: {
        pemohonId: req.id,
      },
      attributes: ["uuid", "PetugasId", "PermohonanId", "tanggal_Tindakan", "status", "keterangan"],
      include: [
        {
          model: Pemohon,
          attributes: ["nama", "id"],
        },
        {
          model: Petugas,
          attributes: ["nama"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: "Kosong" });
  }
};

export const getTindakanById = async (req, res) => {
  try {
    const response = await Tindakan.findOne({
      attributes: ["uuid", "petugasId", "PermohonanId", "tanggal_Tindakan", "status", "keterangan"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500), json({ msg: error.message });
  }
};

export const createTindakan = async (req, res) => {
  const { petugasId, PermohonanId, status, keterangan, tanggal_Tindakan } = req.body;
  try {
    await Tindakan.create({
      petugasId: petugasId,
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

export const updateTindakan = async (req, res) => {
  const { petugasId, PermohonanId, status, keterangan, tanggal_Tindakan } = req.body;
  try {
    const tindakan = await Tindakan.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!tindakan) {
      return res.status(404).json({ msg: "Tindakan tidak ditemukan" });
    }

    tindakan.petugasId = petugasId;
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

export const deleteTindakan = async (req, res) => {
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
