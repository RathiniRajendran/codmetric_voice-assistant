// ======================================
// VOICEFLOW AI
// PREMIUM SCRIPT
// ======================================

// --------------------------
// ELEMENTS
// --------------------------

const listenBtn = document.getElementById("listenBtn");
const userText = document.getElementById("userText");
const assistantText = document.getElementById("assistantText");
const confidenceText = document.getElementById("confidenceText");
const historyList = document.getElementById("historyList");
const themeToggle = document.getElementById("themeToggle");

// --------------------------
// TOAST NOTIFICATION
// --------------------------

function showToast(message) {

    const toast = document.createElement("div");

    toast.innerText = message;

    toast.style.position = "fixed";
    toast.style.bottom = "30px";
    toast.style.right = "30px";
    toast.style.padding = "12px 18px";
    toast.style.borderRadius = "12px";
    toast.style.background = "#4F46E5";
    toast.style.color = "#fff";
    toast.style.zIndex = "9999";
    toast.style.boxShadow =
        "0 10px 30px rgba(0,0,0,.15)";

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2500);
}

// --------------------------
// THEME
// --------------------------

const savedTheme =
    localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    if (themeToggle) {

        themeToggle.innerHTML =
            '<i class="fas fa-sun"></i>';
    }
}

themeToggle?.addEventListener("click", () => {

    document.body.classList.toggle(
        "dark-mode"
    );

    const dark =
        document.body.classList.contains(
            "dark-mode"
        );

    localStorage.setItem(
        "theme",
        dark ? "dark" : "light"
    );

    themeToggle.innerHTML = dark
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
});

// --------------------------
// FAQ
// --------------------------

document
    .querySelectorAll(".faq-item")
    .forEach(item => {

        const button =
            item.querySelector(
                ".faq-question"
            );

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".faq-item"
                    )
                    .forEach(faq => {

                        if (faq !== item) {

                            faq.classList.remove(
                                "active"
                            );
                        }
                    });

                item.classList.toggle(
                    "active"
                );
            }
        );
    });

// --------------------------
// COUNTERS
// --------------------------

const counters =
    document.querySelectorAll(
        ".counter"
    );

const counterObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const counter =
                        entry.target;

                    const target =
                        Number(
                            counter.dataset.target
                        );

                    let count = 0;

                    const speed =
                        target / 80;

                    const update = () => {

                        count += speed;

                        if (
                            count < target
                        ) {

                            counter.innerText =
                                Math.floor(
                                    count
                                );

                            requestAnimationFrame(
                                update
                            );

                        } else {

                            counter.innerText =
                                target;
                        }
                    };

                    update();

                    counterObserver.unobserve(
                        counter
                    );
                }
            });
        }
    );

counters.forEach(counter => {

    counterObserver.observe(
        counter
    );
});

// --------------------------
// SCROLL REVEAL
// --------------------------

const revealItems =
    document.querySelectorAll(
        ".feature-card,.smart-card,.use-card,.showcase-card,.testimonial,.stat-card,.status-card"
    );

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.style.opacity =
                        "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    revealObserver.unobserve(
                        entry.target
                    );
                }
            });
        },
        {
            threshold: 0.1
        }
    );

revealItems.forEach(item => {

    item.style.opacity = "0";

    item.style.transform =
        "translateY(40px)";

    item.style.transition =
        ".8s ease";

    revealObserver.observe(item);
});

// --------------------------
// SPEECH RECOGNITION
// --------------------------

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

let recognition;

if (SpeechRecognition) {

    recognition =
        new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

} else {

    assistantText.textContent =
        "Speech Recognition not supported.";
}

// --------------------------
// SPEAK FUNCTION
// --------------------------

function speak(message) {

    assistantText.textContent =
        message;

    const speech =
        new SpeechSynthesisUtterance(
            message
        );

    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;

    window.speechSynthesis.speak(
        speech
    );
}

// --------------------------
// GREETING
// --------------------------

function getGreeting() {

    const hour =
        new Date().getHours();

    if (hour < 12)
        return "Good morning";

    if (hour < 18)
        return "Good afternoon";

    return "Good evening";
}

// --------------------------
// JOKES
// --------------------------

const jokes = [

    "Why do programmers prefer dark mode? Because light attracts bugs.",

    "I would tell you a UDP joke but you might not get it.",

    "Why was the computer cold? It forgot to close its windows.",

    "There are 10 types of people. Those who understand binary and those who do not.",

    "Why do Java developers wear glasses? Because they don't C sharp."
];

// --------------------------
// PROCESS COMMAND
// --------------------------

function processCommand(command) {

    let response =
        "Sorry, I don't understand that command.";

    if (
        command.includes("hello") ||
        command.includes("hi")
    ) {

        response =
            `${getGreeting()}, how can I help you?`;
    }

    else if (
        command.includes("time")
    ) {

        response =
            `Current time is ${new Date().toLocaleTimeString()}`;
    }

    else if (
        command.includes("date")
    ) {

        response =
            `Today's date is ${new Date().toDateString()}`;
    }

    else if (
        command.includes("joke")
    ) {

        response =
            jokes[
            Math.floor(
                Math.random() *
                jokes.length
            )
            ];
    }

    else if (
        command.includes(
            "open google"
        )
    ) {

        window.open(
            "https://google.com",
            "_blank"
        );

        response =
            "Opening Google.";
    }

    else if (
        command.includes(
            "open youtube"
        )
    ) {

        window.open(
            "https://youtube.com",
            "_blank"
        );

        response =
            "Opening YouTube.";
    }

    else if (
        command.includes(
            "open github"
        )
    ) {

        window.open(
            "https://github.com",
            "_blank"
        );

        response =
            "Opening GitHub.";
    }

    else if (
        command.includes(
            "open gmail"
        )
    ) {

        window.open(
            "https://mail.google.com",
            "_blank"
        );

        response =
            "Opening Gmail.";
    }

    else if (
        command.includes(
            "open linkedin"
        )
    ) {

        window.open(
            "https://linkedin.com",
            "_blank"
        );

        response =
            "Opening LinkedIn.";
    }

    else if (
        command.includes(
            "open maps"
        )
    ) {

        window.open(
            "https://maps.google.com",
            "_blank"
        );

        response =
            "Opening Maps.";
    }

    else if (
        command.includes(
            "open chatgpt"
        )
    ) {

        window.open(
            "https://chatgpt.com",
            "_blank"
        );

        response =
            "Opening ChatGPT.";
    }

    else if (
        command.includes(
            "search for"
        )
    ) {

        const query =
            command.replace(
                "search for",
                ""
            );

        window.open(
            `https://www.google.com/search?q=${encodeURIComponent(query)}`,
            "_blank"
        );

        response =
            `Searching for ${query}`;
    }

    else if (
        command.includes(
            "help"
        )
    ) {

        response =
            "Try asking the time, date, joke, or open websites.";
    }

    speak(response);
}

// --------------------------
// COMMAND HISTORY
// --------------------------

function saveHistory(command) {

    let history =
        JSON.parse(
            localStorage.getItem(
                "voiceHistory"
            )
        ) || [];

    history.unshift(command);

    history =
        history.slice(0, 20);

    localStorage.setItem(
        "voiceHistory",
        JSON.stringify(history)
    );

    renderHistory();
}

function renderHistory() {

    if (!historyList)
        return;

    const history =
        JSON.parse(
            localStorage.getItem(
                "voiceHistory"
            )
        ) || [];

    if (
        history.length === 0
    ) {

        historyList.innerHTML =
            "<p>No commands recorded yet.</p>";

        return;
    }

    historyList.innerHTML = "";

    history.forEach(item => {

        const div =
            document.createElement(
                "div"
            );

        div.className =
            "history-item";

        div.innerHTML =
            `🎤 ${item}`;

        historyList.appendChild(
            div
        );
    });
}

// --------------------------
// LISTEN BUTTON
// --------------------------

listenBtn?.addEventListener(
    "click",
    () => {

        if (!recognition)
            return;

        recognition.start();

        listenBtn.classList.add(
            "listening"
        );

        assistantText.textContent =
            "Listening...";
    }
);

// --------------------------
// RECOGNITION RESULT
// --------------------------

recognition?.addEventListener(
    "result",
    e => {

        const transcript =
            e.results[0][0].transcript;

        const confidence =
            e.results[0][0].confidence;

        userText.textContent =
            transcript;

        confidenceText.textContent =
            `${Math.round(confidence * 100)}%`;

        saveHistory(transcript);

        processCommand(
            transcript.toLowerCase()
        );
    }
);

// --------------------------
// RECOGNITION END
// --------------------------

recognition?.addEventListener(
    "end",
    () => {

        listenBtn.classList.remove(
            "listening"
        );
    }
);

// --------------------------
// ERROR
// --------------------------

recognition?.addEventListener(
    "error",
    event => {

        assistantText.textContent =
            `Error: ${event.error}`;

        listenBtn.classList.remove(
            "listening"
        );
    }
);

// --------------------------
// SPACEBAR TO LISTEN
// ESC TO STOP SPEECH
// --------------------------

document.addEventListener(
    "keydown",
    e => {

        if (
            e.code === "Space"
        ) {

            e.preventDefault();

            recognition?.start();
        }

        if (
            e.code === "Escape"
        ) {

            speechSynthesis.cancel();

            showToast(
                "Speech stopped"
            );
        }
    }
);

// --------------------------
// NAVBAR EFFECT
// --------------------------

window.addEventListener(
    "scroll",
    () => {

        const navbar =
            document.querySelector(
                ".navbar"
            );

        if (
            window.scrollY > 20
        ) {

            navbar.style.boxShadow =
                "0 10px 30px rgba(0,0,0,.08)";
        }

        else {

            navbar.style.boxShadow =
                "none";
        }
    }
);

// --------------------------
// INIT
// --------------------------

window.addEventListener(
    "load",
    () => {

        renderHistory();

        setTimeout(() => {

            assistantText.textContent =
                `${getGreeting()}! Click the microphone and start speaking.`;

        }, 1000);

        showToast(
            "VoiceFlow AI Ready"
        );
    }
);