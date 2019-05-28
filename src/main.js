var allQuestion
var count = 0
var isDisable = true;

function geek() {
    var select = document.getElementById("selectNumber");
    var url = 'https://findfalcone.herokuapp.com/planets'
    fetch(url).then(function (response) {
        response.json().then(function (data) {
            allQuestion = data
            console.log(allQuestion)
            startSurvey()
        })
    });
}
function startSurvey() {

    document.getElementById("surveyButton").style.visibility = "hidden";
    var myDiv = document.getElementById("myDiv");
    if (!allQuestion[count].required){
        var label1 = document.createElement('label');
    label1.appendChild(document.createTextNode("Question Number:"+count+" "+ " OPTIONAL"));
    myDiv.appendChild(label1);
    }
    else{
        var label1 = document.createElement('label');
    label1.appendChild(document.createTextNode("Question Number:"+count));
    myDiv.appendChild(label1);
    }
     var br = document.createElement("br");
     myDiv.appendChild(br);
    var label = document.createElement('label');
    label.appendChild(document.createTextNode(allQuestion[count].question.text));

    var br = document.createElement("br");
    myDiv.appendChild(br);
    myDiv.appendChild(label);
    if (allQuestion[count].multiSelect)
        createCheckBoxes(count)
    else
        createRadioButton(count)
    var br = document.createElement("br");
    var br1 = document.createElement("br");
    myDiv.appendChild(br1);
    myDiv.appendChild(br);
    var button = document.createElement('button');
    button.type = "button";
    button.name = "Next";
    button.innerHTML = "Next";
    button.id = "Btnid";
    myDiv.appendChild(button);
    document.getElementById("Btnid").disabled = isDisable;
    button.addEventListener('click', function () {
        if (count != allQuestion.length - 1) {
            while (myDiv.firstChild) {
                myDiv.removeChild(myDiv.firstChild);
            }
            count++
            startSurvey()
        }
        else {
            while (myDiv.firstChild) {
                myDiv.removeChild(myDiv.firstChild);
            }
            var label = document.createElement('label');
            label.appendChild(document.createTextNode("Thank you for survey!!"));

            myDiv.appendChild(label);
        }
        if (!allQuestion[count].required) {
            var button1 = document.createElement('button');
            button1.type = "button";
            button1.name = "Skip";
            button1.innerHTML = "Skip";
            button1.id = "Btnid1";
            myDiv.appendChild(button1);
            button1.addEventListener('click', function () {
                if (count != allQuestion.length - 1) {
                    while (myDiv.firstChild) {
                        myDiv.removeChild(myDiv.firstChild);
                    }
                    count++
                    startSurvey()
                }
            })
        }


    })
}
function createCheckBoxes(index) {
    for (let i = 0; i < allQuestion[index].options.length; i++) {

        var myDiv = document.getElementById("myDiv");
        var br = document.createElement("br");
        var br1 = document.createElement("br");
        myDiv.appendChild(br);
        myDiv.appendChild(br1);
        var checkbox = document.createElement('input');


        checkbox.type = "checkbox";
        checkbox.name = "name";
        checkbox.value = "value";
        checkbox.id = "id";


        var label = document.createElement('label');

        label.htmlFor = "id";

        label.appendChild(document.createTextNode(allQuestion[index].options[i].label.text));

        myDiv.appendChild(checkbox);
        myDiv.appendChild(label);
        checkbox.addEventListener('change', function (e) {
            var checkboxes = document.querySelectorAll('input[type="checkbox"]');
            var checkedOne = Array.prototype.slice.call(checkboxes).some(x => x.checked);
            if (checkedOne)
                document.getElementById("Btnid").disabled = false;
            else
                document.getElementById("Btnid").disabled = true;
        })
    }
}

function createRadioButton(index) {
    for (let i = 0; i < allQuestion[index].options.length; i++) {
        var myDiv = document.getElementById("myDiv");
        let br = document.createElement("br");
        let br1 = document.createElement("br");
        myDiv.appendChild(br);
        myDiv.appendChild(br1);
        var radio = document.createElement('input');


        radio.type = "radio";
        radio.name = "rd";
        radio.id = "radio_rd";


        var label = document.createElement('label');

        label.htmlFor = "id";

        label.appendChild(document.createTextNode(allQuestion[index].options[i].label.text));

        myDiv.appendChild(radio);
        myDiv.appendChild(label);
        radio.addEventListener('change', function (e) {
            var checkboxes = document.querySelectorAll('input[type="radio"]');
            var checkedOne = Array.prototype.slice.call(checkboxes).some(x => x.checked);
            if (checkedOne)
                document.getElementById("Btnid").disabled = false;
            else
                document.getElementById("Btnid").disabled = true;
        })
    }
}

