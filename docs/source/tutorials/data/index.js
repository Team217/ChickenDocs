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
            document.location.href = "../quizzes/quiz2.html";
            break;
        case data == "Page4":
            document.location.href = "../quizzes/quiz4.html";
            break;
        case data == "Page5":
            document.location.href = "../quizzes/quiz5.html";
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

let attempts = 0;
/**
 * 
 * @param {Array} questions 
 * @param {Array} correct 
 * @returns 
 */
function checkanswer(questions, correct) {
    let correctString = correct.join(", ");
    let incorrect = false;

    for (var i = 0; i <= correct.length - 1; i++) {
        if (!questions[i]) incorrect = true;
        if (questions[i] !== correct[i]) incorrect = true;
    }
    if (!incorrect) {
        feedback.innerText = 'Correct! You can now move onto the next tutorial!';
        feedback.style.display = "block";
        document.getElementById("next").style.display = "block";
        document.getElementById("submit").disabled = true;
        return;
    }
    if (attempts >= 1) {
        feedback.innerText = `Incorrect! The correct answers are: ${correctString}. Refresh the page to try the quiz again!`;
        feedback.style.display = "block";
        document.getElementById("submit").disabled = true;
        return;
    }
    if (incorrect) {
        feedback.innerText = 'Uh oh! Something doesn\'t look right. Try again!';
        feedback.style.display = "block";
    }

    attempts++;
}

function submitquiz() {
    let data = document.getElementById("data").innerText;
    switch (true) {
        case data == "Page1":
            let oneq1 = document.querySelector('input[name="q1"]:checked')?.value;
            let oneq2 = document.querySelector('input[name="q2"]:checked')?.value;
            let onearray = [oneq1, oneq2];
            let onecorrect = ["D", "C"];
            checkanswer(onearray, onecorrect);
            break;
        case data == "Page2":
            let twoq1 = document.querySelector('input[name="q1"]:checked')?.value;
            let twoq2 = document.querySelector('input[name="q2"]:checked')?.value;
            let twoq3 = document.querySelector('input[name="q3"]:checked')?.value;
            let twoq4 = document.querySelector('input[name="q4"]:checked')?.value;
            let twoarray = [twoq1, twoq2, twoq3, twoq4];
            let twocorrect = ["A", "B", "D", "D"];
            checkanswer(twoarray, twocorrect);
            break;
        case data == "Page4":
            let fourq1 = document.querySelector('input[name="q1"]:checked')?.value;
            let fourq2 = document.querySelector('input[name="q2"]:checked')?.value;
            let fourq3 = document.querySelector('input[name="q3"]:checked')?.value;
            let fourq4 = document.querySelector('input[name="q4"]:checked')?.value;
            let fourarray = [fourq1, fourq2, fourq3, fourq4];
            let fourcorrect = ["D", "B", "C", "C"];
            checkanswer(fourarray, fourcorrect);
            break;
        case data == "Page5":
            let fiveq1 = document.querySelector('input[name="q1"]:checked')?.value;
            let fivearray = [fiveq1];
            let fivecorrect = ["A"];
            checkanswer(fivearray, fivecorrect);
            break;
        default:
            break;
    }
}

window.addEventListener('devtoolschange', function (e) {
    if (e.detail.open) {
        document.body.innerHTML = `<div class="title center"><h1>No cheating for you :)</h1></div>`;
        setTimeout(() => {
            document.location.href = `../data/cat-chicken.webp`;
        }, 500);
    }
});

loadFooter();