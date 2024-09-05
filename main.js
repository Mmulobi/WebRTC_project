const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const muteButton = document.getElementById('muteButton');
const videoButton = document.getElementById('videoButton');
const endCallButton = document.getElementById('endCallButton');
const status = document.getElementById('status');

let isMuted = false;
let isVideoOff = false;
let localStream;
let peerConnection;

//webRTC configuration
const serverConfig = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
const constraints = { video: true, audio: true };

// websocket signalling server
const socket = new WebSocket('ws://localhost:8080');

socket.onmessage = (message) => {
    const signal = JSON.parse(message.data);
    receiveSignal(signal);
};

// get local video stream and display it
navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
        localStream = stream;
        localVideo.srcObject = stream;
        setupPeerConnection();
    })
    .catch(error => {
        console.error('Error accessing media devices', error);
        
    });

function setupPeerConnection() {
    peerConnection = new RTCPeerConnection(serverConfig);

// Add local stream track to peer connection
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

// Handle the remote stream when it arrives
    peerConnection.ontrack = event => {
        remoteVideo.srcObject = event.streams[0];
    };

// handles ICE candidate events by sending them to the other peer
    peerConnection.onicecandidate = event => {
        if (event.candidate) {
            socket.send(JSON.stringify({ 'ice': event.candidate }));
        }
    };

// create an offer and set the local description
    peerConnection.createOffer()
        .then(offer => peerConnection.setLocalDescription(offer))
        .then(() => {
            socket.send(JSON.stringify({ 'offer': peerConnection.setLocalDescription }));
        })
        .catch(error => console.error('Error creating offer', error));
}

function receiveSignal(signal) {
    if (signal.offer) {
        peerConnection.setRemoteDescription(new RTCSessionDescription(signal.offer))
            .then(() => peerConnection.createAnswer())
            .then(answer => peerConnection.setLocalDescription(answer))
            .then(() => {
                socket.send(JSON.stringify({ 'answer': peerConnection.localDescription }));
            });
    } else if (signal.answer) {
        peerConnection.setRemoteDescription(new RTCSessionDescription(signal.answer));
    } else if (signal.ice) {
        peerConnection.addIceCandidate(new RTCIceCandidate(signal.ice));
    }
}

// mute/unmute the microphone
muteButton.addEventListener('click', () => {
    isMuted = !isMuted;
    localStream.getAudioTracks()[0].enabled = !isMuted;
    muteButton.textContent = isMuted ? 'Unmute' : 'Mute';
});

// Turn on/off the video
videoButton.addEventListener('click', () => {
    isVideoOff = !isVideoOff;
    localStream.getVideoTracks()[0].enabled = !isVideoOff;
    videoButton.textContent = isVideoOff ? 'Video On' : 'Video Off';
});

// end the call
endCallButton.addEventListener('click', () => {
    peerConnection.close();
    status.textContent = 'Call Ended';
});

// signal handling
function sendSignal(signal) {
    // simulate signaling 
    console.log('sending signal', signal);
}