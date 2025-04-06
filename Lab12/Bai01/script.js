document.addEventListener('DOMContentLoaded', function () {
    const playBtn = document.getElementById('playMusicBtn');
    const music = document.getElementById('bg-music');
    let isPlaying = false;

    if (playBtn && music) {
        playBtn.addEventListener('click', () => {
            if (!isPlaying) {
                music.play().then(() => {
                    playBtn.textContent = '🔇 Tắt nhạc';
                    isPlaying = true;
                }).catch(err => {
                    console.warn('Không thể phát nhạc:', err);
                });
            } else {
                music.pause();
                music.currentTime = 0;
                playBtn.textContent = '🎵 Bật nhạc nền';
                isPlaying = false;
            }
        });
    }
});
