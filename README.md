# WebRTC Video Call Application

This is a simple WebRTC-based video call application that allows two users to establish a peer-to-peer video and audio connection. The project includes a signaling server using WebSocket for peer connection signaling and a basic user interface to establish video calls.

## Features
- Real-time video and audio streaming using WebRTC.
- A simple WebSocket-based signaling server for connection setup.
- Supports both local and remote media streams.
- Allows users to connect via a local network or the internet.
- Built with JavaScript, HTML, and CSS.

## Prerequisites
Before you begin, ensure you have met the following requirements:
- **Node.js**: Make sure Node.js is installed on your local machine.
- **Web Browser**: Use a modern browser that supports WebRTC (e.g., Chrome, Firefox, Safari).
- **Mobile Device** (optional): If you don't have a camera or microphone on your PC, you can use your phone to test the project.

## Installation

Follow these steps to get the project up and running:

1. Clone the repository:
   ```bash
   git clone https://github.com/Mmulobi/webrtc-video-call.git
   cd webrtc-video-call

Install the required Node.js dependencies:

bash
Copy code
npm install ws
Start the signaling server:

bash
Copy code
node server.js
Serve the application:

Use a local server to serve the application. You can use the Live Server extension in VS Code or http-server:
bash
Copy code
npx http-server
Access the project:

Open the project in your browser:

bash
Copy code
http://localhost:8080
If testing on a mobile device, ensure your phone and PC are on the same Wi-Fi network, and access the app using your local IP address:

bash
Copy code
http://<your-local-ip>:8080
Usage
Open the application in your web browser.
Allow access to your camera and microphone when prompted.
Once the signaling is established, the video streams from the local and remote users will appear on the screen.
Key Functions
navigator.mediaDevices.getUserMedia(): Requests access to the user's camera and microphone.
RTCPeerConnection: Manages the WebRTC connection between peers.
WebSocket: Used to exchange signaling data (SDP and ICE candidates) between peers.
Project Structure
graphql
Copy code
.
├── index.html          # Main HTML file
├── main.js             # JavaScript file for WebRTC logic
├── server.js           # WebSocket signaling server
├── style.css           # Basic UI styles
└── videos/             # Directory for prerecorded videos (if applicable)
Known Issues
The application may not work properly on HTTP due to modern browser security restrictions. To access the camera and microphone, run the application using localhost or an HTTPS server.
If your PC does not have a camera or microphone, consider using your mobile device as described in the usage instructions.
Future Improvements
Add a more polished user interface.
Set up a proper signaling server (currently simulated).
Add support for more than two users in a video call (multi-peer connection).
Implement ICE candidate sharing for better connection quality.
Contributing
If you want to contribute to this project, feel free to fork the repository and submit a pull request. Any contributions are welcome!

License
This project is licensed under the MIT License. See the LICENSE file for more information.



## Contact

If you have any questions or suggestions, feel free to contact me at mosesmutush7@gmail.com