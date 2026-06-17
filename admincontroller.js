const path = require("path");
const fs = require("fs");
const Wisata = require("../models/wisata");

exports.showLogin = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/admin/login.html"));
};

exports.loginAdmin = (req, res) => {
  const { username, password } = req.body;

  if (username === "SelaraAdmin" && password === "Wisata06Oke") {
    req.session.admin = { username };
    return res.redirect("/admin/dashboard");
  }

  res.send("Username atau password salah");
};

exports.showDashboard = async (req, res) => {
  try {
    const dataWisata = await Wisata.find().sort({ _id: -1 });
    res.render("admin/dashboard", { wisata: dataWisata });
  } catch (error) {
    console.log(error);
    res.send("Gagal menampilkan dashboard");
  }
};

exports.logoutAdmin = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/admin/login");
  });
};

exports.showTambahForm = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/admin/tambah.html"));
};

exports.tambahWisata = async (req, res) => {
  try {
    const { nama, lokasi, kategori, harga, deskripsi, mapsLink } = req.body;

    if (!req.file) {
      return res.send("Gambar wajib diupload");
    }

    const wisataBaru = new Wisata({
      nama,
      lokasi,
      kategori,
      harga: harga || "",
      deskripsi,
      mapsLink: mapsLink || "",
      gambar: "/uploads/" + req.file.filename,
      like: 0
    });

    await wisataBaru.save();
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error);
    res.send("Terjadi kesalahan saat menyimpan data");
  }
};

// TAMPILKAN FORM EDIT
exports.showEditForm = async (req, res) => {
  try {
    const dataWisata = await Wisata.findById(req.params.id);

    if (!dataWisata) {
      return res.send("Data wisata tidak ditemukan");
    }

    res.render("admin/edit", { wisata: dataWisata });
  } catch (error) {
    console.log(error);
    res.send("Gagal menampilkan form edit");
  }
};

// UPDATE DATA WISATA
exports.updateWisata = async (req, res) => {
  try {
    const { nama, lokasi, kategori, harga, deskripsi, mapsLink } = req.body;

    const wisata = await Wisata.findById(req.params.id);

    if (!wisata) {
      return res.send("Data wisata tidak ditemukan");
    }

    wisata.nama = nama;
    wisata.lokasi = lokasi;
    wisata.kategori = kategori;
    wisata.harga = harga || "";
    wisata.deskripsi = deskripsi;
    wisata.mapsLink = mapsLink || "";

    if (req.file) {
      // hapus gambar lama jika ada
      if (wisata.gambar) {
        const oldImagePath = path.join(__dirname, "../public", wisata.gambar);

        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.log("Gagal menghapus gambar lama:", err.message);
          }
        });
      }

      wisata.gambar = "/uploads/" + req.file.filename;
    }

    await wisata.save();
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error);
    res.send("Gagal memperbarui data wisata");
  }
};

// HAPUS DATA WISATA
exports.hapusWisata = async (req, res) => {
  try {
    const wisata = await Wisata.findById(req.params.id);

    if (!wisata) {
      return res.send("Data wisata tidak ditemukan");
    }

    // hapus file gambar
    if (wisata.gambar) {
      const imagePath = path.join(__dirname, "../public", wisata.gambar);

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.log("Gagal menghapus gambar:", err.message);
        }
      });
    }

    await Wisata.findByIdAndDelete(req.params.id);

    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error);
    res.send("Gagal menghapus data wisata");
  }
};