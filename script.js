// --- 1. XỬ LÝ ĐĂNG NHẬP ---
async function handleLogin() {
    const staffId = document.getElementById('staffIdInput').value.trim().toUpperCase();
    const msg = document.getElementById('login-msg');

    if (!staffId) {
        msg.innerText = "⚠️ Thọ ơi, hãy nhập mã nhân viên nhé!";
        return;
    }

    try {
        const response = await fetch('employees.json');
        const userList = await response.json();

        if (userList[staffId]) {
            const userName = userList[staffId];
            localStorage.setItem('userName', userName);
            localStorage.setItem('staffId', staffId);
            showMainContent(userName);
        } else {
            msg.innerText = "❌ Mã không tồn tại trong hệ thống!";
        }
    } catch (err) {
        msg.innerText = "⚠️ Lỗi kết nối (Check file employees.json)!";
    }
}

function showMainContent(name) {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    document.getElementById('welcome-msg').innerText = `Chào bạn, ${name}! 👋`;
}

function handleLogout() {
    localStorage.clear();
    location.reload();
}

// --- 2. XỬ LÝ TẠO LINK VÀ HIỂN THỊ HOÀN TIỀN ---
function generateLink() {
    const userLink = document.getElementById('rawLink').value.trim();
    const resultBox = document.getElementById('result-box');
    const finalLink = document.getElementById('finalLink');
    const cashDisplay = document.getElementById('cash-amount'); // Thêm dòng này
    const staffId = localStorage.getItem('staffId') || "THO_ADMIN";

    if(!userLink.includes('shopee.vn') && !userLink.includes('shope.ee')) {
        alert("Thọ ơi, dán đúng link Shopee mới được nhé!");
        return;
    }

    // --- LOGIC TỈ LỆ NGẪU NHIÊN ---
    const rand = Math.random() * 100; // Tạo số ngẫu nhiên từ 0 đến 100
    let refundAmount = "15.000"; // Mặc định là 15k

    if (rand <= 1) {
        refundAmount = "20.000"; // 1% tỉ lệ ra 20k
    } else if (rand <= 3) {
        refundAmount = "19.000"; // 2% tiếp theo ra 19k (1 + 2 = 3)
    } else if (rand <= 8) {
        refundAmount = "18.000"; // 5% tiếp theo ra 18k (3 + 5 = 8)
    } else if (rand <= 18) {
        refundAmount = "17.000"; // 10% tiếp theo ra 17k (8 + 10 = 18)
    } else if (rand <= 38) {
        refundAmount = "16.000"; // 20% tiếp theo ra 16k (18 + 20 = 38)
    } else {
        refundAmount = "15.000"; // Còn lại (~62%) là 15k
    }

    // Hiển thị số tiền đã quay trúng
    if (cashDisplay) {
        cashDisplay.innerText = refundAmount + "đ";
    }

    // Gắn link
    let separator = userLink.includes('?') ? '&' : '?';
    const affLink = `${userLink}${separator}utm_content=${staffId}&utm_source=LuckyRefund`;

    finalLink.href = affLink;
    resultBox.style.display = "block";
    resultBox.scrollIntoView({ behavior: 'smooth' });
}

// Kiểm tra phiên đăng nhập khi load trang
window.onload = () => {
    const savedName = localStorage.getItem('userName');
    if (savedName) showMainContent(savedName);
}
