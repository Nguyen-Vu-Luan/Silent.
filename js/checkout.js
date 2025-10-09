document.addEventListener("DOMContentLoaded", () => {
    // --- BIẾN TOÀN CỤC ---
    const roomRadios = document.querySelectorAll('input[name="room_type"]');
    const steppers = document.querySelectorAll(".radio-item .quantity-stepper");
    const nightStepper = document.querySelector("#nights").closest(".quantity-stepper");
    const totalDisplay = document.querySelector(".price-total strong");
    const summaryCard = document.querySelector(".booking-summary-card");
    const summaryTitle = summaryCard.querySelector("h4");
    const summaryImg = document.createElement("img");
    summaryCard.prepend(summaryImg);

    // Biến cho phần cập nhật ngày trong thẻ tóm tắt
    const checkinDateInput = document.querySelector("#check-in-date");
    const nightsInput = document.querySelector("#nights");
    const summaryCheckinDisplay = document.querySelector(".booking-summary-card .date-info:first-child strong");
    const summaryCheckoutDisplay = document.querySelector(".booking-summary-card .date-info:last-child strong");
    const summaryDurationDisplay = document.querySelector(".booking-summary-card .duration-info span");

    const prices = {
        retreat: { value: 699000, img: "./asset/tron-decor-thiet-ke-nha-pho-180m2-dong-nai-lau-1-3.jpg" },
        heaven: { value: 1099000, img: "./asset/Screenshot 2025-10-03 at 18.30.52.png" },
        tranquil: { value: 4999000, img: "./asset/tron-decor-thiet-ke-nha-pho-180m2-dong-nai-tret-11.jpg" }
    };

    // --- CÁC HÀM CẬP NHẬT GIAO DIỆN ---

    function formatVND(value) {
        return value.toLocaleString("vi-VN") + " VND";
    }

    /**
     * HÀM MỚI: Cập nhật ngày check-in, check-out và số đêm trong thẻ tóm tắt
     */
    function updateBookingDates() {
        if (!checkinDateInput.value) return; // Không làm gì nếu ngày trống

        const nights = parseInt(nightsInput.value) || 1;

        // Tạo đối tượng Date từ giá trị của input (YYYY-MM-DD)
        // Thêm 'T00:00:00' để xử lý múi giờ một cách nhất quán
        const checkinDate = new Date(checkinDateInput.value + 'T00:00:00');

        // Tính ngày checkout bằng cách cộng thêm số đêm
        const checkoutDate = new Date(checkinDate);
        checkoutDate.setDate(checkinDate.getDate() + nights);

        // Tùy chọn định dạng ngày: "Thứ, ngày tháng" (VD: "Fri, 10 Oct")
        const dateOptions = { weekday: 'short', day: 'numeric', month: 'short' };

        // Cập nhật nội dung text trong HTML
        summaryCheckinDisplay.textContent = checkinDate.toLocaleDateString('en-GB', dateOptions);
        summaryCheckoutDisplay.textContent = checkoutDate.toLocaleDateString('en-GB', dateOptions);
        summaryDurationDisplay.textContent = `${nights} night${nights > 1 ? "s" : ""}`;
    }

    function updateSummary(selectedRoom) {
        const { img } = prices[selectedRoom];
        summaryCard.classList.add("fade-out");

        setTimeout(() => {
            summaryImg.src = img;
            summaryTitle.textContent = selectedRoom.charAt(0).toUpperCase() + selectedRoom.slice(1);
            summaryCard.classList.remove("fade-out");
            summaryCard.classList.add("fade-in");
        }, 300);
    }

    function updateBreakdown() {
        const selectedRadio = document.querySelector('input[name="room_type"]:checked');
        if (!selectedRadio) return;

        const selectedRoom = selectedRadio.value;
        const roomQty = parseInt(selectedRadio.closest(".radio-item").querySelector(".quantity-stepper input").value);
        const nights = parseInt(nightsInput.value);

        document.querySelector(".room-item span").textContent = `x${roomQty} ${selectedRoom} room`;
        document.querySelector(".night-item span").textContent = `x${nights} night${nights > 1 ? "s" : ""}`;
    }

    function updateTotal() {
        const selectedRadio = document.querySelector('input[name="room_type"]:checked');
        if (!selectedRadio) {
            totalDisplay.textContent = formatVND(0);
            return;
        }

        const roomType = selectedRadio.value;
        const roomPrice = prices[roomType].value;
        const roomQty = parseInt(selectedRadio.closest(".radio-item").querySelector(".quantity-stepper input").value);
        const nights = parseInt(nightsInput.value) || 1;
        const total = roomPrice * roomQty * nights;

        totalDisplay.textContent = formatVND(total);
    }

    /**
     * CẬP NHẬT: Gọi thêm hàm updateBookingDates() để tất cả được làm mới cùng lúc
     */
    function refreshAll() {
        updateBreakdown();
        updateTotal();
        updateBookingDates();
    }

    // --- GÁN SỰ KIỆN (EVENT LISTENERS) ---

    // Sự kiện cho ô nhập ngày check-in
    checkinDateInput.addEventListener("change", refreshAll);

    // Sự kiện cho các nút tăng/giảm số lượng phòng
    steppers.forEach((stepper) => {
        const minus = stepper.querySelector("button:first-child");
        const plus = stepper.querySelector("button:last-child");
        const input = stepper.querySelector("input");
        const radio = stepper.closest('.radio-item').querySelector('input[type="radio"]');

        minus.addEventListener("click", () => {
            let value = parseInt(input.value);
            if (value > 0) {
                input.value = value - 1;
                if (radio.checked) {
                    refreshAll();
                }
            }
        });

        plus.addEventListener("click", () => {
            let value = parseInt(input.value);
            input.value = value + 1;
            if (!radio.checked) {
                radio.checked = true;
                radio.dispatchEvent(new Event('change'));
            } else {
                refreshAll();
            }
        });
    });

    // Sự kiện cho nút tăng/giảm số đêm
    const nMinus = nightStepper.querySelector("button:first-child");
    const nPlus = nightStepper.querySelector("button:last-child");

    nMinus.addEventListener("click", () => {
        let val = parseInt(nightsInput.value);
        if (val > 1) {
            nightsInput.value = val - 1;
            refreshAll();
        }
    });

    nPlus.addEventListener("click", () => {
        let val = parseInt(nightsInput.value);
        nightsInput.value = val + 1;
        refreshAll();
    });

    // Sự kiện khi thay đổi lựa chọn phòng
    roomRadios.forEach((radio) => {
        radio.addEventListener("change", () => {
            if (radio.checked) {
                steppers.forEach(s => {
                    if (s.closest('.radio-item').querySelector('input[type="radio"]') !== radio) {
                        s.querySelector('input').value = 0;
                    }
                });

                const currentQtyInput = radio.closest('.radio-item').querySelector('.quantity-stepper input');
                if (parseInt(currentQtyInput.value) === 0) {
                    currentQtyInput.value = 1;
                }

                updateSummary(radio.value);
                refreshAll();
            }
        });
    });

    // --- KHỞI TẠO TRẠNG THÁI BAN ĐẦU ---
    // Gọi refreshAll() khi trang tải xong để hiển thị đúng thông tin ban đầu
    const initialSelectedRoom = document.querySelector('input[name="room_type"]:checked');
    if (initialSelectedRoom) {
        updateSummary(initialSelectedRoom.value);
        refreshAll();
    }

    // --- CODE CHO CÁC TÍNH NĂNG KHÁC ---

    // Nút Scroll-to-top
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Nút "Book" và hiển thị/ẩn phần checkout
    const bookButtons = document.querySelectorAll(".btn-book");
    const checkoutSection = document.querySelector(".checkout-section");
    const closeBtn = document.querySelector(".close-checkout");

    if (bookButtons.length > 0 && checkoutSection) {
        bookButtons.forEach(button => {
            button.addEventListener("click", e => {
                e.preventDefault();
                checkoutSection.classList.add("show");
                checkoutSection.scrollIntoView({ behavior: "smooth" });
            });
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            checkoutSection.classList.remove("show");
        });
    }
});