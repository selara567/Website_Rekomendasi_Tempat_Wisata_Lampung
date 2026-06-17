const Wisata = require("../models/wisata");

// =====================
// HOME
// =====================
exports.showHome = async (req, res) => {
  try {
    const dataWisata = await Wisata.find().sort({ _id: -1 });

    const likedWisata = req.session.likedWisata || [];

    res.render("index", {
      wisata: dataWisata,
      likedWisata
    });
  } catch (error) {
    console.log(error);
    res.send("Gagal menampilkan halaman beranda");
  }
};


// =====================
// DETAIL
// =====================
exports.showDetail = async (req, res) => {
  try {
    const dataDetail = await Wisata.findById(req.params.id);

    if (!dataDetail) {
      return res.send("Data wisata tidak ditemukan");
    }

    const likedWisata = req.session.likedWisata || [];

    // cek apakah sudah dilike
    const isLiked = likedWisata.includes(dataDetail._id.toString());

    res.render("detail", {
      wisata: dataDetail,
      isLiked
    });

  } catch (error) {
    console.log(error);
    res.send("Gagal menampilkan detail wisata");
  }
};


// =====================
// LIKE / UNLIKE
// =====================
exports.likeWisata = async (req, res) => {
  try {
    const wisata = await Wisata.findById(req.params.id);

    if (!wisata) {
      return res.json({ success: false });
    }

    // pastikan session ada
    if (!req.session.likedWisata) {
      req.session.likedWisata = [];
    }

    const wisataId = req.params.id;
    const sudahLike = req.session.likedWisata.includes(wisataId);

    // =====================
    // UNLIKE
    // =====================
    if (sudahLike) {
      wisata.like = Math.max(0, wisata.like - 1);

      req.session.likedWisata = req.session.likedWisata.filter(
        id => id !== wisataId
      );

      await wisata.save();

      return res.json({
        success: true,
        liked: false,
        like: wisata.like
      });
    }

    // =====================
    // LIKE
    // =====================
    else {
      wisata.like += 1;

      req.session.likedWisata.push(wisataId);

      await wisata.save();

      return res.json({
        success: true,
        liked: true,
        like: wisata.like
      });
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};