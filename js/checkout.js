document.addEventListener("DOMContentLoaded", () => {
    const roomRadios = document.querySelectorAll('input[name="room_type"]');
    const steppers = document.querySelectorAll(".radio-item .quantity-stepper");
    const nightStepper = document.querySelector("#nights").closest(".quantity-stepper");
    const totalDisplay = document.querySelector(".price-total strong");
    const summaryCard = document.querySelector(".booking-summary-card");
    const summaryTitle = summaryCard.querySelector("h4");
    const summaryImg = document.createElement("img");
    summaryCard.prepend(summaryImg);

    const prices = {
        retreat: { value: 699000, img: "./asset/tron-decor-thiet-ke-nha-pho-180m2-dong-nai-lau-1-3.jpg" },
        heaven: { value: 1099000, img: "./asset/Screenshot 2025-10-03 at 18.30.52.png" },
        tranquil: { value: 4999000, img: "./asset/tron-decor-thiet-ke-nha-pho-180m2-dong-nai-tret-11.jpg" }
    };

    function formatVND(value) {
        return value.toLocaleString("vi-VN") + " VND";
    }

    function updateSummary(selectedRoom) {
        const { img } = prices[selectedRoom];
        summaryCard.classList.add("fade-out");

        setTimeout(() => {
            summaryImg.src = img;
            summaryTitle.textContent = selectedRoom;
            summaryCard.classList.remove("fade-out");
            summaryCard.classList.add("fade-in");
        }, 300);
    }

    function updateBreakdown() {
        const selectedRoom = document.querySelector('input[name="room_type"]:checked').value;
        const roomQty = parseInt(document.querySelector(`#${selectedRoom} `)
            .closest(".radio-item").querySelector(".quantity-stepper input").value);
        const nights = parseInt(document.querySelector("#nights").value);

        document.querySelector(".room-item span").textContent = `x${roomQty} ${selectedRoom} room`;
        document.querySelector(".night-item span").textContent = `x${nights} night${nights > 1 ? "s" : ""} `;
    }

    function updateTotal() {
        let total = 0;
        const nights = parseInt(document.querySelector("#nights").value) || 1;

        roomRadios.forEach((radio) => {
            const stepper = radio.closest(".radio-item").querySelector(".quantity-stepper input");
            const qty = parseInt(stepper.value);
            total += prices[radio.value].value * qty * nights;
        });

        totalDisplay.textContent = formatVND(total);
    }

    function refreshAll() {
        updateBreakdown();
        updateTotal();
    }

    // Stepper actions
    steppers.forEach((stepper) => {
        const minus = stepper.querySelector("button:first-child");
        const plus = stepper.querySelector("button:last-child");
        const input = stepper.querySelector("input");

        minus.addEventListener("click", () => {
            let value = parseInt(input.value);
            if (value > 0) input.value = value - 1;
            refreshAll();
        });

        plus.addEventListener("click", () => {
            let value = parseInt(input.value);
            input.value = value + 1;
            refreshAll();
        });
    });

    // Nights stepper
    const nMinus = nightStepper.querySelector("button:first-child");
    const nPlus = nightStepper.querySelector("button:last-child");
    const nInput = nightStepper.querySelector("input");

    nMinus.addEventListener("click", () => {
        let val = parseInt(nInput.value);
        if (val > 1) nInput.value = val - 1;
        refreshAll();
    });

    nPlus.addEventListener("click", () => {
        let val = parseInt(nInput.value);
        nInput.value = val + 1;
        refreshAll();
    });

    // Room selection change
    roomRadios.forEach((radio) => {
        radio.addEventListener("change", () => {
            updateSummary(radio.value);
            refreshAll();
        });
    });

    updateSummary(document.querySelector('input[name="room_type"]:checked').value);
    refreshAll();
});

document.addEventListener("DOMContentLoaded", () => {
  // Cuộn xuống slider khi nhấn BOOK NOW ở header
  const cta = document.querySelector(".cta[href='#room-slider']");
  const roomSlider = document.querySelector(".room-slider");
  const checkoutSection = document.querySelector(".checkout-section");

  if (cta && roomSlider) {
    cta.addEventListener("click", (e) => {
      e.preventDefault();
      roomSlider.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Hiện form checkout khi nhấn BOOK NOW trong slider
  const bookBtn = document.querySelector(".room-slider .btn-book");
  if (bookBtn && checkoutSection) {
    bookBtn.addEventListener("click", (e) => {
      e.preventDefault();
      checkoutSection.classList.add("show");
      checkoutSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // (Tuỳ chọn) nút đóng form
  const closeBtn = document.querySelector(".close-checkout");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      checkoutSection.classList.remove("show");
    });
  }

  const logo = document.querySelector(".logo[href='#home']");
  if (logo) {
    logo.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});

const scrollTopBtn = document.querySelector('.scroll-top');

// Hiện nút khi cuộn xuống
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

// Cuộn mượt về đầu trang khi click
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


