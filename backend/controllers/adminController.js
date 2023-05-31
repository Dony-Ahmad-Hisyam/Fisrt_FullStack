import Admin from "../models/adminModel.js";
import argon2 from "argon2";

export const getAdmin = async (req, res) => {
  try {
    const response = await Admin.findAll({
      attributes: ["uuid", "nama", "email"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getAdminById = async (req, res) => {
  try {
    const response = await Admin.findOne({
      attributes: ["uuid", "nama", "email"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createAdmin = async (req, res) => {
  const { nama, email, password, confPassword } = req.body;
  if (password != confPassword) return res.status(400).json({ msg: "password dan confirm password tidak cocok" });
  const hasPassword = await argon2.hash(password);
  try {
    await Admin.create({
      nama: nama,
      email: email,
      password: hasPassword,
    });
    res.status(201).json({ msg: "Registration Successfully created" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!admin) return res.status(404).json({ msg: "User Tidak Ditemukan" });
    const { nama, email, password, confPassword } = req.body;
    let hashPassword;
    if (password === "" || password === null) {
      hashPassword = admin.password;
    } else {
      hashPassword = await argon2.hash(password);
    }
    if (password != confPassword) return res.status(400).json({ msg: "password dan confirm password tidak cocok" });
    try {
      await Admin.update(
        {
          nama: nama,
          email: email,
          password: hashPassword,
        },
        {
          where: {
            id: admin.id,
          },
        }
      );
      res.status(200).json({ msg: "Admin Updated" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!admin) return res.status(404).json({ msg: "User Tidak Ditemukan" });
    try {
      await Admin.destroy({
        where: {
          id: admin.id,
        },
      });
      res.status(200).json({ msg: "Admin Deleted" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
