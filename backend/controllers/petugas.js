import Petugas from "../models/petugas.js";

export const getPetugas = async (req, res) => {
  try {
    const response = await Petugas.findAll({
      attributes: ["id", "uuid", "nama", "jabatan"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getPetugasById = async (req, res) => {
  try {
    const response = await Petugas.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createPetugas = async (req, res) => {
  const { nama, jabatan } = req.body;
  try {
    await Petugas.create({
      nama: nama,
      jabatan: jabatan,
    });
    res.status(201).json({ msg: "Berhasil Ditambahkan" });
  } catch (error) {}
};

export const updatePetugas = async (req, res) => {
  const { nama, jabatan } = req.body;
  try {
    const petugas = await Petugas.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!petugas) {
      return res.status(404).json({ msg: "Petugas tidak ditemukan" });
    }

    petugas.nama = nama;
    petugas.jabatan = jabatan;
    await petugas.save();

    res.status(200).json({ msg: "Berhasil Diperbarui" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deletePetugas = async (req, res) => {
  try {
    const petugas = await Petugas.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!petugas) {
      return res.status(404).json({ msg: "Petugas tidak ditemukan" });
    }

    await petugas.destroy();

    res.status(200).json({ msg: "Berhasil Dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
