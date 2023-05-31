import Pemohon from "../models/Pemohon.js";

export const getPemohonAdmin = async (req, res) => {
  try {
    const response = await Pemohon.findAll({
      attributes: ["id", "uuid", "nama", "email", "alamat", "no_telp"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getPemohonAdminById = async (req, res) => {
  try {
    const response = await Pemohon.findOne({
      attributes: ["id", "uuid", "nama", "email", "alamat", "no_telp"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500), json({ msg: error.message });
  }
};

export const createPemohonAdmin = async (req, res) => {
  const { nama, email, alamat, no_telp, conNo_telp } = req.body;
  if (no_telp != conNo_telp) return res.status(400).json({ msg: "Nomor Telpon dan confirm Nomor Telpon tidak cocok!" });
  try {
    await Pemohon.create({
      nama: nama,
      email: email,
      alamat: alamat,
      no_telp: no_telp,
    });
    res.status(201).json({ msg: "Berhasil Ditambahkan" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updatePemohonAdmin = async (req, res) => {
  try {
    const pemohon = await Pemohon.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    const { nama, email, alamat, no_telp, conNo_telp } = req.body;
    if (!pemohon) {
      return res.status(404).json({ msg: "Pemohon tidak ditemukan" });
    }
    if (no_telp != conNo_telp) return res.status(400).json({ msg: "No Telpon dan confirm No Telpon tidak cocok" });

    pemohon.nama = nama;
    pemohon.email = email;
    pemohon.alamat = alamat;
    await pemohon.save();

    res.status(200).json({ msg: "Berhasil Diperbarui" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deletePemohonAdmin = async (req, res) => {
  try {
    const pemohon = await Pemohon.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!pemohon) {
      return res.status(404).json({ msg: "Pemohon tidak ditemukan" });
    }

    await pemohon.destroy();

    res.status(200).json({ msg: "Berhasil Dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
