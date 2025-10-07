
(function() {
  emailjs.init("nlnHgZrj9phR4cGmN"); // 🔹 Thay bằng Public Key thật từ EmailJS Dashboard
})();

document.querySelector(".checkout-form").addEventListener("submit", async function(e) {
  e.preventDefault();

  const btn = document.querySelector(".submit-btn");
  btn.disabled = true;

  // 📦 Lấy dữ liệu từ form
  const guestName = document.getElementById("full-name").value.trim();
  const guestEmail = document.getElementById("email").value.trim();
  const roomType = document.querySelector('input[name="room_type"]:checked').value;
  const checkIn = document.getElementById("check-in-date").value;
  const nights = parseInt(document.getElementById("nights").value);
  const checkOut = new Date(new Date(checkIn).getTime() + nights * 86400000).toISOString().split("T")[0];
  const guest2 = document.getElementById("guest2").value.trim();
  const note = document.getElementById("note").value.trim() || "No note";

  const params = {
    guest_name: guestName,
    guest_email: guestEmail,
    room_type: roomType,
    check_in: checkIn,
    check_out: checkOut,
    guests: guest2 ? "2" : "1",
    note: note
  };

  try {
    // 📨 Gửi email đến admin
    await emailjs.send("service_ll2kbws", "template_admin_notice", params);

    // 📨 Gửi email xác nhận đến khách
    await emailjs.send("service_ll2kbws", "template_confirmation", params);

    // 🟢 Hiển thị màn hình thành công
    showReservationSuccess();

    // Reset form
    document.querySelector(".checkout-form").reset();
  } catch (err) {
    console.error("❌ Failed to send reservation:", err);
    alert("There was an error sending your reservation. Please try again later.");
  }

  btn.disabled = false;
});

// 🟢 Hiển thị màn hình thành công
function showReservationSuccess() {
  document.querySelector(".checkout-section").style.display = "none";
  const successScreen = document.getElementById("reservation-success");
  successScreen.classList.remove("hidden");
  setTimeout(() => successScreen.classList.add("active"), 50);
}

// 🔙 Nút quay lại
document.getElementById("back-home").addEventListener("click", () => {
  document.getElementById("reservation-success").classList.remove("active");
  setTimeout(() => {
    document.getElementById("reservation-success").classList.add("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 400);
});