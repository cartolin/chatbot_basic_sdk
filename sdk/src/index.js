import "./style.css";

(function (window) {

    var config = window.MySDKConfig || {
        widgetUrl: "http://localhost:4200/"
    };

    function createBubble() {
        var bubble = document.createElement("div");
        bubble.id = "fc-bubble";
        bubble.className = "fc-bubble animate__animated animate__fadeIn";
        bubble.innerHTML = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve"><style>.st1{fill:#edf3fc}.st2{fill:#330d84}.st3{fill:#ffbe1b}.st10{fill:#5d8ef9}</style><path class="st1" d="M255.999 40.928c-118.778 0-215.071 96.294-215.071 215.074 0 118.776 96.292 215.068 215.071 215.068S471.07 374.778 471.07 256.002c0-118.78-96.293-215.074-215.071-215.074z"/><path class="st1" d="M255.999 1C115.391 1 1 115.392 1 256.002 1 396.609 115.391 511 255.999 511S511 396.609 511 256.002C511 115.392 396.607 1 255.999 1zm0 501.832c-136.103 0-246.83-110.728-246.83-246.83 0-136.104 110.727-246.833 246.83-246.833 136.102 0 246.832 110.729 246.832 246.833 0 136.102-110.73 246.83-246.832 246.83z"/><path class="st3" d="m178.665 119.318 2.386.598-2.386.598a39.02 39.02 0 0 0-28.369 28.374l-.601 2.383-.599-2.383a39.022 39.022 0 0 0-28.376-28.374l-2.377-.598 2.377-.598a39.029 39.029 0 0 0 28.376-28.369l.599-2.381.601 2.381a39.026 39.026 0 0 0 28.369 28.369z"/><path class="st10" d="m223.217 399.809 2.386.598-2.386.598a39.02 39.02 0 0 0-28.369 28.374l-.601 2.383-.599-2.383a39.022 39.022 0 0 0-28.376-28.374l-2.377-.598 2.377-.598a39.029 39.029 0 0 0 28.376-28.369l.599-2.381.601 2.381a39.03 39.03 0 0 0 28.369 28.369z"/><path class="st2" d="m440.518 307.009 2.033.51-2.033.508a33.25 33.25 0 0 0-24.172 24.176l-.511 2.029-.51-2.029a33.252 33.252 0 0 0-24.177-24.176l-2.025-.508 2.025-.51a33.25 33.25 0 0 0 24.177-24.173l.51-2.027.511 2.027a33.25 33.25 0 0 0 24.172 24.173z"/><path class="st10" d="M297.973 298.495H182.992c-12.883 0-23.323-10.442-23.323-23.327v-96.296h-22.057c-12.881 0-23.322 10.445-23.322 23.32v103.229c0 12.885 10.441 23.327 23.322 23.327l-14.3 56.635 80.911-56.635h114.981a23.22 23.22 0 0 0 14.622-5.158l-35.853-25.095z"/><path class="st2" d="m364.585 298.495 14.3 56.635-80.911-56.635H182.992c-12.883 0-23.323-10.442-23.323-23.327V171.939c0-12.875 10.441-23.32 23.323-23.32h181.593c12.881 0 23.322 10.445 23.322 23.32v103.229c0 12.886-10.441 23.327-23.322 23.327z"/><circle transform="rotate(-22.5 219.366 220.851)" class="st3" cx="219.376" cy="220.86" r="17.136"/><circle transform="rotate(-22.5 273.774 220.851)" class="st3" cx="273.787" cy="220.86" r="17.136"/><circle transform="rotate(-22.5 328.183 220.852)" class="st3" cx="328.198" cy="220.86" r="17.136"/><path class="st10" d="m267.223 365.981 1.323.333-1.323.331a21.712 21.712 0 0 0-15.793 15.794l-.332 1.323-.334-1.323a21.715 21.715 0 0 0-15.791-15.794l-1.324-.331 1.324-.333a21.715 21.715 0 0 0 15.791-15.789l.334-1.327.332 1.327a21.712 21.712 0 0 0 15.793 15.789z"/></svg>`;
        document.body.appendChild(bubble);
        return bubble;
    }

    function createChatContainer() {
        var container = document.createElement("div");
        container.id = "fc-chat-container";
        container.className = "fc-chat-container animate__animated";
        container.style.display = "none";
        container.innerHTML = `
        <iframe id="fc-chat-iframe" 
                src="${config.widgetUrl}" 
                frameborder="0" 
                style="width:100%; height:100%;">
        </iframe>
        `;
        document.body.appendChild(container);
        return container;
    }

    function toggleChat() {
        var container = document.getElementById("fc-chat-container");
        if (container.style.display === "none") {
            container.style.display = "block";
            container.classList.remove("animate__fadeOut");
            container.classList.add("animate__fadeIn");
        } else {
            container.classList.remove("animate__fadeIn");
            container.classList.add("animate__fadeOut");
            setTimeout(function () {
                container.style.display = "none";
                container.classList.remove("animate__fadeOut");
            }, 500);
        }
    }
    var bubble = createBubble();
    createChatContainer();

    bubble.addEventListener("click", toggleChat);

    window.addEventListener("message", function (event) {
        if (event.data && event.data.type === "CLOSE_WIDGET") {
            toggleChat();
        }
    });

    window.MySDK = {
        toggleChat: toggleChat
    };
})(window);
