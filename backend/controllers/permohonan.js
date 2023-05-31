import Pemohon from "../models/Pemohon.js";
import Pelayanan from "../models/pelayanan.js";
import Permohonan from "../models/permohonan.js";

export const getPermohonan = async (req, res) => {
  try {
    const response = await Permohonan.findAll({
      where: {
        pemohonId: req.pemohonId,
      },
      attributes: ["uuid", "pelayananId", "pemohonId", "tanggal_permohonan", "status", "keterangan"],
      include: [
        {
          model: Pelayanan, // Ganti dengan nama model yang sesuai
          attributes: ["nama"], // Kolom yang ingin ditampilkan dari model Pemohon
        },
        {
          model: Pemohon, // Ganti dengan nama model yang sesuai
          attributes: ["nama"], // Kolom yang ingin ditampilkan dari model Pemohon
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getPermohonanById = async (req, res) => {
  try {
    const response = await Permohonan.findOne({
      attributes: ["uuid", "pelayananId", "pemohonId", "tanggal_permohonan", "status", "keterangan"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500), json({ msg: error.message });
  }
};

export const createPermohonan = async (req, res) => {
  const { pelayananId, pemohonId, status, keterangan, tanggal_permohonan } = req.body;
  try {
    await Permohonan.create({
      pelayananId: pelayananId,
      pemohonId: pemohonId,
      tanggal_permohonan: tanggal_permohonan,
      status: status,
      keterangan: keterangan,
    });
    res.status(201).json({ msg: "Berhasil Ditambahkan" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updatePermohonan = async (req, res) => {
  const { pelayananId, pemohonId, status, keterangan } = req.body;
  try {
    const permohonan = await Permohonan.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!permohonan) {
      return res.status(404).json({ msg: "Permohonan tidak ditemukan" });
    }

    permohonan.pelayananId = pelayananId;
    permohonan.pemohonId = pemohonId;
    permohonan.status = status;
    permohonan.keterangan = keterangan;

    await permohonan.save();

    res.status(200).json({ msg: "Berhasil Diperbarui" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deletePermohonan = async (req, res) => {
  try {
    const permohonan = await Permohonan.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!pemohon) {
      return res.status(404).json({ msg: "Permohonan tidak ditemukan" });
    }

    await permohonan.destroy();

    res.status(200).json({ msg: "Berhasil Dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
