// === PRELOADER ===
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) preloader.style.display = "none";
});

// === WELCOME POPUP ===
window.addEventListener("DOMContentLoaded", () => {
  const welcome = document.getElementById("welcomePopup");
  if (welcome) {
    setTimeout(() => {
      welcome.style.display = "none";
    }, 3000);
  }
});

// === DARK MODE TOGGLE ===
document.getElementById("darkModeToggle")?.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
});

// === HAMBURGER MENU ===
document.getElementById("menu-toggle")?.addEventListener("click", () => {
  document.getElementById("main-nav")?.classList.toggle("active");
});

// === FILTER + SEARCH ===
function filterMenu() {
  const filter = document.getElementById("filterSelect")?.value.toLowerCase();
  const search = document.getElementById("searchInput")?.value.toLowerCase();
  const items = document.querySelectorAll(".menu-item");

  items.forEach((item) => {
    const rasa = item.getAttribute("data-rasa");
    const harga = parseInt(item.getAttribute("data-harga"));
    const nama = item.querySelector("h3").textContent.toLowerCase();

    let cocok = false;
    if (filter === "all") cocok = true;
    else if (filter === "manis" && rasa === "manis") cocok = true;
    else if (filter === "buah" && rasa === "buah") cocok = true;
    else if (filter === "mint" && rasa === "mint") cocok = true;
    else if (filter === "mahal" && harga > 33000) cocok = true;
    else if (filter === "murah" && harga <= 33000) cocok = true;

    item.style.display = cocok && nama.includes(search) ? "block" : "none";
  });
}

document.getElementById("filterSelect")?.addEventListener("change", filterMenu);
document.getElementById("searchInput")?.addEventListener("input", filterMenu);

// === KERANJANG BELANJA (SIMPAN & HAPUS) ===
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const cartList = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

function renderCart() {
  cartList.innerHTML = "";
  let total = 0;

  cartItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item.name + " - Rp " + item.price.toLocaleString();

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.className = "hapus-btn";
    delBtn.onclick = () => {
      cartItems.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      renderCart();
    };

    li.appendChild(delBtn);
    cartList.appendChild(li);
    total += item.price;
  });

  cartTotal.textContent = "Total: Rp " + total.toLocaleString();
  cartCount.textContent = cartItems.length;
}

function updateCart(name, price) {
  cartItems.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cartItems));
  renderCart();
}

document.querySelectorAll(".add-to-cart").forEach((btn) => {
  btn.addEventListener("click", () => {
    const name = btn.getAttribute("data-name");
    const price = parseInt(btn.getAttribute("data-price"));
    updateCart(name, price);
  });
});

renderCart();

// === PEMBAYARAN ===
function prosesPembayaran(e) {
  e.preventDefault();
  alert("Terima kasih! Pembayaran Anda diterima.");
  localStorage.removeItem("cart");
  cartItems = [];
  renderCart();
  return false;
}

// === STAMPEL MEMBER ===
function addStamp() {
  const stamps = document.querySelectorAll(".stamp");
  for (let i = 0; i < stamps.length; i++) {
    if (!stamps[i].classList.contains("active")) {
      stamps[i].classList.add("active");
      break;
    }
  }
  if ([...stamps].every((s) => s.classList.contains("active"))) {
    document.getElementById("loyaltyMsg").textContent =
      "Selamat! Kamu mendapat 1 minuman gratis 🎉";
  }
}

// === ZOOM TO DETAIL ===
function zoom(url) {
  window.location.href = url;
}

// === SCROLL REVEAL ===
const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 }
);

revealEls.forEach((el) => observer.observe(el));
