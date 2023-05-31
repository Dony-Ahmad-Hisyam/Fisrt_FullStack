import Admin from "../models/adminModel.js";
import argon2 from "argon2";

//login
export const Login = async (req, res) => {
  const admin = await Admin.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!admin) return res.status(404).json({ msg: "Admin Tidak Ditemukan" });
  const match = await argon2.verify(admin.password, req.body.password);
  if (!match) return res.status(400).json({ msg: "Password Salah!" });
  req.session.adminId = admin.uuid;
  const uuid = admin.uuid;
  const nama = admin.nama;
  const email = admin.email;
  res.status(200).json({ uuid, nama, email });
};

//fungsi get admin login
export const Me = async (req, res) => {
  if (!req.session.adminId) {
    return res.status(401).json({ msg: "Mohon Login ke akun Anda!!" });
  }
  const admin = await Admin.findOne({
    attributes: ["uuid", "nama", "email"],
    where: {
      uuid: req.session.adminId,
    },
  });
  if (!admin) return res.status(404).json({ msg: "User Tidak Ditemukan" });
  res.status(200).json(admin);
};

//logout
export const Logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(err).json({ msg: "Tidak dapat Logout" });
    res.status(200).json({ msg: "Anda Telah Logout" });
  });
};
