export default function generateRoomName() {
    return 'room-' + Math.random().toString(36).substr(2, 9); 
}



