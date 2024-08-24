from flask import Flask, request
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins='*')

# Socket Events
@socketio.on('connect')
def handle_connect():
    print("Client Connected")

@socketio.on('disconnect')
def handle_disconnect():
    print('Client Disconnected')

@socketio.on('message')
def handle_message(data):
    username = data.get('username')
    message = data.get('text')
    print(f'{username} sent message: {message}')  
    socketio.emit('message', {'username': username, 'text': message})  

if __name__ == '__main__':
    socketio.run(app)