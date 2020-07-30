import {addZero} from "./sopScript.js";

export  const videoPlayerInit = () => {

    const videoPlayer = document.querySelector('.video-player')
    const videoButtonPlay = document.querySelector('.video-button__play')
    const videoButtonStop = document.querySelector('.video-button__stop')
    const videoProgress = document.querySelector('.video-progress')
    const videoTimePassed = document.querySelector('.video-time__passed')
    const videoTimeTotal = document.querySelector('.video-time__total')
    const videoButtonSpeed = document.querySelector('.video-button__speed')
    const videoFullScreen = document.querySelector('.video-fullscreen')
    const videoVolume = document.querySelector('.video-volume')
    const volumeDown = document.querySelector('.fa-volume-down')
    const volumeUp = document.querySelector('.fa-volume-up')


    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause')
            videoButtonPlay.classList.add('fa-play')
        } else {
            videoButtonPlay.classList.add('fa-pause')
            videoButtonPlay.classList.remove('fa-play')
        }
    }

    const togglePlay = () => {

        if (videoPlayer.paused) {
                videoPlayer.play()
            } else videoPlayer.pause()
    }

    const stopPlay = () => {
        videoPlayer.pause()
        videoPlayer.currentTime = 0;
    }



    videoPlayer.addEventListener('click', togglePlay)
    videoButtonPlay.addEventListener('click', togglePlay)

    videoPlayer.addEventListener('play', toggleIcon)
    videoPlayer.addEventListener('pause', toggleIcon)

    videoButtonStop.addEventListener('click', stopPlay)

    videoButtonSpeed.addEventListener('click', () => {
        if (videoPlayer.playbackRate === 1) {
            videoPlayer.playbackRate = 1.5
        } else { videoPlayer.playbackRate = 1}
    })

    videoPlayer.addEventListener('dblclick', event => {
        let rect = event.target.getBoundingClientRect();
        let x = event.clientX - rect.left
        console.log(x);
        const duration = videoPlayer.duration
        const value = videoProgress.value
        if ( x > rect.width / 2 ) {
            videoPlayer.currentTime = ((value * duration) / 100) + 3
        } else {
            videoPlayer.currentTime = ((value * duration) / 100) -3
        }
    })

    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime
        const duration = videoPlayer.duration

        videoProgress.value = (currentTime/duration) * 100

        let minutePassed = Math.floor(currentTime / 60)
        let secondsPassed = Math.floor(currentTime % 60)

        let minuteTotal = Math.floor(duration / 60)
        let secondsTotal = Math.floor(duration % 60)

        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`
        videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`
    })

    videoProgress.addEventListener('change', () => {
        const duration = videoPlayer.duration
        const value = videoProgress.value

        videoPlayer.currentTime = (value * duration) / 100
    })

    videoFullScreen.addEventListener('click', () => {
        videoPlayer.requestFullscreen()
    })

    videoVolume.addEventListener('input', () => {
        videoPlayer.volume = videoVolume.value / 100
    })

    volumeDown.addEventListener('click', () => {
        videoPlayer.muted = !videoPlayer.muted;
        videoPlayer.muted ? videoVolume.value = 0 : videoVolume.value = videoPlayer.volume * 100
    })


    videoPlayer.volume = 0.5

    videoVolume.value = videoPlayer.volume * 100



}

