// Cấu hình thông số AccessTrade
const CONFIG = {
    TOKEN: "MÃ_TOKEN_CỦA_BẠN",
    CAMPAIGN_ID: "MÃ_CHIẾN_DỊCH_CỦA_BẠN",
    API_URL: "https://api.accesstrade.vn/v1/product_link/create",
    // Proxy để tránh lỗi CORS khi chạy trên trình duyệt
    PROXY: "https://api.allorigins.win/raw?url=" 
};

document.getElementById('generateBtn').addEventListener('click', async () => {
    const originUrl = document.getElementById('originUrl').value.trim();
    const generateBtn = document.getElementById('generateBtn');
    
    if (!originUrl) {
        alert("Thọ ơi, dán cái link sản phẩm vào đã nhé!");
        return;
    }

    // Đổi trạng thái nút khi đang xử lý
    generateBtn.innerText = "ĐANG TẠO LINK...";
    generateBtn.disabled = true;

    try {
        const response = await fetch(CONFIG.PROXY + encodeURIComponent(CONFIG.API_URL), {
            method: 'POST',
            headers: {
                'Authorization': `Token ${CONFIG.TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "campaign_id": CONFIG.CONFIG.CAMPAIGN_ID,
                "urls": [originUrl],
                "utm_source": "team_duc_tho_web"
            })
        });

        const result = await response.json();

        if (result.success) {
            const shortLink = result.data.success_link[0].short_link;
            
            // Hiển thị kết quả
            document.getElementById('affLink').innerText = shortLink;
            document.getElementById('openBtn').href = shortLink;
            document.getElementById('resultArea').style.display = 'block';
        } else {
            alert("Lỗi từ AccessTrade: " + result.message);
        }
    } catch (error) {
        console.error("Lỗi hệ thống:", error);
        alert("Có lỗi kết nối. Hãy đảm bảo Token và Campaign ID chính xác.");
    } finally {
        generateBtn.innerText = "TẠO LINK MUA HÀNG";
        generateBtn.disabled = false;
    }
});

// Xử lý nút copy
document.getElementById('copyBtn').addEventListener('click', () => {
    const link = document.getElementById('affLink').innerText;
    navigator.clipboard.writeText(link).then(() => {
        alert("Đã copy link! Gửi cho bạn bè ngay thôi.");
    });
});
