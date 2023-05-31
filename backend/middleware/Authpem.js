import Pemohon from "../models/Pemohon.js";

export const verifyPemohon = async (req, res, next) => {
  if (!req.session.pemohonId) {
    return res.status(401).json({ msg: "Mohon Login ke akun Anda!!" });
  }

  const pemohon = await Pemohon.findOne({
    where: {
      uuid: req.session.pemohonId,
    },
  });
  if (!pemohon) return res.status(404).json({ msg: "Admin Tidak Ditemukan" });
  req.pemohonId = pemohon.id;
  next();
};
