const rooms = [
    {
        title: "retreat",
        img: "./asset/tron-decor-thiet-ke-nha-pho-180m2-dong-nai-lau-1-3.jpg",
        features: [
            '<i class="fas fa-user"></i> 2 Adults',
            '<i class="fas fa-ruler-combined"></i> 25.0 m²',
            '<i class="fas fa-mountain"></i> Balcony with village view',
            '<i class="fas fa-bed"></i> King Bed',
            '<i class="fas fa-shower"></i> Shower',
            '<i class="fas fa-tv"></i> TV',
            '<i class="fas fa-parking"></i> Parking',
            '<i class="fas fa-house-user"></i> Shared space',
            '<i class="fas fa-utensils"></i> Breakfast not included'
        ],
        price: "› 699.000 VND ‹"
    },
    {
        title: "heaven",
        img: "./asset/Screenshot 2025-10-03 at 18.30.52.png",
        features: [
            '<i class="fas fa-user"></i> 4 Adults',
            '<i class="fas fa-ruler-combined"></i> 28.0 m²',
            '<i class="fas fa-bed"></i> 2 Twin Bed',
            '<i class="fas fa-shower"></i> Shower',
            '<i class="fas fa-tv"></i> TV',
            '<i class="fas fa-parking"></i> Parking',
            '<i class="fas fa-house-user"></i> Shared space',
            '<i class="fas fa-utensils"></i> Breakfast not included'
        ],
        price: "› 1.099.000 VND ‹"
    },
    {
        title: "tranquil",
        img: "./asset/tron-decor-thiet-ke-nha-pho-180m2-dong-nai-tret-11.jpg",
        features: [
            '<i class="fas fa-user"></i> Maximum 16 Adults',
            '<i class="fas fa-ruler-combined"></i> Entire home',
            '<i class="fas fa-bed"></i> 2 King Room',
            '<i class="fas fa-bed"></i> 2 Twin Room',
            '<i class="fas fa-tv"></i> Living room',
            '<i class="fas fa-parking"></i> Parking',
            '<i class="fas fa-house-user"></i> Kitchen',
            '<i class="fas fa-utensils"></i> Breakfast not included'
        ],
        price: "› 4.999.000 VND ‹"
    }
];

let currentIndex = 0;

const roomTitle = document.getElementById("room-title");
const roomImage = document.getElementById("room-image");
const roomFeatures = document.getElementById("room-features");
const roomPrice = document.getElementById("room-price");

function showRoom(index) {
    const room = rooms[index];
    roomTitle.textContent = room.title;
    roomImage.src = room.img;
    roomFeatures.innerHTML = room.features.map(f => `<li>${f}</li>`).join("");
    roomPrice.textContent = room.price;
}

document.querySelector(".prev").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + rooms.length) % rooms.length;
    showRoom(currentIndex);
});

document.querySelector(".next").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % rooms.length;
    showRoom(currentIndex);
});

// load phòng đầu tiên
showRoom(currentIndex);
