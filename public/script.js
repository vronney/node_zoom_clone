const socket = io()
const videoGrid = document.getElementById('video-grid')
const myVideo = document.createElement('video')
myVideo.muted = true

let myVideoStream

const peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '3030'
})

const peers = {}
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    myVideoStream = stream
    addVideoStream(myVideo, stream)

    peer.on('call', (call) => {
        call.answer(stream); // Answer the call with an A/V stream.
        const video = document.createElement('video')
          call.on('stream', (userVideoStream) => {
            // Show stream in some video/canvas element.
            addVideoStream(video, userVideoStream)
        })
    })

    socket.on('user-connected', (userId) => {
        connectToNewUser(userId, stream)
    })

    // input value
    let text = $('input')
    // when enter is pressed send message
    $('html').keydown((e) => {
        if (e.which == 13 && text.val().length !== 0) {
            socket.emit('message', text.val())
            text.val('')
        }
    })

    socket.on('createMessage', message => {
        $('.messages').append(`<li class="message"><b>user</b><br/>${message}</li>`)
        scrollToButton()
    })
})


socket.on('user-disconnected', userId => {
    if (peers[userId]) {
        peers[userId].close()   
    }
})

peer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id)
})

const connectToNewUser = (userId, stream) => {
    const call = peer.call(userId, stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })
    call.on('close', () => {
        video.remove()
    })
    peers[userId] = call
}

const addVideoStream = (video, stream) => {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video)
}

const scrollToButton = () => {
    let d = $('.main__chat__window')
    d.scrollTop(d.prop("scrollHeight"))
}

// Mute video
const muteUnmute = () => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled
    if (enabled) {
        myVideoStream.getAudioTracks()[0].enabled = false
        setUnmuteButton()
    } else {
        setMuteButton()
        myVideoStream.getAudioTracks()[0].enabled = true
    }
}

const setMuteButton = () => {
    const html = `
    <i class="fas fa-microphone"></i>
    <span>Mute</span>`

    document.querySelector('.main__mute__button').innerHTML = html
}

const setUnmuteButton = () => {
    const html = `
    <i class="unmute fas fa-microphone-slash"></i>
    <span>Unmute</span>`

    document.querySelector('.main__mute__button').innerHTML = html
}

// Stop video
const playStop = () => {
    let enabled = myVideoStream.getVideoTracks()[0].enabled
    if (enabled) {
        setPlayVideo()
        myVideoStream.getVideoTracks()[0].enabled = false
    } else {
        setStopVideo()
        myVideoStream.getVideoTracks()[0].enabled = true
    }
}

const setStopVideo = () => {
    const html = `
    <i class="fas fa-video"></i>
    <span>Stop Video</span>`

    document.querySelector('.main__video__button').innerHTML = html
}

const setPlayVideo = () => {
    const html = `
    <i class="stop fas fa-video-slash"></i>
    <span>Play Video</span>`

    document.querySelector('.main__video__button').innerHTML = html
}