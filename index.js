
function wait(ms) {
    return new Promise(res => setTimeout(res, ms))
}

const typing = async (verse, speed, wordSpace) => {  
    const verseArray = verse.split("");
    
    for (let i = 0; i < verseArray.length; i++) {
        await wait(speed);
        wordSpace.innerHTML += verseArray[i]; 
    }
}

window.onload = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {
        AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();
        const bgm = document.getElementById("bgm");
        bgm.play();
    }).catch(e => {
        console.error(`Audio permissions denied: ${e}`);
    });
}

let loading = true;
let verses = null;
fetch("./verses/verses.json")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        verses = data;
        loading = false;
    })
    .catch((error) => {

    })

const header = document.getElementById("header");
const wordBtn = document.getElementById("word-btn");
const mainSpace = document.getElementById("main");
const wordSpace = document.getElementById("word-space");
const indexSpace = document.getElementById("index-space");
const actionSection = document.getElementById("action-section");
const shareBtn = document.getElementById("share-btn");
const downloadBtn = document.getElementById("download-btn");
const cursor = document.getElementById("cursor");

async function anim(element, opacity_v=1, delay_v=300, duration_v=200) {
    const keyframe = [
        {opacity: 0},
        {opacity: opacity_v}
    ]

    const option = {
        delay: delay_v,
        duration: duration_v
    }
    console.log(element, "animate");
    const a = element.animate(keyframe, option);
    a.onfinish = () => {
        element.style.opacity = opacity_v;
    }
    await a.finished;
    //element.style.opacity = 1;
}

const lampImage = document.getElementById("lamp_image");
const lightImage = document.getElementById("light_image");
const famImage = document.getElementById("fam_image");
const titleImage = document.getElementById("title_image");
wordBtn.addEventListener("click", async (event) => {
    if (loading) return;
    wordBtn.style.display = "none";
    mainSpace.style.display = "block";
    await anim(lampImage);
    await anim(famImage);
    //cursor.style.visibility = "visible";
    const verse = verses.words[Math.floor(Math.random() * verses.words.length)];
    
    const index = verse.index;
    const indexString = `\n${index.book} ${index.chapter}:${index.verse}`;
    console.log(indexString);
    if (verse.text.length / 14 >= 7) {
        console.log("large verse")
        wordSpace.style.fontSize = "2.5vh";
    }
    await typing(verse.text, 100, wordSpace);
    const br = document.createElement("br");
    indexSpace.appendChild(br);
    await typing(indexString, 100, indexSpace);
    await anim(titleImage);
    await anim(lightImage, 0.5, 500, 500);
    //cursor.style.visibility = "hidden";
    actionSection.style.visibility = "visible";
    if (!navigator.share) {
        shareBtn.style.visibility = "hidden";
    }
})

const main = document.querySelector(".bg");
downloadBtn.addEventListener("click", (event) => {
    actionSection.style.visibility = "hidden";
    htmlToImage.toPng(main)
        .then((dataUrl) => {
            const link = document.createElement('a')
            link.download="dsf";
            link.href = dataUrl
            link.click()
        }).then(() => {
            actionSection.style.visibility = "visible";
        })
})

shareBtn.addEventListener("click", async (event) => {
    actionSection.style.visibility = "hidden";
    const blob = await htmlToImage.toBlob(main);
    const file = new File([blob], "verse.png", { type: "image/png" });

    if (navigator.canShare({ files: [file] })) {
        await navigator.share({
        files: [file],
        title: "말씀"
        });
    } else {
        alert("이 기기에서는 공유를 지원하지 않습니다.");
    }
    actionSection.style.visibility = "visible";
})

