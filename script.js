// HERO SLIDER
const heroImages = document.querySelectorAll(".hero-image");
let currentHero = 0;

if (heroImages.length > 0) {
  setInterval(() => {
    heroImages[currentHero].classList.remove("opacity-100");
    heroImages[currentHero].classList.add("opacity-0");

    currentHero = (currentHero + 1) % heroImages.length;

    heroImages[currentHero].classList.remove("opacity-0");
    heroImages[currentHero].classList.add("opacity-100");
  }, 3000);
}

// FILTER KATEGORI
const kategoriButtons = document.querySelectorAll(".kategori-btn");
const cards = document.querySelectorAll(".card-item");

kategoriButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const kategori = btn.dataset.kategori;

    kategoriButtons.forEach((b) => {
      b.classList.remove("bg-black", "text-white");
      b.classList.add("border", "border-gray-300");
    });

    btn.classList.add("bg-black", "text-white");

    cards.forEach((card) => {
      if (kategori === "all" || card.dataset.kategori === kategori) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// LIKE BUTTON
const likeButtons = document.querySelectorAll(".like-btn");

likeButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const id = button.dataset.id;

    try {
      const response = await fetch(`/like/${id}`, {
        method: "POST"
      });

      const result = await response.json();

      if (result.success) {
        const likeCount = button.closest(".card-item").querySelector(".like-count");
        likeCount.textContent = result.like;
        button.textContent = "♥";
      }
    } catch (error) {
      console.log("Gagal menambah like:", error);
    }
  });
});