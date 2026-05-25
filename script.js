// Данные о видеофрагментах (в реальном проекте — из БД/API)
const clipsData = [
    {
        id: 1,
        title: "Дружба в школе",
        genre: "comedy",
        level: "a1",
        //videoUrl: "videos/clip1.mp4",
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
const clipVideo = document.getElementById('clipVideo');
const transcriptList = document.getElementById('transcriptList');
const player = document.getElementById('player');
const closePlayerBtn = document.getElementById('closePlayer');
const startButton = document.getElementById('startButton');
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
        card.addEventListener('click', () => openPlayer(clip));
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

// Открытие плеера с выбранным фрагментом
function openPlayer(clip) {
    clipVideo.src = clip.videoUrl;
    clipVideo.load();
    renderTranscript(clip.transcript);
    player.classList.remove('hidden');
}

// Отображение транскрипции и перевода
function renderTranscript(lines) {
    transcriptList.innerHTML = '';
    lines.forEach(line => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="original">${line.original}</span><br>
            <span class="translation">${line.translation}</span>
        `;
        transcriptList.appendChild(li);
    });
}

// Закрытие плеера
function closePlayer() {
    clipVideo.src = '';
    player.classList.add('hidden');
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
startButton.addEventListener('click', () => {
    document.querySelector('.hero').scrollIntoView({ behavior: 'smooth' });
});

closePlayerBtn.addEventListener('click', closePlayer);

levelFilter.addEventListener('change', filterClips);
genreFilter.addEventListener('change', filterClips);

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    renderClips();
});
