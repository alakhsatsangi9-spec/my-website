/* =========================
   MOBILE MENU
========================= */

function toggleMenu() {

    const nav = document.querySelector(".nav-links");

    nav.classList.toggle("active");

}



/* =========================
   DARK MODE
========================= */

const themeBtn = document.getElementById("theme-btn");

const savedTheme = localStorage.getItem("theme");


if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeBtn.textContent = "☀️";

}


themeBtn.addEventListener("click", function() {

    document.body.classList.toggle("dark");


    if (document.body.classList.contains("dark")) {

        themeBtn.textContent = "☀️";

        localStorage.setItem("theme", "dark");

        showToast("🌙 Dark mode ON");

    } else {

        themeBtn.textContent = "🌙";

        localStorage.setItem("theme", "light");

        showToast("☀️ Light mode ON");

    }

});



/* =========================
   FOCUS MODE
========================= */

const focusBtn = document.getElementById("focus-btn");


focusBtn.addEventListener("click", function() {

    document.body.classList.toggle("focus-mode");


    if (document.body.classList.contains("focus-mode")) {

        showToast("🎯 Focus mode ON");

    } else {

        showToast("🎯 Focus mode OFF");

    }

});



/* =========================
   SEARCH
========================= */

const searchInput =
    document.getElementById("chapter-search");

const clearSearch =
    document.getElementById("clear-search");

const chapters =
    document.querySelectorAll(".chapter");

const noResults =
    document.getElementById("no-results");


function searchChapters() {

    const query =
        searchInput.value.toLowerCase().trim();

    let found = false;


    chapters.forEach(function(chapter) {

        const chapterName =
            chapter.textContent.toLowerCase();


        if (chapterName.includes(query)) {

            chapter.style.display = "flex";

            found = true;

        } else {

            chapter.style.display = "none";

        }

    });


    if (found) {

        noResults.style.display = "none";

    } else {

        noResults.style.display = "block";

    }

}


searchInput.addEventListener(
    "input",
    searchChapters
);



clearSearch.addEventListener("click", function() {

    searchInput.value = "";

    chapters.forEach(function(chapter) {

        chapter.style.display = "flex";

    });

    noResults.style.display = "none";

    searchInput.focus();

});



/* =========================
   CHAPTER COMPLETE
========================= */

function completeChapter(button) {

    button.classList.toggle("active");


    const completed =
        button.classList.contains("active");


    localStorage.setItem(
        "chapter1Completed",
        completed
    );


    updateProgress();


    if (completed) {

        showToast("🎉 Chapter completed!");

    } else {

        showToast("Chapter marked incomplete");

    }

}


const completeButton =
    document.querySelector(".complete-btn");


if (
    localStorage.getItem("chapter1Completed")
    === "true"
) {

    completeButton.classList.add("active");

}


function updateProgress() {

    const completed =
        document.querySelectorAll(
            ".complete-btn.active"
        ).length;


    const total =
        document.querySelectorAll(
            ".complete-btn"
        ).length;


    let percentage = 0;


    if (total > 0) {

        percentage =
            Math.round(
                (completed / total) * 100
            );

    }


    document.getElementById(
        "progress-fill"
    ).style.width =
        percentage + "%";


    document.getElementById(
        "progress-text"
    ).textContent =
        percentage + "%";

}


updateProgress();



/* =========================
   FAVORITE / BOOKMARK
========================= */

function toggleFavorite(button) {

    button.classList.toggle("active");


    const saved =
        button.classList.contains("active");


    localStorage.setItem(
        "chapter1Favorite",
        saved
    );


    if (saved) {

        button.textContent = "★";

        showToast("⭐ Chapter bookmarked");

    } else {

        button.textContent = "☆";

        showToast("Bookmark removed");

    }

}


const favoriteButton =
    document.querySelector(".favorite-btn");


if (
    localStorage.getItem("chapter1Favorite")
    === "true"
) {

    favoriteButton.classList.add("active");

    favoriteButton.textContent = "★";

}



/* =========================
   STUDY TIMER
========================= */

let timeLeft = 25 * 60;

let timer = null;

let running = false;


const timerDisplay =
    document.getElementById("timer-display");

const timerStatus =
    document.getElementById("timer-status");


function updateTimer() {

    const minutes =
        Math.floor(timeLeft / 60);


    const seconds =
        timeLeft % 60;


    timerDisplay.textContent =
        String(minutes).padStart(2, "0")
        + ":"
        + String(seconds).padStart(2, "0");

}



function startTimer() {

    if (running) return;


    running = true;


    timerStatus.textContent =
        "🔥 Focus — keep studying";


    timer =
        setInterval(function() {


            if (timeLeft > 0) {

                timeLeft--;

                updateTimer();

            } else {

                clearInterval(timer);

                running = false;


                timerStatus.textContent =
                    "🎉 Time's up! Take a break.";


                showToast(
                    "⏰ Timer finished!"
                );


                alert(
                    "⏰ Study timer finished! Take a short break."
                );

            }

        }, 1000);

}



function pauseTimer() {

    clearInterval(timer);

    running = false;

    timerStatus.textContent =
        "⏸ Timer paused";

}



function resetTimer() {

    clearInterval(timer);

    running = false;

    timeLeft = 25 * 60;

    updateTimer();

    timerStatus.textContent =
        "Ready to study";

}



document.getElementById(
    "start-timer"
).addEventListener(
    "click",
    startTimer
);


document.getElementById(
    "pause-timer"
).addEventListener(
    "click",
    pauseTimer
);


document.getElementById(
    "reset-timer"
).addEventListener(
    "click",
    resetTimer
);



document.querySelectorAll(
    ".timer-presets button"
).forEach(function(button) {


    button.addEventListener(
        "click",
        function() {

            clearInterval(timer);

            running = false;


            timeLeft =
                Number(button.dataset.time);


            updateTimer();


            timerStatus.textContent =
                "Ready to study";

        }
    );

});


updateTimer();



/* =========================
   SCROLL PROGRESS
========================= */

window.addEventListener(
    "scroll",
    function() {

        const scrollTop =
            document.documentElement.scrollTop;


        const height =
            document.documentElement.scrollHeight
            -
            document.documentElement.clientHeight;


        let percentage = 0;


        if (height > 0) {

            percentage =
                (scrollTop / height) * 100;

        }


        document.getElementById(
            "scroll-progress"
        ).style.width =
            percentage + "%";

    }
);



/* =========================
   BACK TO TOP
========================= */

const backTop =
    document.getElementById("back-top");


window.addEventListener(
    "scroll",
    function() {

        if (window.scrollY > 500) {

            backTop.style.display = "block";

        } else {

            backTop.style.display = "none";

        }

    }
);


backTop.addEventListener(
    "click",
    function() {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);



/* =========================
   NAVBAR EFFECT
========================= */

window.addEventListener(
    "scroll",
    function() {

        const navbar =
            document.querySelector(".navbar");


        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }
);



/* =========================
   TOAST
========================= */

let toastTimer;


function showToast(message) {

    const toast =
        document.getElementById("toast");


    toast.textContent = message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(function() {

            toast.classList.remove("show");

        }, 2200);

}



/* =========================
   KEYBOARD SHORTCUTS
========================= */

document.addEventListener(
    "keydown",
    function(event) {


        /* CTRL + K = SEARCH */

        if (
            (event.ctrlKey || event.metaKey)
            &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            searchInput.focus();

        }


        /* SPACE = TIMER */

        if (
            event.code === "Space"
            &&
            document.activeElement.tagName !== "INPUT"
            &&
            document.activeElement.tagName !== "TEXTAREA"
        ) {

            event.preventDefault();


            if (running) {

                pauseTimer();

            } else {

                startTimer();

            }

        }

    }
);