var DEBUG = true
var STUDENT = false
var listOfWords = new Array()
var counter = 0
var nrOfCorrectAnswers = 0
var isProgramRunning = false

var wordLang1
var wordLang2

var lang1 = "Svenska"
var lang2 = "Engelska"
var lang1alt = "Svenskt"
var lang2alt = "Engelskt"


/*

END OF GLOBAL DECLARATIONS

*/

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}
function fetchFromDatabase(glosID)
{

    console.log("fetchFromDatabase() " + glosID)
    $.ajax
    ({
        url: 'test2.php',                //the script to call to get data
        data: "glosforhor="+glosID,       //you can insert url argumnets here to pass to api.php
                                       //for example "id=5&parent=6"
        dataType: 'json',                //data format
        success: function(data)          //on recieve of reply
        {
            console.log(data)

            if(typeof data != "undefined")
                for(var a = 0; a < data.length; a++)
                {
                    listOfWords.push(new wordPair(data[a]["lang_one"].trim(),data[a]["lang_two"].trim()))
                    //console.log(dataLang1 + " : " + dataLang2)
                }
        }
    })
}

function sendGlosorToDatabase(glosID, data)
{
    console.log("data: " + data)

    data.push({glosforhor: "3"});
    console.log("data: " + data)

    var jsonData = JSON.stringify(data);
    console.log("sendGlosorToDatabase() " + jsonData)

    $.ajax
    ({
        url: "test3.php",                //the script to call to get data
        data: {data : jsonData},

        success: function(data)          //on recieve of reply
        {
            console.log(data)
        }
    })
}

function readFromFile()
{
    var fileInput = document.getElementById("fileInput")

    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob)
    {
        fileInput.addEventListener("change", function(e)
        {
    		var file = fileInput.files[0]
    		var textType = /text.*/

    		if (file.type.match(textType)) {
    			var reader = new FileReader()

                listOfWords = []
                var listFromFile
    			reader.onload = function(e) {
                    listFromFile = reader.result
                    listFromFile = listFromFile.split("\n")

                    //console.log(listFromFile)
                    var wordsInListFromFile
                    for(var a = 0; a < listFromFile.length; a++)
                    {
                        wordsInListFromFile = listFromFile[a].split("#")
                        console.log(wordsInListFromFile[0])
                        if(isEmpty(wordsInListFromFile[0]) || isEmpty(wordsInListFromFile[1]) )
                            break
                        //console.log("svenska: " + wordsInListFromFile[0] + "  engelska: " + wordsInListFromFile[1])
                        listOfWords.push(new wordPair(wordsInListFromFile[0].trim(),wordsInListFromFile[1].trim()))
                    }
    			}
    			reader.readAsText(file)
    		}
            else
                swal("File not supported!")


            $("#guiwordsLeft").text("")
            $("#modalChooseFile").modal("hide")

    	})

    }
    else
        swal("The File APIs are not fully supported in this browser.")


}

function wordPair(word1, word2)
{
    this.lang1 = word1
    this.lang2 = word2

    /*var word = {
        svenska : ordSvenska
        , engelska : ordEngelska
    }

    return word*/
}

function isEmpty(str)
{
    return (!str || 0 === str.length)
}


function resetGame()
{
    $("#guiwordsLeft").text("")
    $("#startProgramBtn").text("Starta Glosprogram")
    $("#startProgramBtn").removeClass()
    $("#startProgramBtn").addClass("btn btn-primary btn-lg")
    $("#btnNextWord").prop("disabled", true);
    $("#lang2Quizz").prop("disabled", true);


    $("#lang1Quizz").val("")
    $("#lang2Quizz").val("")

    //$("#resultLang1").text(nrOfCorrectAnswers)
    //$("#resultLang2").text(listOfWords.length)
    //$("#modalResult").modal("show")

    //swal("Slut på glosor!", "Antal rätt " + nrOfCorrectAnswers + " av totalt " + counter, "success")

    //max 1 wrong answer
    if(listOfWords.length - nrOfCorrectAnswers <= listOfWords.length - 1)
        swal("Antal rätt:  " + nrOfCorrectAnswers + " av totalt " + counter + " glosor", "", "success")
    else
        swal("Antal rätt:  " + nrOfCorrectAnswers + " av totalt " + counter + " glosor", "", "error")

    counter = 0
    nrOfCorrectAnswers = 0
}

function shuffleArray()
{
    var tmpCounter = listOfWords.length
    var tmp
    var index

    while (tmpCounter > 0)
    {
        index = Math.floor(Math.random() * tmpCounter)

        tmpCounter--

        tmp = listOfWords[tmpCounter]
        listOfWords[tmpCounter] = listOfWords[index]
        listOfWords[index] = tmp
    }
}

function nextWord()
{
    $("#lang1Quizz").val("")
    $("#lang2Quizz").val("")

    if(typeof listOfWords[counter] == "undefined")
    {
        resetGame()
        return
    }
    $("#guiwordsLeft").text("Det är " + (listOfWords.length - counter) + " ord kvar!")


    console.log(lang1 + ":  " + listOfWords[counter].lang1 + "   |   " + lang2 + ": "  + listOfWords[counter].lang2)

    wordLang1 = listOfWords[counter].lang1
    wordLang2 = listOfWords[counter].lang2

    $("#lang1Quizz").val(listOfWords[counter].lang1)

}



$(document).ready(function()
{
    /*listOfWords.push(new wordPair("hund","dog"))
    console.log(listOfWords)
    listOfWords.push(new wordPair("bil","car"))
    console.log(listOfWords)*/

    $("#guiLang1").text(lang1)
    $("#guiLang2").text(lang2)
    $("#guimodalAddWordLang1").text(lang1)
    $("#guimodalAddWordLang2").text(lang2)


    readFromFile()

    if(STUDENT)
    {
        $("#btnAddWord").parent().addClass("hidden")
        $("#btnChooseFile").parent().addClass("hidden")
        $("#btnShowWords").parent().addClass("hidden")
    }

    $("#btnAddWord").bind("click", function (e)
    {
        $("#modalAddWordLang1").val("")
        $("#modalAddWordLang2").val("")

        /*for(var a = 0; a < listOfWords.length - 1; a++)
        {
            //console.log(listOfWords[a].lang1 + " : " + listOfWords[a].lang2)
            $("#listOfWords").append("<a href=\"#\" class=\"list-group-item\">" + listOfWords[a].lang1 + " : " + listOfWords[a].lang2 + "</a>")
        }*/

        $("#modalAddWord").modal("show")
    })

    $("#modalAddWord").on("shown.bs.modal", function() {
        $("#modalAddWordLang1").focus()
    })

    $("#modalAddWordLang2").keyup(function(event){
        var keyCode = (event.keyCode ? event.keyCode : event.which);
        if (keyCode == 13) {
            $("#modalAddWordAddBtn").trigger("click");
        }
    });

    $("#modalAddWordAddBtn").bind("click", function (e)
    {
        var word1 = $("#modalAddWordLang1").val().trim()
        var word2 = $("#modalAddWordLang2").val().trim()

        if(isEmpty(word1) && isEmpty(word2))
        {
            //swal("Du måste fylla i båda fälten!", "", "error")
            swal({   title: "Du måste fylla i båda fälten!",   text: "", type: "error",   timer: 600,   showConfirmButton: false });
            //console.log("måste fylla i båda fälten!")
            return
        }
        if(isEmpty(word1))
        {
            //swal("Du måste fylla i ett " + lang1alt + " ord!", "", "error")
            swal({   title: "Du måste fylla i ett " + lang1alt + " ord!", text: "", type: "error",   timer: 600,   showConfirmButton: false });
            return
        }

        if(isEmpty(word2))
        {
            //swal("Du måste fylla i ett " + lang2alt + " ord!", "", "error")
            swal({   title: "Du måste fylla i ett " + lang2alt + " ord!", text: "", type: "error",   timer: 600,   showConfirmButton: false });
            return
        }

        var tmpWord = new wordPair( word1 , word2 )

        console.log(tmpWord)

        listOfWords.push(tmpWord)

        console.log(listOfWords)

        //$("#listOfWords").append("<a href=\"#\" class=\"list-group-item\">" + word1 + " : " + word2 + "</a>")
        $("#modalAddWordLang1").val("")
        $("#modalAddWordLang2").val("")
        $("#modalAddWordLang1").focus()

        swal({   title: "Tillagt i listan!",   text: "",   timer: 300,   showConfirmButton: false });


    })

    $("#btnChooseFile").bind("click", function (e)
    {
        $("#modalChooseFile").modal("show")
    })

    $("#btnAbout").bind("click", function (e)
    {
        swal({   title: "Om detta glosprogram!",   text: "Har du hittat några buggar eller vill ge förslag på förbättringar? Maila gärna då \n <a href=\"mailto:&#99;&#111;&#110;&#116;&#97;&#99;&#116;&#64;&#111;&#115;&#107;&#97;&#114;&#114;&#111;&#115;&#101;&#110;&#46;&#99;&#111;&#109;?subject=Glosprogram\" target=\"_top\">&#99;&#111;&#110;&#116;&#97;&#99;&#116;&#64;&#111;&#115;&#107;&#97;&#114;&#114;&#111;&#115;&#101;&#110;&#46;&#99;&#111;&#109;</a>", type: "info", html: true });
    })

    $("#startProgramBtn").bind("click", function (e)
    {
        if(listOfWords.length == 0)
        {
            //console.log("Du måste lägga in ord")
            //swal("Det finns inga glosor. Du måste lägga till glosor!", "", "error")
            //swal({   title: "Det finns inga glosor. Du måste lägga till glosor!",   text: "", type: "error",   timer: 3000,   showConfirmButton: true });
            swal({   title: "Det finns inga glosor i listan!",   text: "", type: "error",   timer: 2000,   showConfirmButton: true });

            return
        }
        if($("#startProgramBtn").text() == "Starta Glosprogram")
        {
            $("#startProgramBtn").text("Avbryt Glosprogram")
            $("#startProgramBtn").removeClass()
            $("#startProgramBtn").addClass("btn btn-danger btn-lg")
            $("#btnNextWord").prop("disabled", false);
            $("#lang2Quizz").prop("disabled", false);
            shuffleArray()
            nextWord()
            $("#lang2Quizz").focus()
        }
        else
            resetGame()

    })

    $("#lang2Quizz").keyup(function(event){
        var keyCode = (event.keyCode ? event.keyCode : event.which);
        if (keyCode == 13) {
            $("#btnNextWord").trigger("click");
        }
    });

    $("#btnNextWord").bind("click", function (e)
    {
        if($("#lang2Quizz").val() === wordLang2)
        {
            console.log("right answer")
            nrOfCorrectAnswers++
        }
        else
        {
            console.log("wrong answer")
        }

        counter++
        nextWord()
    })

    $("#btnShowWords").bind("click", function (e)
    {
        $("#modalShowWordsListOfWords").children().remove()

        if(listOfWords.length == 0)
            $("#modalShowWordsListOfWords").append("<h2> Det finns inga glosor i listan!</h2>")

        else
            for(var a = 0; a < listOfWords.length; a++)
            {
                //console.log(listOfWords[a].lang1 + " : " + listOfWords[a].lang2)
                $("#modalShowWordsListOfWords").append("<a href=\"#\" class=\"list-group-item\"><strong>" + listOfWords[a].lang1 + " : " + listOfWords[a].lang2 + "</strong></a>")
            }

        $("#modalShowWords").modal("show")
    })

    $("#btnTest").bind("click", function (e)
    {
        var glosID = $.urlParam("glosforhor");
        console.log(glosID)
        if(typeof glosID == "undefined")
        {
            fetchFromDatabase(1)
        }
        else
        {
            fetchFromDatabase(glosID)
        }
        /*var glosID = $.urlParam("glosforhor");
        console.log(glosID)
        if(typeof glosID == "undefined")
        {
            sendGlosorToDatabase(1, listOfWords)
        }
        else
        {
            sendGlosorToDatabase(glosID, listOfWords)

        }*/
    })




})
