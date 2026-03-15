async function fetchArtworkDetail() {
    const content = document.getElementById('detailContent');
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (!id) {
        content.innerHTML = '<div class="loader">未找到艺术品 ID。</div>';
        return;
    }

    try {
        const response = await fetch(`/api/artworks/${id}`);
        const result = await response.json();

        if (result.code === 200 && result.data) {
            const art = result.data;
            content.innerHTML = `
                <div class="detail-img-container">
                    <img src="${art.image_url || 'https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?q=80&w=1000&auto=format&fit=crop'}" class="detail-img" alt="${art.title}">
                </div>
                <div class="detail-info">
                    <h2>${art.title}</h2>
                    <div class="detail-artist">${art.artist}</div>
                    <p class="detail-desc">${art.description || '这件艺术品暂时没有详细描述。'}</p>
                    <div style="margin-top: 40px; font-size: 0.8rem; color: #999;">
                        收藏时间: ${new Date(art.create_time).toLocaleDateString()}
                    </div>
                </div>
            `;
        } else {
            content.innerHTML = `<div class="loader">${result.message || '未找到该艺术品详情。'}</div>`;
        }
    } catch (error) {
        console.error('Detail Fetch Error:', error);
        content.innerHTML = '<div class="loader">获取详情失败，请检查后端连接。</div>';
    }
}

document.addEventListener('DOMContentLoaded', fetchArtworkDetail);
