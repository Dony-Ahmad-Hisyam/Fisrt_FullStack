import Pemohon from "../models/Pemohon.js";

//login
export const LoginP = async (req, res) => {
  const pemohon = await Pemohon.findOne({
    where: {
      email: req.body.email,
    },
  });
  const match = await Pemohon.findOne({
    where: {
      no_telp: req.body.no_telp,
    },
  });
  if (!pemohon) return res.status(404).json({ msg: "Pemohon Tidak Ditemukan" });
  if (!match) return res.status(400).json({ msg: "No Telpon Salah!" });
  req.session.pemohonId = pemohon.uuid;
  const uuid = pemohon.uuid;
  const nama = pemohon.nama;
  const email = pemohon.email;
  const alamat = pemohon.alamat;
  res.status(200).json({ uuid, nama, email, alamat });
};

//fungsi get admin login
export const MeP = async (req, res) => {
  if (!req.session.pemohonId) {
    return res.status(401).json({ msg: "Mohon Login ke akun Anda!!" });
  }
  const pemohon = await Pemohon.findOne({
    attributes: ["uuid", "nama", "email", "alamat"],
    where: {
      uuid: req.session.pemohonId,
    },
  });
  if (!pemohon) return res.status(404).json({ msg: "Pemohon Tidak Ditemukan" });
  res.status(200).json(pemohon);
};

//logout
export const LogoutP = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(err).json({ msg: "Tidak dapat Logout" });
    res.status(200).json({ msg: "Anda Telah Logout" });
  });
};
