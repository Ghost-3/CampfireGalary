function onLoad() {
    id = getID();
    invalidImageHandler(id);
    setLinks(id);
    
    Form = document.getElementById('Search');
    Form.addEventListener('submit', onClick);
}

function onClick(event) {
    el = document.getElementById('inputID');
    id = el.value;
    if (id != "") {
        return Number(id);
    }
    event.preventDefault()
}

function getID() {
    // Return image ID from URL
    var paramsString = document.location.search;
    var searchParams = new URLSearchParams(paramsString);
    var id = searchParams.get("id");
    return Number(id);
}

function invalidImageHandler(id) {
    // If the image ID is invalid it redirects to the correct one 
    if (!id || id < 1 || !Number.isInteger(id)) {
        window.location.href = "?id=1";
        // To prevent the request
        throw "Invalid image ID";
    }
}

function setLinks(id) {
    // Image link
    document.getElementById("image").src = 'https://campfire.moe/api/image/' + id;
    // Previous image button link
    document.getElementById("prev").href = '?id=' + (Number(id) - 1);
    // Next image button link
    document.getElementById("next").href = '?id=' + (Number(id) + 1);
    // Navigation bar buttons
    document.getElementById("-1000").href = '?id=' + (Number(id) - 1000);
    document.getElementById("-100").href = '?id=' + (Number(id) - 100);
    document.getElementById("-10").href = '?id=' + (Number(id) - 10);
    document.getElementById("+10").href = '?id=' + (Number(id) + 10);
    document.getElementById("+100").href = '?id=' + (Number(id) + 100);
    document.getElementById("+1000").href = '?id=' + (Number(id) + 1000);
}

function topNavSwitch() {
    var x = document.getElementById("Topnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

onLoad();
