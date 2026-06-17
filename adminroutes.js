const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admincontroller");
const authMiddleware = require("../middleware/authmiddleware");
const upload = require("../middleware/uploadmiddleware");

// Login admin
router.get("/login", adminController.showLogin);
router.post("/login", adminController.loginAdmin);

// Dashboard admin
router.get("/dashboard", authMiddleware, adminController.showDashboard);

// Logout admin
router.get("/logout", adminController.logoutAdmin);

// Tambah wisata
router.get("/tambah", authMiddleware, adminController.showTambahForm);
router.post("/tambah", authMiddleware, upload.single("gambar"), adminController.tambahWisata);

// Edit wisata
router.get("/edit/:id", authMiddleware, adminController.showEditForm);
router.post("/edit/:id", authMiddleware, upload.single("gambar"), adminController.updateWisata);

// Hapus wisata
router.get("/hapus/:id", authMiddleware, adminController.hapusWisata);

module.exports = router;