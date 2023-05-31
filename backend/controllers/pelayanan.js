import Pelayanan from "../models/pelayanan.js";

export const getPelayanan = async (req, res) => {
  try {
    const response = await Pelayanan.findAll({
      attributes: ["id", "uuid", "nama", "deskripsi"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getPelayananById = async (req, res) => {
  try {
    const response = await Pelayanan.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500), json({ msg: error.message });
  }
};

export const createPelayanan = async (req, res) => {
  const { nama, deskripsi } = req.body;
  try {
    await Pelayanan.create({
      nama: nama,
      deskripsi: deskripsi,
    });
    res.status(201).json({ msg: "Berhasil Ditambahkan" });
  } catch (error) {
    res.status(400), json({ msg: error.message });
  }
};

export const updatePelayanan = async (req, res) => {
  const { nama, deskripsi } = req.body;
  try {
    const pelayanan = await Pelayanan.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!pelayanan) {
      return res.status(404).json({ msg: "Pelayanan tidak ditemukan" });
    }

    pelayanan.nama = nama;
    pelayanan.deskripsi = deskripsi;
    await pelayanan.save();

    res.status(200).json({ msg: "Berhasil Diperbarui" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deletePelayanan = async (req, res) => {
  try {
    const pelayanan = await Pelayanan.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!pelayanan) {
      return res.status(404).json({ msg: "Pelayanan tidak ditemukan" });
    }

    await pelayanan.destroy();

    res.status(200).json({ msg: "Berhasil Dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
