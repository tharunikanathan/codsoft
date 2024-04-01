var quiz = {
    "JS": [{
            "id": 1,
            "question": "if 1=3,2=3,3=5,4=4,5=4.Then,6=?",
            "options": [{
                "a": "6",
                "b": "2",
                "c": "3",
            }],
            "answer": "3",
            "score": 0,
            "status": ""
        },
        {
            "id": 2,
            "question": "which number is equivalent to 3^(4)/3^(2)?",
            "options": [{
                "a": "3",
                "b": "9",
                "c": "6"
            }],
            "answer": "pomology",
            "score": 0,
            "status": ""
        },
        {
            "id": 3,
            "question": "I am an odd number.Take away one letter and i become even.what number am I?",
            "options": [{
                "a": "seven",
                "b": "eleven",
                "c": "nine"
            }],
            "answer": "seven",
            "score": 0,
            "status": ""
        },
        {
            "id": 4,
            "question": "which 3 numbers have the same answer whether they are added or multiplied together?",
            "options": [{
                "a": "2,4 and 6",
                "b": "1,1 and 2",
                "c": "1,2 and 3"
            }],
            "answer": "1,2 and 3",
            "score": 0,
            "status": ""
        },
        {
            "id": 5,
            "question": "The day before yesterday I was 25.the next year i will be 28.this is true only one day in a year.what day is my birthday?",
            "options": [{
                "a": "dec 31",
                "b": "feb 28",
                "c": "may 1"
            }],
            "answer": "dec 31",
            "score": 0,
            "status": ""
        },

    ]
}
var quizApp = function() {
    this.score = 0;
    this.qno = 1;
    this.currentque = 0;
    var totalque = quiz.JS.length;
    this.displayQuiz = function(cque) {
        this.currentque = cque;
        if (this.currentque < totalque) {
            $("#tque").html(totalque);
            $("#previous").attr("disabled", false);
            $("#next").attr("disabled", false);
            $("#qid").html(quiz.JS[this.currentque].id + '.');
            $("#question").html(quiz.JS[this.currentque].question);
            $("#question-options").html("");
            for (var key in quiz.JS[this.currentque].options[0]) {
                if (quiz.JS[this.currentque].options[0].hasOwnProperty(key)) {
                    $("#question-options").append(
                        "<div class='form-check option-block'>" +
                        "<label class='form-check-label'>" +
                        "<input type='radio' class='form-check-input' name='option' id='q" + key + "' value='" + quiz.JS[this.currentque].options[0][key] + "'><span id='optionval'>" +
                        quiz.JS[this.currentque].options[0][key] +
                        "</span></label>"
                    );
                }
            }
        }
        if (this.currentque <= 0) {
            $("#previous").attr("disabled", true);
        }
        if (this.currentque >= totalque) {
            $('#next').attr('disabled', true);
            for (var i = 0; i < totalque; i++) {
                this.score = this.score + quiz.JS[i].score;
            }
            return this.showResult(this.score);
        }
    }
    this.showResult = function(scr) {
        $("#result").addClass('result');
        $("#result").html("<h1 class='res-header'>Total Score: &nbsp;" + scr + '/' + totalque + "</h1>");
        for (var j = 0; j < totalque; j++) {
            var res;
            if (quiz.JS[j].score == 0) {
                res = '<span class="wrong">' + quiz.JS[j].score + '</span><i class="fa fa-remove c-wrong"></i>';
            } else {
                res = '<span class="correct">' + quiz.JS[j].score + '</span><i class="fa fa-check c-correct"></i>';
            }
            $("#result").append(
                '<div class="result-question"><span>Q ' + quiz.JS[j].id + '</span> &nbsp;' + quiz.JS[j].question + '</div>' +
                '<div class="result-answer"><b>Correct answer:</b> &nbsp;' + quiz.JS[j].answer + '</div>' +
                '<div class="last-row"><b>Score:</b> &nbsp;' + res + '</div>'
            );
        }
        $("#result").append('<button id="play-again">Play Again</button>');
    
        $("#play-again").on('click', function() {
            location.reload();
        });
    }
    
    this.checkAnswer = function(option) {
        var answer = quiz.JS[this.currentque].answer;
        option = option.replace(/</g, "&lt;") 
        option = option.replace(/>/g, "&gt;") 
        option = option.replace(/"/g, "&quot;")
        if (option == quiz.JS[this.currentque].answer) {
            if (quiz.JS[this.currentque].score == "") {
                quiz.JS[this.currentque].score = 1;
                quiz.JS[this.currentque].status = "correct";
            }
        } else {
            quiz.JS[this.currentque].status = "wrong";
        }
    }
    this.changeQuestion = function(cque) {
        this.currentque = this.currentque + cque;
        this.displayQuiz(this.currentque);
    }
}
var jsq = new quizApp();
var selectedopt;
$(document).ready(function() {
    jsq.displayQuiz(0);
    $('#question-options').on('change', 'input[type=radio][name=option]', function(e) {
        //var radio = $(this).find('input:radio');
        $(this).prop("checked", true);
        selectedopt = $(this).val();
    });
});
$('#next').click(function(e) {
    e.preventDefault();
    if (selectedopt) {
        jsq.checkAnswer(selectedopt);
    }
    jsq.changeQuestion(1);
});
$('#previous').click(function(e) {
    e.preventDefault();
    if (selectedopt) {
        jsq.checkAnswer(selectedopt);
    }
    jsq.changeQuestion(-1);
});
