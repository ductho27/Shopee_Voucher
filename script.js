// Cấu hình thông số AccessTrade
const CONFIG = {
    TOKEN: "i5sn5-oDwBOtVzOUHVjJdwRe02aaoyy9", // Hãy dán mã Token dài dằng dặc của Thọ vào đây
    CAMPAIGN_ID: "4751584435713464237", // Mã số Thọ vừa lấy được trên thanh địa chỉ
    API_URL: "https://api.accesstrade.vn/v1/product_link/create",
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
        // Gọi API qua Proxy để tránh lỗi CORS
        const finalUrl = CONFIG.PROXY + encodeURIComponent(CONFIG.API_URL);
        
        const response = await fetch(finalUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${CONFIG.TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "campaign_id": CONFIG.CAMPAIGN_ID, // ĐÃ SỬA: Bỏ chữ .CONFIG bị thừa
                "urls": [originUrl],
                "utm_source": "team_duc_tho_web"
            })
        });

        const result = await response.json();

        if (result.success && result.data.success_link.length > 0) {
            const shortLink = result.data.success_link[0].short_link;
            
            // Hiển thị kết quả
            document.getElementById('affLink').innerText = shortLink;
            document.getElementById('openBtn').href = shortLink;
            document.getElementById('resultArea').style.display = 'block';
        } else {
            alert("Lỗi từ AccessTrade: " + (result.message || "Không tạo được link"));
        }
    } catch (error) {
        console.error("Lỗi hệ thống:", error);
        alert("Có lỗi kết nối. Thọ kiểm tra lại Token hoặc Proxy nhé!");
    } finally {
        generateBtn.innerText = "TẠO LINK MUA HÀNG";
        generateBtn.disabled = false;
    }
});

// Xử lý nút copy
document.getElementById('copyBtn').addEventListener('click', () => {
    const link = document.getElementById('affLink').innerText;
    navigator.clipboard.writeText(link).then(() => {
        alert("Đã copy link thành công!");
    });
});
