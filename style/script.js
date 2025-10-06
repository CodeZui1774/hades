const starCount = window.innerWidth < 600 ? 80 : 200;
for (let i = 0; i < starCount; i++) {
    let star = document.createElement("div");
    star.className = "star";
    star.style.top = Math.random() * 100 + "vh";
    star.style.left = Math.random() * 100 + "vw";
    star.style.animationDuration = (1 + Math.random() * 2) + "s";
    star.style.opacity = Math.random();
    document.body.appendChild(star);
}

const lanternImages = [];
for (let i = 1; i <= 9; i++) lanternImages.push(`./style/img/lantern/ld (${i}).png`);

const messages = [
    { text: "Chúc em Trung Thu vui vẻ!", img: "./style/img/Anh (1).jpg" },
    { text: "Trung Thu này có quà chưa!", img: "./style/img/Anh (2).jpg" },
    { text: "Trung thu có muốn đi chơi cùng anh hông nè", img: "./style/img/Anh (3).jpg" },
    { text: "Trung Thu vui vẻ nha bé 💖🌙", img: "./style/img/Anh (4).jpg" },
    { text: "Em là món quà trung thu ý nghĩa nhất của anh 🏮", img: "./style/img/Anh (5).jpg" }, 
    { text: "Trung Thu này, có em là đủ ngọt hơn mọi loại bánh 🍰", img: "./style/img/Anh (6).jpg" }, 
    { text: "Chị Hằng xinh đẹp ơi, có muốn cùng cuội đi chơi không nè", img: "./style/img/Anh (7).jpg" }, 
    { text: "Anh sẽ là 'đèn hộ mệnh' dẫn em đi chơi nhé", img: "./style/img/Anh (8).jpg" }, 
    { text: "Em chính là chiếc lồng đèn đặc biệt nhất của anh", img: "./style/img/Anh (9).jpg" }, 
    { text: "Trung Thu này không cần nhiều, chỉ cần em thôi 😘", img: "https://i.pinimg.com/originals/81/66/c3/8166c341a2030a2a0d28a5a6e1bf961b.gif" }, 
    { text: "Em chính là điều ước của anh dưới trăng 🌌", img: "https://i.pinimg.com/originals/33/76/db/3376dbdfc1b6e8b71a2ea7353e4fc0f2.gif" }
];

function createShuffler(array) {
    let pool = [...array];
    let lastValue = null;

    function getNext() {
        if (pool.length === 0) pool = [...array];

        let filtered = pool.filter(item => item !== lastValue);
        if (filtered.length === 0) filtered = [...pool]; 

        const index = Math.floor(Math.random() * filtered.length);
        const value = filtered[index];
        pool.splice(pool.indexOf(value), 1);
        lastValue = value;
        return value;
    }

    return getNext;
}

const getRandomLanternImg = createShuffler(lanternImages);
const getRandomMessage = createShuffler(messages);

const lanternsContainer = document.getElementById("lanternsContainer");
let maxLanterns = window.innerWidth < 600 ? 15 : 30;
let lanternInterval = null;

function createLantern() {
    if (lanternsContainer.querySelectorAll(".lantern").length >= maxLanterns) return;

    let lantern = document.createElement("img");
    lantern.src = getRandomLanternImg(); 
    lantern.className = "lantern";

    let startX = Math.random() * 85; 
    lantern.style.left = startX + "vw";

    let driftX = (Math.random() - 0.5) * 50; 
    lantern.style.setProperty('--x', driftX + 'vw');

    let duration = 10 + Math.random() * 10;
    lantern.style.animationDuration = duration + "s";

    lantern.addEventListener("click", () => {
        let randomMsg = getRandomMessage(); 
        document.getElementById("popupText").innerText = randomMsg.text;
        document.getElementById("popupImg").src = randomMsg.img;
        document.getElementById("popup").classList.add("show");
        document.getElementById("overlay").classList.add("show");
    });

    lanternsContainer.appendChild(lantern);
    lantern.addEventListener("animationend", () => lantern.remove());
}

const song = document.getElementById("bgMusic");
document.getElementById("releaseBtn").addEventListener("click", () => {
    if (!lanternInterval) {
        song.currentTime = 57;
        song.play();
        lanternInterval = setInterval(() => {
            let count = 1 + Math.floor(Math.random() * 2);
            for (let i = 0; i < count; i++) createLantern();
        }, 1200);
        document.getElementById("releaseBtn").style.display = "none";
    }
});

function closePopup() {
    document.getElementById("popup").classList.remove("show");
    document.getElementById("overlay").classList.remove("show");
}
document.getElementById("overlay").addEventListener("click", closePopup);
