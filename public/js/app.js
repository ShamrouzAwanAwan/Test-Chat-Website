const btn_open_subFooter = document.getElementById('input-sub-footer-btn');
const btn_chat_index = document.getElementById('chat-index-btn');
const aside = document.querySelector('.app aside');
const subFooter = document.querySelector('.chat-container footer');
const chat_area = document.querySelector('.chat-container .chat-area');
const close_index_btn = document.getElementById('close-index-btn');
const message_input = document.getElementById('message-input');
const end_call_btn = document.getElementById('call-end-btn')
const call_pop = document.querySelector('.camera-pop')
const call_audio_btn = document.getElementById('a-call-btn')
const call_video_btn = document.getElementById('v-call-btn')
const btn_camera_switch = document.getElementById('camera-switch-btn');
const btn__camera_flash = document.getElementById('camera-flash-btn');
const btn_call_mode_switch = document.getElementById('switch-video-btn')
const btn_call_mic_toggle = document.getElementById('call-mic-btn')
const btn_send_message = document.getElementById('send-message-btn')
const contact_name = document.getElementById('contact-name').innerText;
const message_send_swip = '';
const btn_close_file = document.querySelector('.select-file-pop #cencel-img-send')
const fileSelection_container = document.querySelector('.select-file-pop')
const mySong = document.getElementById("swip");

// const contact_avatar = `../img/avatar-you.png`;
const contact_avatar = `../img/avatar.jpg`; 
const video = document.getElementById('video');

let time;

function Activate_button() {
    if (this.classList.contains('active')) {
        this.classList.remove('active')
    }
    else {
        // if (this === call_video_btn) {
        //     startVideo();
        // }
        this.classList.add('active')        
    }
}
btn_open_subFooter.onclick = function open_index(){
    subFooter.classList.toggle('active');
}
function control(e) {
    if (e.keyCode === 45) {
        message_input.focus();
    }
    if (message_input.value === '') {
        if (e.keyCode === 73) {
            btn_chat_index.click();
        }
        if (e.keyCode === 79) {
            btn_open_subFooter.click();
        }
        if (call_pop.classList.contains('active')){
            if (e.keyCode === 27) {
                end_call_btn.click();
            }
        }
    }
    else {
        if (e.keyCode === 13) {
            send_message();
        }
    }
};
document.addEventListener('keyup', control);
function clock() {
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;

    if (h > 12) {
        h = h - 12;
    }
    time = h + ":" + m;
    text_time_stamp = time;
    setTimeout(clock, 1000);
}
clock();
function send_message() {
    // const message_structure = `
    // <li class="width-fit flex align-center padding-10">
    //     <div class="message-body flex align-end">
    //         <img src="` + contact_avatar +`" class="avatar radius-round">
    //         <div class="message flex flex-column position-relative">
    //             <p class="message-text">`+ message_input.value +`</p>
    //             <div class="flex width-fit justify-between align-center">
    //                 <span id="message-time">`+ time +`</span>
    //                 <img src="../img/message-ok.png" alt="" id="chat-status">
    //             </div>
    //         </div>
    //     </div>
    //     <div class="controls flex align-center margin-auto flex-wrap justify-center">
    //         <button id="message-response-btn"
    //             class="radius-round tab border-none outline-none bg-none margin-left10 position-relative"></button>
    //         <button id="message-copy-btn"
    //             class="radius-round tab border-none outline-none bg-none margin-left10 position-relative"></button>
    //         <button id="message-delete-btn"
    //             class="radius-round tab border-none outline-none bg-none margin-left10 position-relative"></button>
    //         <button id="message-forward-btn"
    //             class="radius-round tab border-none outline-none bg-none margin-left10 position-relative"></button>
    //     </div>
    // </li>`;
    // const message = document.createElement('li')
    // message.classList.add('width-fit')
    // message.classList.add('flex')
    // message.classList.add('align-center')
    // message.classList.add('padding-10')
    // message.innerHTML = message_structure
    // chat_area.appendChild(message)
    // message_input.value = '';
    // message_input.focus();
    // chat_area.scrollTop = chat_area.scrollHeight;
    // mySong.play();
}
function startVideo() {
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    )
    btn_call_mode_switch.classList.add('active')
    call_pop.classList.add('video-call')
}
// all_subfooter_btn.forEach((all_subfooter_btn, i) => {
//     all_subfooter_btn.addEventListener('click', Activate_button)
// })
function Make_Call() {
    call_pop.classList.add('active')
    if (this === call_video_btn) {
        startVideo()
        call_pop.classList.add('video-call')
    }
    else if(this === call_video_btn){
        //stopVideo()
        call_pop.classList.remove('active')
        call_pop.style.background = `url(../img/avatar.jpg)`;
    }
}
function switch_call_mode() {
    if (call_pop.classList.contains('active')) {
        if (call_pop.classList.contains('video-call')) {
            //stopVideo()
            call_pop.classList.remove('video-call')
            btn_call_mode_switch.classList.remove('active')        
        }
        else {
            startVideo()
        }
    }
}
function hang_call() {
    // stopVideo();
    btn_call_mode_switch.classList.remove('active')
    call_pop.classList.remove('video-call')
    call_pop.classList.remove('active')
}
function open_close_index() {
    if (this === btn_chat_index) {
        if (aside.classList.contains('active')) {
            aside.classList.remove('active')
            btn_chat_index.classList.remove('active')
        }
        else {
            aside.classList.add('active')
            btn_chat_index.classList.add('active')
        }
    }
    else if (this === close_index_btn) {
        btn_chat_index.classList.remove('active')
        aside.classList.remove('active')
    }
}
btn_open_subFooter.addEventListener('click', Activate_button)
btn_chat_index.addEventListener('click', Activate_button)
btn_camera_switch.addEventListener('click', Activate_button)
btn__camera_flash.addEventListener('click', Activate_button)

close_index_btn.addEventListener('click', open_close_index);
btn_chat_index.addEventListener('click', open_close_index);

call_audio_btn.addEventListener('click', Make_Call)
call_video_btn.addEventListener('click', Make_Call)
end_call_btn.addEventListener('click', hang_call)

btn_call_mode_switch.addEventListener('click', switch_call_mode)
btn_call_mic_toggle.addEventListener('click', Activate_button)
btn_send_message.addEventListener('click', () => {
    if (message_input.value != '') {
        send_message();
    }
    else {
        message_input.focus();
    }
})    
title.innerHTML = contact_name;

btn_close_file.onclick = function () {
    fileSelection_container.classList.remove('active');
}


const image_input = document.querySelector('#send-photo-select-btn')
let img;
image_input.addEventListener('change', function () {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        var img = reader.result;
        document.querySelector('#img-popper').style.backgroundImage = `url(${img})`
        fileSelection_container.classList.add('active')
    })
    reader.readAsDataURL(this.files[0])
})