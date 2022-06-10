const chatArea = document.querySelector('.chat-area')
const chatForm = document.querySelector('.chat-form');
const chatInput = document.querySelector('.chat-form input')
const socket = io();

// get username and room from qs library
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

// join chatroom
socket.emit('joinRoom', { username, room })
console.log(username, room)

socket.on('message', message => {
    console.log(message)
    outputMessage(message);
})

chatForm.addEventListener('submit', e => {
    e.preventDefault();

    const msg = chatInput.value;

    console.log(msg);

    // emit msg on server 
    socket.emit('chatMessage', msg);
    chatInput.value = "";
    chatInput.focus();
})

// outputMessage to DOM
function outputMessage(message,img) {
    const messageContainer = document.createElement('li');
    messageContainer.classList.add('width-fit', 'flex', 'align-center', 'padding-10');
    messageContainer.innerHTML = `
        <div class="message-body flex align-end">
            <img src="../img/avatar-you.png" class="avatar radius-round">
            <div class="message flex flex-column position-relative">
                <p class="message-text">${message.username},${message.text}</p>
                <div class="flex width-fit justify-between align-center">
                    <span id="message-time">${message.time}</span>
                   <!-- <img src="../img/message-ok.png" alt="" id="chat-status"> -->
                </div>
            </div>
        </div>
        <div class="controls flex align-center margin-auto flex-wrap justify-center">
            <button id="message-response-btn"
                class="radius-round tab border-none outline-none bg-none margin-left10 position-relative"></button>
            <button id="message-copy-btn"
                class="radius-round tab border-none outline-none bg-none margin-left10 position-relative"></button>
            <button id="message-delete-btn"
                class="radius-round tab border-none outline-none bg-none margin-left10 position-relative"></button>
            <button id="message-forward-btn"
                class="radius-round tab border-none outline-none bg-none margin-left10 position-relative"></button>
        </div>
            `;
    if (this === image_input) {
        console.log('Button Pressed')
    }
    chatArea.appendChild(messageContainer);
    chatArea.scrollTop = chatArea.scrollHeight;
}