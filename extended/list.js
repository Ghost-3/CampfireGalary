function onLoad() {
    step = 20;
    offset = getOffset();
    invalidOffsetHandler(offset)
    setLinks(offset, step)
    loadImages(offset, step);
    
    Form = document.getElementById('Search');
    Form.addEventListener('submit', onClick);
    
    document.addEventListener("keyup", function(event) {
        if (event.key == "ArrowLeft") {
            document.getElementById('prev').click();
        }
        else if (event.key == "ArrowRight") {
            document.getElementById('next').click();
        }
        else if (event.key == "Enter") {
            document.getElementById('inputButton').click();
        }
    });
    
    input = document.getElementById("inputOffset");
    input.placeholder = Number(offset);
    input.focus();
}

function onClick(event) {
    el = document.getElementById('inputOffset');
    offset = el.value;
    if (offset != "") {
        return Number(offset);
    }
    event.preventDefault()
}

function getOffset() {
    // Return offset from URL
    var paramsString = document.location.search;
    var searchParams = new URLSearchParams(paramsString);
    var offset = searchParams.get("offset");
    return Number(offset);
}

function invalidOffsetHandler(offset) {
    // If the image ID is invalid it redirects to the correct one 
    if (!offset || offset < 1 || !Number.isInteger(offset)) {
        window.location.href = "?offset=1";
        // To prevent the request
        throw "Invalid offset";
    }
}

function setLinks(offset, step) {
    // Previous image button link
    document.getElementById("prev").href = '?offset=' + (Number(offset) - step);
    // Next image button link
    document.getElementById("next").href = '?offset=' + (Number(offset) + step);
    // Navigation bar buttons
    document.getElementById("-1000").href = '?offset=' + (Number(offset) - step * 1000);
    document.getElementById("-100").href = '?offset=' + (Number(offset) - step * 100);
    document.getElementById("-10").href = '?offset=' + (Number(offset) - step * 10);
    document.getElementById("+10").href = '?offset=' + (Number(offset) + step * 10);
    document.getElementById("+100").href = '?offset=' + (Number(offset) + step * 100);
    document.getElementById("+1000").href = '?offset=' + (Number(offset) + step * 1000);
    // Extend button
    document.getElementById("Switch").href += '?id=' + (Number(offset));
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function imgCreate(src, alt) {
    var img = new Image()
    img.src = src;
    img.loading = "lazy";
    if ( alt != null ) img.alt = alt;
    return img;
}

function loadImages(offset, step) {
    baseURL = "https://campfire.moe/api/image/"
    for (i = offset; i < offset + step; i++) {
        url = baseURL + i
        img = imgCreate(url);
        document.getElementById('gallery').appendChild(img);
    }
}

function topNavSwitch() {
    var x = document.getElementById("Topnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

function scrollToTop (duration) {
    // cancel if already on top
    if (document.scrollingElement.scrollTop === 0) return;
    const cosParameter = document.scrollingElement.scrollTop / 2;
    let scrollCount = 0, oldTimestamp = null;
    function step (newTimestamp) {
        if (oldTimestamp !== null) {
            // if duration is 0 scrollCount will be Infinity
            scrollCount += Math.PI * (newTimestamp - oldTimestamp) / duration;
            if (scrollCount >= Math.PI) return document.scrollingElement.scrollTop = 0;
            document.scrollingElement.scrollTop = cosParameter + cosParameter * Math.cos(scrollCount);
        }
        oldTimestamp = newTimestamp;
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}

onLoad();
