function loadFooter() {
    let footer = document.getElementById("footer");
    footer.innerHTML = `
        <h4>
            <a href="./portal.html">Portal</a> |
            <a href="./tutorial1.html">Tutorial 1</a> |
            <a href="./tutorial2.html">Tutorial 2</a> |
            <a href="./tutorial3.html">Tutorial 3</a> |
            <a href="./tutorial4.html">Tutorial 4</a> |
            <a href="./tutorial5.html">Tutorial 5</a> |
            <a href="./aandb1.html">A&B 1</a> |
            <a href="./aandb2.html">A&B 2</a>
        </h4>
            `;
}

function nextbutton() {
    let data = document.getElementById("data").innerText;
    switch (true) {
        case data == "Page0":
            document.location.href = "./tutorial1.html";
            break;
        case data == "Page1":
            document.location.href = "./tutorial2.html";
            break;
        case data == "Page2":
            document.location.href = "./tutorial3.html";
            break;
        case data == "Page3":
            document.location.href = "./tutorial4.html";
            break;
        case data == "Page4":
            document.location.href = "./tutorial5.html";
            break;
        case data == "Page5":
            document.location.href = "./aandb1.html";
            break;
        case data == "Page6":
            document.location.href = "./aandb2.html";
            break;
        default:
            break;
    }
};

function previousbutton() {
    let data = document.getElementById("data").innerText;
    switch (true) {
        case data == "Page1":
            document.location.href = "./portal.html";
            break;
        case data == "Page2":
            document.location.href = './tutorial1.html';
            break;
        case data == "Page3":
            document.location.href = './tutorial2.html';
            break;
        case data == "Page4":
            document.location.href = './tutorial3.html';
            break;
        case data == "Page5":
            document.location.href = './tutorial4.html';
            break;
        case data == "Page6":
            document.location.href = './tutorial5.html';
            break;
        case data == "Page7":
            document.location.href = './aandb1.html';
            break;
        default:
            break;
    }
}

function downloadcontentbutton() {
    let data = document.getElementById("data").innerText;
    switch (true) {
        case data == "Page3":
            document.location.href = "./data/exampleSubsystems.zip";
            break;
        default:
            break;
    }
}

loadFooter();