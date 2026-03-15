async function fetchArtworks() {
    const grid = document.getElementById('artworkGrid');
    try {
        const response = await fetch('/api/artworks');
        const result = await response.json();
        
        if (result.code === 200 && result.data.length > 0) {
            grid.innerHTML = result.data.map(art => `
                <a href="detail.html?id=${art.id}" class="art-card">
                    <div class="art-img-wrapper">
                        <img src="${art.image_url || 'https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?q=80&w=1000&auto=format&fit=crop'}" alt="${art.title}" loading="lazy">
                    </div>
                    <div class="art-card-content">
                        <h3>${art.title}</h3>
                        <p>${art.artist}</p>
                    </div>
                </a>
            `).join('');
        } else {
            grid.innerHTML = '<div class="loader">当前暂无艺术品展出。</div>';
        }
    } catch (error) {
        console.error('Fetch Error:', error);
        grid.innerHTML = '<div class="loader">获取数据失败，请稍后重试。</div>';
    }
}

document.addEventListener('DOMContentLoaded', fetchArtworks);
