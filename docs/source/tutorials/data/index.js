function loadFooter() {
    let footer = document.getElementById("footer");
    footer.innerHTML = `
        <h4>
            <a href="../tutorials/portal.html">Portal</a> |
            <a href="../tutorials/tutorial1.html">Tutorial 1</a> |
            <a href="../tutorials/tutorial2.html">Tutorial 2</a> |
            <a href="../tutorials/tutorial3.html">Tutorial 3</a> |
            <a href="../tutorials/tutorial4.html">Tutorial 4</a> |
            <a href="../tutorials/tutorial5.html">Tutorial 5</a> |
            <a href="../tutorials/aandb1.html">A&B 1</a> |
            <a href="../tutorials/aandb2.html">A&B 2</a>
        </h4>
            `;
}

function nextbutton() {
    let data = document.getElementById("data").innerText;
    switch (true) {
        case data == "Page0":
            document.location.href = "../tutorials/tutorial1.html";
            break;
        case data == "Page1":
            document.location.href = "../tutorials/tutorial2.html";
            break;
        case data == "Page2":
            document.location.href = "../tutorials/tutorial3.html";
            break;
        case data == "Page3":
            document.location.href = "../tutorials/tutorial4.html";
            break;
        case data == "Page4":
            document.location.href = "../tutorials/tutorial5.html";
            break;
        case data == "Page5":
            document.location.href = "../tutorials/aandb1.html";
            break;
        case data == "Page6":
            document.location.href = "../tutorials/aandb2.html";
            break;
        default:
            break;
    }
};

function previousbutton() {
    let data = document.getElementById("data").innerText;
    switch (true) {
        case data == "Page1":
            document.location.href = "../tutorials/portal.html";
            break;
        case data == "Page2":
            document.location.href = '../tutorials/tutorial1.html';
            break;
        case data == "Page3":
            document.location.href = '../tutorials/tutorial2.html';
            break;
        case data == "Page4":
            document.location.href = '../tutorials/tutorial3.html';
            break;
        case data == "Page5":
            document.location.href = '../tutorials/tutorial4.html';
            break;
        case data == "Page6":
            document.location.href = '../tutorials/tutorial5.html';
            break;
        case data == "Page7":
            document.location.href = '../tutorials/aandb1.html';
            break;
        default:
            break;
    }
}

function quizbutton() {
    let data = document.getElementById("data").innerText;
    switch (true) {
        case data == "Page1":
            document.location.href = "../quizzes/quiz1.html";
            break;
        case data == "Page2":
            break;
        default:
            break;
    }
}

function downloadcontentbutton() {
    let data = document.getElementById("data").innerText;
    switch (true) {
        case data == "Page3":
            document.location.href = "../data/exampleSubsystems.zip";
            break;
        default:
            break;
    }
}

loadFooter();