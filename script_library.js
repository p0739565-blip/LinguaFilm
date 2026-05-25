// Данные о видеофрагментах (в реальном проекте — из БД/API)
const clipsData = [
    {
        id: 1,
        title: "Дружба в школе",
        genre: "comedy",
        level: "a1",
        videoUrl: "videos/clip1.mp4",
        thumbnail: "foto/clip1.png",
        transcript: [
            { original: "Hi, how are you?", translation: "Привет, как дела?" },
            { original: "I'm fine, thanks!", translation: "У меня всё хорошо, спасибо!" },
            { original: "Let's go to the park!", translation: "Пойдём в парк!" }
        ]
    },
    {
        id: 2,
        title: "Серьёзный разговор",
        genre: "drama",
        level: "b1",
        videoUrl: "videos/clip2.mp4",
        thumbnail: "foto/clip2.png",
        transcript: [
            { original: "I need to tell you something important.", translation: "Мне нужно сказать тебе что‑то важное." },
            { original: "Go ahead, I'm listening.", translation: "Говори, я слушаю." },
            { original: "It's not easy for me to say this.", translation: "Мне непросто это сказать." }
        ]
    },
    {
        id: 3,
        title: "Весёлые приключения",
        genre: "animation",
        level: "a2",
        videoUrl: "videos/clip3.mp4",
        thumbnail: "thumbnails/clip3.jpg",
        transcript: [
            { original: "Look at that big tree!", translation: "Посмотри на то большое дерево!" },
            { original: "Can we climb it?", translation: "Мы можем на него залезть?" },
            { original: "Sure, let's do it!", translation: "Конечно, давай!" }
        ]
    }
];

// DOM-элементы
const clipsContainer = document.getElementById('clipsContainer');
const levelFilter = document.getElementById('levelFilter');
const genreFilter = document.getElementById('genreFilter');

// Отображение фрагментов в библиотеке
function renderClips(filteredClips = clipsData) {
    clipsContainer.innerHTML = '';
    filteredClips.forEach(clip => {
        const card = document.createElement('div');
        card.className = 'clip-card';
        card.innerHTML = `
            <img src="${clip.thumbnail}" alt="${clip.title}">
            <div class="info">
                <h4>${clip.title}</h4>
                <p>Уровень: ${clip.level.toUpperCase()} | Жанр: ${getGenreName(clip.genre)}</p>
            </div>
        `;
        clipsContainer.appendChild(card);
    });
}

// Перевод названий жанров
function getGenreName(genre) {
    const genres = {
        comedy: 'Комедия',
        drama: 'Драма',
        animation: 'Мультфильм'
    };
    return genres[genre] || genre;
}

// Фильтрация фрагментов
function filterClips() {
    const level = levelFilter.value;
    const genre = genreFilter.value;

    const filtered = clipsData.filter(clip => {
        return (level === 'all' || clip.level === level) &&
               (genre === 'all' || clip.genre === genre);
    });

    renderClips(filtered);
}

// Обработчики событий
levelFilter.addEventListener('change', filterClips);
genreFilter.addEventListener('change', filterClips);

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    renderClips();
});
