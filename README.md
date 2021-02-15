# Plan of Action

- Initialize Node.js project
- Initialize first view
- Creat a zoom room id
- Add ability to view video
- Add ability to allow others to stream their video
- Add styling
- Ability to create messages
- Add mute button
- Add stop video button

## API

- [Express](https://expressjs.com/) -> Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

## Video Stream Peer-to-peer

- UUID -> universal unique identifier
- [Socket.io](https://socket.io/docs/v3/client-api/index.html) -> enables real-time communication, bidirectional and event-based communication
- WebRTC - (Web Real-Time Communication) is a technology which enables Web applications and sites to capture and optionally stream audio and/or video media, as well as to exchange arbitrary data between browsers without requiring an intermediary. The set of standards that comprise WebRTC makes it possible to share data and perform teleconferencing peer-to-peer, without requiring that the user install plug-ins or any other third-party software.
- [Peer.js](https://peerjs.com/) - wraps the browser's WebRTC implementation to provide a complete, configurable, and easy-to-use peer-to-peer connection API. Equipped with nothing but an ID, a peer can create a P2P data or media stream connection to a remote peer.