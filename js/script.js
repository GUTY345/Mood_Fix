const moodSelect = document.getElementById('mood');
const findMovieButton = document.getElementById('find-movie');
const resultDiv = document.getElementById('result');
const pageLoader = document.getElementById('page-loader');
const searchLoader = document.getElementById('search-loader');
const API_KEY = '8780539acdbe989d089b37099edc3962';
const BASE_URL = 'https://api.themoviedb.org/3';

const moodToGenre = {
    happy: 35,
    sad: 18,
    excited: 28,
    chill: 16,
    romantic: 10749,
    scared: 27,
    adventurous: 12,
    funny: 35
};


window.addEventListener('load', () => {
    setTimeout(() => {
        pageLoader.classList.add('hidden');
    }, 1000);
});

findMovieButton.addEventListener('click', async() => {
    const genreId = moodToGenre[moodSelect.value];
    if (!genreId) return;


    searchLoader.style.display = 'flex';
    resultDiv.innerHTML = '';

    try {
        const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=th&sort_by=popularity.desc`);
        const movies = (await res.json()).results.slice(0, 50);

        resultDiv.innerHTML = movies.map(movie => `
            <div class="movie-card">
                <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <p>${movie.overview?.slice(0, 100) || 'ไม่มีคำอธิบาย'}...</p>
                <a href="https://www.themoviedb.org/movie/${movie.id}" target="_blank" class="movie-button">ดูเพิ่มเติม</a>
            </div>
        `).join('');
        resultDiv.classList.add('show');
    } catch (error) {
        console.error('Error:', error);
        resultDiv.innerHTML = '<p style="color: red;">เกิดข้อผิดพลาด</p>';
    } finally {
        searchLoader.style.display = 'none';
    }
});