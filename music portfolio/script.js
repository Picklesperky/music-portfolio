document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navUL = document.querySelector('nav ul');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navUL.classList.toggle('active');
    });
})
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navUL.classList.remove('active');
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
    
    // Animated text effect
    const animatedText = document.querySelector('.animated-text');
    if (animatedText) {
        const text = animatedText.textContent;
        animatedText.textContent = '';
        
        for (let i = 0; i < text.length; i++) {
            setTimeout(() => {
                animatedText.textContent += text[i];
            }, i * 100);
        }
    }
    
    // Music Player Functionality
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.querySelector('.play-pause');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const progressBar = document.querySelector('.progress-bar');
    const currentTimeEl = document.querySelector('.current-time');
    const durationEl = document.querySelector('.duration');
    const tracks = document.querySelectorAll('.track');
    const albumArt = document.querySelector('.album-art img');
    const trackTitle = document.querySelector('.player-controls .track-info h3');
    const trackArtist = document.querySelector('.player-controls .track-info p');
    const vinylOverlay = document.querySelector('.vinyl-overlay');
    
    let currentTrack = 0;
    let isPlaying = false;
    
    // Track data
    const trackList = [
        {
            title: 'Cosmic Dreams',
            artist: 'NOVA',
            src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            image: 'https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1413&q=80',
            duration: '3:45'
        },
        {
            title: 'Neon Lights',
            artist: 'NOVA',
            src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
            image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            duration: '4:12'
        },
        {
            title: 'Midnight Drive',
            artist: 'NOVA',
            src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
            image: 'https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            duration: '5:30'
        },
        {
            title: 'Solar Flare',
            artist: 'NOVA',
            src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
            image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            duration: '6:18'
        }
    ];
    
    // Load track
    function loadTrack(index) {
        const track = trackList[index];
        audioPlayer.src = track.src;
        albumArt.src = track.image;
        trackTitle.textContent = track.title;
        trackArtist.textContent = track.artist;
        durationEl.textContent = track.duration;
        
        // Update active track in playlist
        tracks.forEach((trackEl, i) => {
            if (i === index) {
                trackEl.classList.add('active');
            } else {
                trackEl.classList.remove('active');
            }
        });
        
        // Play the track if player was playing
        if (isPlaying) {
            audioPlayer.play();
        }
    }
    
    // Play/Pause toggle
    function togglePlayPause() {
        if (isPlaying) {
            pauseTrack();
        } else {
            playTrack();
        }
    }
    
    function playTrack() {
        audioPlayer.play();
        isPlaying = true;
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        vinylOverlay.style.opacity = ' 1
    }