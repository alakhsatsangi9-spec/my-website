/* =========================
   MOBILE MENU
========================= */

function toggleMenu() {

    const nav = document.querySelector(".nav-links");

    if (nav) {
        nav.classList.toggle("active");
    }

}


/* =========================
   DARK MODE
========================= */

const themeBtn = document.getElementById("theme-btn");

const savedTheme = localStorage.getItem("theme");


if (savedTheme === "dark" && themeBtn) {

    document.body.classList.add("dark");

    themeBtn.textContent = "☀️";

}


if (themeBtn) {

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

}


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

    if (!searchInput) return;

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


    if (noResults) {

        if (found) {

            noResults.style.display = "none";

        } else {

            noResults.style.display = "block";

        }

    }

}


if (searchInput) {

    searchInput.addEventListener(
        "input",
        searchChapters
    );

}


if (clearSearch) {

    clearSearch.addEventListener(
        "click",
        function() {

            if (searchInput) {

                searchInput.value = "";

            }


            chapters.forEach(function(chapter) {

                chapter.style.display = "flex";

            });


            if (noResults) {

                noResults.style.display = "none";

            }


            if (searchInput) {

                searchInput.focus();

            }

        }
    );

}


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
    completeButton &&
    localStorage.getItem("chapter1Completed") === "true"
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


    const progressFill =
        document.getElementById("progress-fill");

    const progressText =
        document.getElementById("progress-text");


    if (progressFill) {

        progressFill.style.width =
            percentage + "%";

    }


    if (progressText) {

        progressText.textContent =
            percentage + "%";

    }

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
    favoriteButton &&
    localStorage.getItem("chapter1Favorite") === "true"
) {

    favoriteButton.classList.add("active");

    favoriteButton.textContent = "★";

}


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


        const scrollProgress =
            document.getElementById("scroll-progress");


        if (scrollProgress) {

            scrollProgress.style.width =
                percentage + "%";

        }

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

        if (!backTop) return;


        if (window.scrollY > 500) {

            backTop.style.display = "block";

        } else {

            backTop.style.display = "none";

        }

    }
);


if (backTop) {

    backTop.addEventListener(
        "click",
        function() {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =========================
   NAVBAR EFFECT
========================= */

window.addEventListener(
    "scroll",
    function() {

        const navbar =
            document.querySelector(".navbar");


        if (!navbar) return;


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


    if (!toast) return;


    toast.textContent = message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(
            function() {

                toast.classList.remove("show");

            },
            2200
        );

}


/* =========================
   KEYBOARD SHORTCUTS
   CTRL + K = SEARCH
========================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            (event.ctrlKey || event.metaKey)
            &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();


            if (searchInput) {

                searchInput.focus();

            }

        }

    }
);

/* ================= STORY READER ================= */

const storyParts = {

    /* ================= PART 1 ================= */

    1: `
        <p>बचपन कितना प्यारा होता है ना, बिल्कुल ऐसा कि जैसे मानसून में रुई की तरह या पहाड़ों पर बहते साफ और निर्मल पानी की तरह। वैसे तो बचपन की बहुत-सी बातें याद नहीं रहतीं, पर कुछ यादें ऐसी होती हैं जो हमारे दिमाग में, हमारे जीवन में, एक ऐसी अधखुली किताब की तरह हमेशा के लिए याद रह जाती हैं, जिसके याद आने से बचपन की बहुत सारी यादें हो जाती हैं और वो यादें अपने साथ समेटे हुए होती हैं थोड़ी-सी खुशी और थोड़े से गम।</p>

        <p>वैसे तो मुझे समय नहीं मिलता है, पर आज पता नहीं कैसे, कुछ लिखने का मन कर रहा है, कुछ यादें हमेशा के लिए संजोने का मन कर रहा है।</p>

        <p>हाँ, मैं अपना नाम तो बता दूँ। आपने मेरी इतनी सारी बातें सुन लीं, पर अभी तक मैंने अपना नाम आपको नहीं बताया। मेरा नाम वरुण है और पूरा नाम वरुण प्रकाश अग्रवाल है। दोस्त और घरवाले मुझको वीनू कहकर बुलाते हैं।</p>

        <p>इस कहानी का मुख्य किरदार, अरे क्या कहते हैं उसको अंग्रेजी में... वो मैं हूँ। ये जो मैंने थोड़ी देर का ब्रेक लिया, उससे ये मत समझना कि मुझे इंग्लिश नहीं आती। अरे भाई! सॉफ्टवेयर इंजीनियर हूँ। वो तो बस आपके मनोरंजन के लिए था।</p>

        <p>हाँ, तो मैं कहाँ पर था? इस कहानी में हीरोइन भी है, जिसको हिन्दी में नायिका कहते हैं। अरे! अब नाम मत पूछिएगा, क्योंकि ये Terms and Conditions के अंदर आता है कि कहानी का रहस्य बना रहना चाहिए। वरना कहानी में मजा कैसे आयेगा?</p>

        <p>अब तो आप समझ गए होंगे कि ये बचपन की कहानी के साथ-साथ प्यार की भी कहानी है। अब आप सोच रहे होंगे कि इसका नाम फिर रत्ना बज्रना क्यों रखा है। तो इसका जवाब ये है कि इस प्यार को मिलवाने में दद्दू का ही हाथ था। आप चिंता न कीजिए, इस कहानी में प्यार थोड़ा और Comedy ज्यादा है और Action, Suspense, Thriller थोड़ा-थोड़ा भी है।</p>

        <p>वैसे ये कहानी नहीं, सच्ची घटना पर आधारित भी नहीं, बल्कि सच्ची घटना ही है। इसलिए इस कहानी को महसूस कीजिए और समा जाइए इस कहानी में। इसी कहानी का एक किरदार बन जाइए, एक दर्शक की तरह।</p>

        <p>यूँ ही रिश्ते बन जाते हैं बचपन में, बिना किसी रिश्तेदारी के, बिना किसी नाते के। यूँ ही कोई इंसान जो थोड़ा प्यार दिखाए, जिंदगी का अहम हिस्सा बन जाता है। और जिंदगी का वो दौर जैसे ही याद आता है, तो उस रिश्ते से या तो दुःख मिलता है या जिंदगी भर के लिए हमेशा खुशी मिलती है।</p>

        <p>वो नायिका और टॉफी वाले दद्दू—इन दोनों की मेरे से, यानी वीनू से, बहुत सारी यादें हैं। एक की यादें अब इस समय याद करने पर खुशी मिलती है और दूसरे की यादें आँखें नम करती हैं। इस बात से कि क्यों कोई अपना ही अपनों को छोड़कर यूँ ही चला जाता है। जैसे कि छोटे फूल से बड़े फूल को अलग कर दिया जाए। रिश्ते तो रह जाते हैं, पर रिश्ते बनाने वाले इंसान चले जाते हैं और रह जाती हैं केवल यादें, जो बहुत दर्द देती हैं।</p>

        <p>"टॉफी वाले दद्दू" नाम से ही पता चल रहा होगा कि उनकी परचूनी की दुकान है, पर वो पहले से ही परचूनी की दुकान नहीं चलाते थे। बल्कि वो आर्मी में अफसर थे। रिटायर होने के बाद उन्होंने अपने अकेलेपन को दूर करने के लिए दुकान खोल ली। उन्होंने शादी नहीं की थी।</p>

        <p>मेरे घर में मेरे पापा थे, मेरी मम्मी थी और मैं था और हमारा घर आगरा शहर के बिल्कुल बीच में था। हमारी कॉलोनी का नाम इन्द्रधनुष कॉलोनी था। दद्दू की दुकान मेरे घर से थोड़ी दूरी पर थी, लगभग 100–200 मीटर दूर होगी।</p>

        <p>जब भी मम्मी या पापा कोई सामान मंगाते, तो मैं भागकर जाता और थोड़ी देर रुककर वापस आ जाता था, क्योंकि वो हर सामान के साथ मुझको Free में दो टॉफी देते और बहुत प्यार से बात करते, बिल्कुल एक करीबी दोस्त की तरह।</p>

        <p>इस दोस्ती की शुरुआत कैसे हुई, ये तो मुझको नहीं पता, पर जब मैंने इसके बारे में दद्दू से पूछा, तो वह कह रहे थे कि जब मैं तीन साल का था, तब हम दोनों की पहली बार मुलाकात हुई थी, क्योंकि जब मैं तीन साल का था, तब हम लोग इस कॉलोनी में शिफ्ट हुए थे।</p>

        <p>वैसे तो मेरे घर में तीन ही लोग थे।</p>

        <p>मुख्य रूप से मैं ही था, पर एक और शैतान लड़की है जो मुझको परेशान करती रहती थी। वो है मेरी बहन। मेरी बहन कभी मेरा सामान ले लेती थी या गायब कर देती थी। अब तो वो बहुत बड़ी हो चुकी है, पर मुझको परेशान करना नहीं छोड़ा है।</p>

        <p>उसका नाम सौम्या है, पर हम उसको शॉर्ट में सोमू बुलाते हैं। उसके भी दो तरीके हैं—अगर जल्दी बुलाना है तो सोमू और अगर धीरे बुलाना है तो सोम्।</p>

        <p>अरे, मुझे अभी जाना पड़ेगा, क्योंकि मुझे अन्ना कोई बुला रहा है और जाना बहुत जरूरी है, क्योंकि वरना वो नाराज हो जाएगी। आप समझ ही सकते हैं ना, मुझे बहुत कम समय मिलता है, क्योंकि काम के साथ घर के काम में भी हाथ बटाना पड़ता है।</p>

        <p>चलिए, फिर शुक्रिया मेरी कहानी का पहला भाग पढ़ने के लिए। फिर कल मिलते हैं, यानी भाग 2 में।</p>
    `,


    /* ================= PART 2 ================= */

    2: `
        <p>अगर आप भाग 2 तक पहुँचे हैं, तो इसका मतलब है कि आपने भाग 1 बहुत अच्छे से पढ़ा है। अगर आपने नहीं पढ़ा है, तो पढ़कर आइए, क्योंकि आपको कुछ समझ में नहीं आएगा।</p>

        <p>मेरे दद्दू का कद लंबा, लगभग 6 फीट के करीब होगा और वो बिल्कुल हट्टे-कट्टे थे। रोज व्यायाम करना उनकी दिनचर्या में शामिल था। व्यायाम किए बिना दुकान नहीं खोलते थे। उनका, यानी मजाक करने का तरीका, Sense of Humor बहुत अच्छा था। अगर वो दस बातें करते, तो दो-तीन मजाक की बातें करते और जब भी मैं उनके पास सामान लेने जाता, तो मुझसे विशेष तौर पर बात करते थे।</p>

        <p>मैंने इतनी देर तक उनको किसी से भी बात करते हुए नहीं देखा था, पर ये भी तब ही सही था, जब तक वो नहीं आई थी। ये मत पूछना कि वो कौन? मैं नहीं बताने वाला। आपको खुद ही पता चल जाएगा।</p>

        <p>उनका घर अच्छा-खासा बड़ा था, पर हमारे घर से बड़ा नहीं था। पर हमारे दिल से उनका दिल बहुत बड़ा था, उस समय जब मुझे उनकी सबसे ज्यादा जरूरत थी।</p>

        <p>मैं ऐसा नहीं कह रहा कि मेरे मम्मी-पापा मुझसे प्यार नहीं करते, बल्कि मैं ऐसा कह रहा हूँ कि मम्मी-पापा मुझसे बहुत ज्यादा प्यार करते थे और करते हैं और करते रहेंगे। पर जब मुझे उनके प्यार की सबसे ज्यादा जरूरत थी, तब वो प्यार और स्नेह मुझे दद्दू से मिला।</p>

        <p>अगर मैं आपको अपने स्कूल के बारे में बताऊँ, तो मेरा स्कूल बहुत बड़ा था। उसकी इमारत 4 मंजिला थी और बहुत बड़ा Play Ground था। Bio Lab, Phy Lab और Chy Lab भी बहुत बढ़िया थीं। Principal Room, Staff Room भी अच्छी तरह बने हुए थे। Medical Room भी था।</p>

        <p>हाँ, हमारे स्कूल की 10 बसें थीं। आप कह सकते हैं कि हमारा स्कूल आगरा का सबसे अच्छा था। ये सब चीजें कुछ साल पहले तो थीं, पर अब इसमें कुछ बदलाव आ गया है।</p>

        <p>हमारे स्कूल का नाम Dolphin Public School था और ये शहर के Outer में था और अब भी है। अरे हाँ! मैं एक बात तो बताना भूल गया। हमारे स्कूल में लड़की और लड़के दोनों एक साथ पढ़ते थे, मतलब वो Co-ed School था।</p>

        <p>मुझे तब की बात याद आ रही है, जब वो पहली बार स्कूल गई थी। वो कितना ज्यादा रो रही थी! उसका मुझसे उस समय Nursery में Admission हुआ था। मैं उस समय 1st Class में था। मतलब मैं उससे 4 साल बड़ा था। और वो केवल 3 साल की थी और उसने मेरा पूरा दिन अपने पास बैठे रहने में ही निकलवा दिया।</p>

        <p>मैम ने मुझसे कहा कि ये बहुत रो रही है, आज तुम यहीं पर आस-पास रहो। और जब वो घर गई, तो वो शांत हुई। पता नहीं किस तरीके की लड़की है! इतना तो मैं भी नहीं रोया था पहली बार।</p>

        <p>मेरे 12 साल तो बिल्कुल साधारण तरीके से बीते, जैसे कि पहले बीत रहे थे। फिर कुछ ऐसा हुआ कि मेरी जिंदगी Interesting बन गई।</p>

        <p>मेरे ज्यादा कोई दोस्त नहीं थे, क्योंकि मैं Introvert Type का बच्चा था। मेरी रोज की यही दिनचर्या होती—सुबह उठना, स्कूल जाना, स्कूल से वापस आना, अपनी बहन से थोड़ी Fight करना और T.V. देखकर सो जाना।</p>

        <p>और उस समय इतने खास Shows भी नहीं आते थे कि उसको देखकर ही गुजारा किया जाए।</p>

        <p>एक दिन ऐसा आया, जब एक नया Show शुरू हुआ और मेरी जिंदगी बदल गई।</p>

        <p>तो आपको क्या लगता है, 2005 में कौन-सा Show आया होगा?</p>

        <p>अब अगले Part में मिलते हैं। मुझे बहुत सारा काम है, You know that!</p>
    `,


    /* ================= PART 3 ================= */

    3: `
        <p>हाँ, तो वो Show जो 2005 में शुरू हुआ था, वो था <strong>Doraemon</strong>।</p>

        <p>13 April के आस-पास मैंने उसका पहला Episode देखा था। पर मेरी जिंदगी उसके Episode के Release होने से पहले ही बदल गई थी।</p>

        <p>25 March को एक नया परिवार हमारी कॉलोनी में आया था। ये बात मुझको मम्मी-पापा से पता चली थी।</p>

        <p>30 March को मेरा Result मिला, 5th Class का। और मैं 6th Class में आ गया और मेरी बहन 1st Class में आ गई।</p>

        <p>उस दिन मैं दद्दू के पास गया, तो उन्होंने मुझसे पूछा कि कैसे नम्बर आए। मैंने कहा, "अच्छे आए।"</p>

        <p>उन्होंने और कुछ नम्बरों के बारे में नहीं पूछा।</p>

        <p>मैंने पूछा, "कॉलोनी में कोई नए लोग रहने आए हैं?"</p>

        <p>उन्होंने कहा, "हाँ, कुछ मिनट पहले ही यहाँ आकर गए थे। बहुत अच्छे भाई साहब हैं।"</p>

        <p>मैंने पूछा, "आपने उनसे कितने मिनट बात करी थी?"</p>

        <p>उन्होंने कहा, "कुछ मिनट बस।"</p>

        <p>मैंने कहा, "आपने इतनी जल्दी पहचान भी लिया कि वो कितने अच्छे हैं।"</p>

        <p>उन्होंने कहा कि, "ये आँखें इतनी बूढ़ी हो चुकी हैं कि कुछ मिनट में ही पहचान लेती हैं कि कौन इंसान अच्छा है या बुरा।"</p>

        <p>तो मैंने कहा, "अच्छा, तो आपने मुझको अभी तक नहीं पहचाना कि मैं अच्छा हूँ या बुरा?"</p>

        <p>फिर उन्होंने कहा, "न तुम अच्छे हो, न ही बुरे हो। तुम तो बड़े शैतान हो।"</p>

        <p>"अच्छा! तो फिर मैं चलता हूँ।" मैंने कहा।</p>

        <p>"ठीक है, फिर बेटा अपना ध्यान रखना और शैतानी मत छोड़ना।" उन्होंने कहा।</p>

        <p>अगले दिन मैं सुबह उठा और नहा-धोकर जल्दी से नाश्ता करके स्कूल के लिए तैयार हो गया।</p>

        <p>जैसा कि आपको पता है, मेरी बहन, जो 8 साल की बड़ी शरारती थी, वो खुद जल्दी तैयार नहीं हो पाती थी, बल्कि पापा उसको तैयार करते हैं, जैसे पहले मुझे करते थे।</p>

        <p>हम लोग लगभग 6:45 तक तैयार हो गए और अपने घर के सामने खड़े हो गए, क्योंकि वही हमारा Stop था।</p>

        <p>क्योंकि मेरे बगल में मेरी बहन खड़ी थी, इसीलिए मुझको शांति महसूस नहीं हो रही थी।</p>

        <p>मुझसे पूछे जा रही थी, "भाई, बस कब आएगी?"</p>

        <p>मैंने कहा, "जितने बजे रोज आती है, सोमू, उतने बजे ही आएगी।"</p>

        <p>मैंने उसको Lollipop खाने के लिए दे दी।</p>

        <p>सूरज निकलने ही वाला था और ठंडी हवा चल रही थी, जैसे कि गर्मियों के मौसम में सुबह चलती है।</p>

        <p>तभी Sharp 7:00 AM पर बस हमारे घर के सामने हमें लेने के लिए आ गई और हम उसमें चढ़ गए।</p>

        <p>बस में चढ़ने के बाद मम्मी से Bye की और Gate बंद हो गया।</p>

        <p>हम लोगों की Seat Fix थी। मैं अपने बचपन के दोस्त वीरू के साथ बैठता था और मेरी बहन अपने दोस्तों के साथ। और हम पापा से झूठ बोलते कि हम दोनों साथ में बैठते हैं बस में।</p>

        <p>जब पापा साथ में बैठने के लिए कहते, तो मम्मी कहतीं, "अब तो ये बड़ी हो गई है, क्यों सोमू?"</p>

        <p>और उसे मेरे साथ बैठना अच्छा नहीं लगता था।</p>

        <p>मेरी बहन अपनी Seat पर चली गई और मैं अपनी Seat पर गया, पर वहाँ आज एक लड़की बैठी हुई थी।</p>

        <p>जैसे ही मैं Seat के सामने खड़ा हुआ, तो वो मुझे देखने लगी। उसका Bag अलग रखा था। उसने अपना Bag अपने पास ही Seat पर रख रखा था। मतलब वो पूरी Seat पर ही बैठी थी, पर दूसरी Seat में एक और Seat थी।</p>

        <p>1 Seat में 3 सीट होती थीं।</p>

        <p>उसने अपना Bag खड़ा करके अपने ऊपर टिका लिया। मैं Seat पर बैठ गया।</p>

        <p>मैं बार-बार उसे और खिड़की की तरफ देख रहा था। बस चल चुकी थी और ठंडी-ठंडी हवा अंदर खिड़की के सहारे आ रही थी।</p>

        <p>उसके बाल बड़े-बड़े थे और उड़-उड़कर मेरे पास तक पहुँचने की कोशिश कर रहे थे। उसने अपने बाल संभाले और मुझको अपनी तरफ देखता हुआ पाया, तो उसने मुझसे Hello कह दिया।</p>

        <p>मैंने उससे थोड़ी तेजी से और जल्दी-जल्दी कहा, "Excuse me! क्या मैं खिड़की की तरफ बैठ सकता हूँ, क्योंकि मैं रोज इस Seat पर अपने दोस्त के साथ बैठता हूँ और खिड़की की तरफ मैं बैठता हूँ।"</p>

        <p>मैंने बहुत जल्दी से अपनी बात कह दी।</p>

        <p>उसने 1–2 सेकंड सोचा और फिर उसने कहा, "खिड़की के पास बैठना तो मुझको भी पसंद है।"</p>

        <p>इतना कहकर Seat से उठकर बाएँ तरफ की खिड़की वाली Seat पर चली गई।</p>

        <p>मैंने उससे थोड़ी देर बाद कहा कि अपना Bag ऊपर भी रख सकती हो।</p>

        <p>उसने कोई जवाब नहीं दिया और खिड़की की तरफ ही देखती रही।</p>

        <p>मैंने सोचा, बस के चलने की आवाज में सुनाई नहीं दिया होगा।</p>

        <p>मैं खिड़की से बाहर की तरफ देखने लगा। हमारे स्कूल के रास्ते में बहुत पेड़-पौधे देखने को मिलते हैं और ठंडी-ठंडी हवा चलती है, जिस वजह से मुझे सुबह के समय खिड़की वाली Seat पर बैठना अच्छा लगता है।</p>

        <p>5–10 मिनट बाद बस फिर रुकी और ये बस का आखिरी Stop था। इस Stop से एक लड़की चढ़ी, जो कि रोज चढ़ती थी। वो मेरे Seat के पास आई और बैठ गई। मैंने भी उससे मना नहीं किया।</p>

        <p>धीरे से उसने मुझसे कहा, "आज तेरा दोस्त नहीं आया।"</p>

        <p>मैंने कहा, "नहीं।"</p>

        <p>वो लड़की, जो आज पहली बार बस में आई थी, उसने शुरुआत में उस लड़की को बैठते हुए देखा और फिर दोबारा खिड़की की तरफ देखने लगी।</p>

        <p>उसने कहा, "वीनू।"</p>

        <p>मैंने कहा, "हाँ।"</p>

        <p>"रोजी, जो लड़की मेरे पास बैठी थी, तेरी तबियत तो ठीक है न?" रोजी ने कहा।</p>

        <p>"नहीं तो?" मैंने कहा।</p>

        <p>"तू आज कम बात कर रहा है न?" रोजी ने कहा।</p>

        <p>मैंने कहा, "मैं तुमसे बात ही कितनी करता हूँ, जो तुम आज बात करेगा।"</p>

        <p>"वैसे बात तो सही है।" रोजी ने कहा।</p>

        <p>"अच्छा, ये बताओ, वो लड़की कौन है जो Left Side खिड़की की तरफ बैठी है?"</p>

        <p>रोजी ने कहा, "पता नहीं।"</p>

        <p>मैंने कहा, "अच्छा।"</p>

        <p>रोजी उठी और उसके पास जाकर खड़ी हो गई और कहा, "क्या मैं तुम्हारे पास बैठ सकती हूँ?"</p>

        <p>उसने उस लड़की से कहा।</p>

        <p>उस लड़की ने हाँ में सिर हिला दिया।</p>

        <p>तभी मेरी नजर मेरी बहन की तरफ गई। वो Seat पर खड़ी होकर मुझे ही देखे जा रही थी। मैंने उसे सही से अपनी Seat पर बैठने का इशारा किया।</p>

        <p>वो Seat के नीचे छुप गई।</p>

        <p>स्कूल पहुँचने में 5–10 मिनट बचे थे। मैं खिड़की के बाहर देखने लगा।</p>

        <p>कुछ देर बाद बस रुकी और स्कूल आ गया।</p>

        <p>सब बच्चे बस से निकल गए। तब मैं निकला।</p>

        <p>Gate के अंदर जाते समय P.T. Teacher खड़े थे। उन्होंने मुझे आवाज दी।</p>

        <p>मैं उनके पास गया, तो देखा कि 2–3 लड़के और लड़कियों के साथ रोजी और वो लड़की खड़ी थी।</p>

        <p>सर ने मुझसे पूछा, "ये जो लड़की है, आज पहली बार आई है स्कूल?"</p>

        <p>मैंने कहा, "हाँ, मैंने तो आज पहली बार देखा है।"</p>

        <p>सर ने कहा, "जाओ बेटा, तुम लोग जाओ।"</p>

        <p>तभी सब लोग जाने लगे, तो उन्होंने कहा, "तुम नहीं, उनको जाने दो।"</p>

        <p>हम तीनों उनकी तरफ खड़े बच्चों की आवाज सुनकर पीछे देखने लगे, तो उन्होंने इशारा करके कहा, "तुम लोग जाओ भाई!"</p>
    `

};


/* ================= STORY VARIABLES ================= */

let currentStoryPart = 1;


/* ================= OPEN STORY PART ================= */

function openStoryPart(part) {

    currentStoryPart = part;

    const storyReader =
        document.getElementById("storyReader");

    if (!storyReader) return;

    storyReader.classList.add("active");

    showStoryPart(part);

    setTimeout(function() {

        storyReader.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 100);

}


/* ================= SHOW STORY PART ================= */

function showStoryPart(part) {

    const storyText =
        document.getElementById("storyText");

    const storyPartTitle =
        document.getElementById("storyPartTitle");

    const currentPart =
        document.getElementById("currentPart");

    const partIndicator =
        document.getElementById("partIndicator");

    const pageNumber =
        document.querySelector(".page-number");


    storyText.innerHTML =
        storyParts[part];


    storyPartTitle.textContent =
        "मेरा पहला प्यार — Part " + part;


    currentPart.textContent =
        "PART " + part;


    partIndicator.textContent =
        part + " / 3";


    pageNumber.textContent =
        String(part).padStart(2, "0");


    /* PREVIOUS */

    document
        .getElementById("prevStoryBtn")
        .disabled = part === 1;


    /* NEXT */

    document
        .getElementById("nextStoryBtn")
        .disabled = part === 3;


    /* PAGE TURN */

    const page =
        document.getElementById("storyPage");


    page.classList.remove("page-turn");

    void page.offsetWidth;

    page.classList.add("page-turn");

}


/* ================= NEXT ================= */

function nextStoryPart() {

    if (currentStoryPart < 3) {

        currentStoryPart++;

        showStoryPart(currentStoryPart);


        /* वापस STORY पर जाए */

        const storyReader =
            document.getElementById("storyReader");


        if (storyReader) {

            setTimeout(function() {

                storyReader.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 100);

        }

    }

}


/* ================= PREVIOUS ================= */

function previousStoryPart() {

    if (currentStoryPart > 1) {

        currentStoryPart--;

        showStoryPart(currentStoryPart);


        /* वापस STORY पर जाए */

        const storyReader =
            document.getElementById("storyReader");


        if (storyReader) {

            setTimeout(function() {

                storyReader.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 100);

        }

    }

}


/* ================= CLOSE ================= */

function closeStory() {

    const storyReader =
        document.getElementById("storyReader");


    if (storyReader) {

        storyReader.classList.remove("active");

    }

}


/* ================= JAVASCRIPT TEST ================= */

console.log("STORY JAVASCRIPT LOADED");