var DEBUG = true
var listOfWords = new Array()
var listOfWordsWrong = new Array()
var listOfWordsCorrect = new Array()

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

    listOfWordsWrong = []
    listOfWordsCorrect = []

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
        showResultFromQuizz();
        resetGame();
        return;
    }
    $("#guiwordsLeft").text("Det är " + (listOfWords.length - counter) + " ord kvar!")


    console.log(lang1 + ":  " + listOfWords[counter].lang1 + "   |   " + lang2 + ": "  + listOfWords[counter].lang2)

    wordLang1 = listOfWords[counter].lang1
    wordLang2 = listOfWords[counter].lang2

    $("#lang1Quizz").val(listOfWords[counter].lang1)
}

function deleteWordFromList(val1, val2)
{
  console.log(listOfWords)
  for(var a = 0; a < listOfWords.length; a++)
  {
    if(listOfWords[a].lang1 == val1 && listOfWords[a].lang2 == val2)
       listOfWords.splice(a, 1);
  }
  console.log(listOfWords)
}

function showResultFromQuizz()
{
  $("#modalResultTitle").text(listOfWordsCorrect.length + " av " + listOfWords.length + " rätt!");

  if(listOfWordsCorrect.length == 0)
      $("#modalResultListCorrect").append("<h5> Du hade inga rätt.</h5>")
  else
    for(var a = 0; a < listOfWordsCorrect.length; a++)
    {
      $("#modalResultListCorrect").append("<a href=\"#\" class=\"list-group-item\"><p class=\"alignleft\">" + listOfWordsCorrect[a].lang1 + "</p> &nbsp; <p class=\"alignright\">" + listOfWordsCorrect[a].lang2 + "</p></a>")
    }

  if(listOfWordsWrong.length == 0)
      $("#modalResultListWrong").append("<h5> Du hade inga fel.</h5>")
  else
    for(var a = 0; a < listOfWordsWrong.length; a++)
    {
      $("#modalResultListWrong").append("<a href=\"#\" class=\"list-group-item\"><p class=\"alignleft\">" + listOfWordsWrong[a].lang1 + "</p> &nbsp; <p class=\"alignright\">" + listOfWordsWrong[a].lang2 + "</p></a>")
    }


  $("#modalResult").modal("show")


}

function setLanguage()
{
  $("#guiLang1").text(lang1)
  $("#guiLang2").text(lang2)

  $("#guimodalAddWordLang1").text(lang1)
  $("#guimodalAddWordLang2").text(lang2)

  $("#modalShowWordsLanguage1").text(lang1);
  $("#modalShowWordsLanguage2").text(lang2);

  $("#modalSettingsLang1").val(lang1);
  $("#modalSettingsLang2").val(lang2);
}


$(document).ready(function()
{
    /*listOfWords.push(new wordPair("hund","dog"))
    console.log(listOfWords)
    listOfWords.push(new wordPair("bil","car"))
    console.log(listOfWords)*/

    readFromFile()

    setLanguage()

    listOfWords.push(new wordPair("hej", "hello"));
    listOfWords.push(new wordPair("bil", "car"));

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
      var email_adress = "&#111;&#115;&#107;&#97;&#114;&#64;&#111;&#115;&#107;&#97;&#114;&#114;&#111;&#115;&#101;&#110;&#46;&#99;&#111;&#109;";
      var message = "Har du hittat några buggar eller vill ge förslag på förbättringar? Maila gärna då \n <a href=\"mailto:";
      message += email_adress
      message += "?subject=Glosprogram\" target=\"_top\">"
      message += email_adress;
      message += "</a>";

      swal({ title: "Om detta glosprogram!", text: message, type: "info", html: true });
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

    $("#lang2Quizz").keyup(function(event)
    {
        var keyCode = (event.keyCode ? event.keyCode : event.which);
        if (keyCode == 13) {
            $("#btnNextWord").trigger("click");
        }
    });

    $("#btnNextWord").bind("click", function (e)
    {
        if($("#lang2Quizz").val().length == 0)
        {

          return;
        }
        if($("#lang2Quizz").val().toLowerCase() === wordLang2.toLowerCase())
        {
            console.log("right answer")
            listOfWordsCorrect.push(new wordPair(wordLang1, wordLang2));
            nrOfCorrectAnswers++
        }
        else
        {
            console.log("wrong answer");
            listOfWordsWrong.push(new wordPair(wordLang1, wordLang2));
        }

        counter++
        nextWord()
        $("#lang2Quizz").focus()
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
                $("#modalShowWordsListOfWords").append("<a href=\"#\" class=\"list-group-item\"><p class=\"alignleft\">" + listOfWords[a].lang1 + "</p> &nbsp; <p class=\"alignright\">" + listOfWords[a].lang2 + "</p></a>")
            }

        $("#modalShowWords").modal("show");
    })

    $("#modalShowWordsListOfWords").bind("click", "a .list-group-item", function (e)
    {
      //console.log($(this).val())
      //val1 = $(this).text().split(":")[0].trim()
      //val1 = $(this).find(e.target).text().split(":")[0].trim();
      val1 = $(this).find(e.target).text().split(" ")[0].trim();
      val2 = $(this).find(e.target).text().split(" ")[2].trim();
      //console.log(val1)
      //console.log(val2)

      $(this).find(e.target).toggleClass("active").siblings().removeClass("active");

      if($(this).find(".list-group-item.active").length > 0)
        $("#modalShowWordsRemoveSelectedWord").removeClass("disabled")
      else
        $("#modalShowWordsRemoveSelectedWord").addClass("disabled")
    })

    $("#modalShowWordsRemoveSelectedWord").bind("click", function (e)
    {
      if($(this).hasClass("disabled"))
        return;

      val1 = $("#modalShowWordsListOfWords").find(".list-group-item.active").text();
      val2 = $("#modalShowWordsListOfWords").find(".list-group-item.active").text();
      console.log(val1)
      if(val1.length == 0 || val2.length == 0)
      {
        swal("Error!", "You must select an item from the list!", "error");
        return;
      }

      val1 = val1.split(" ")[0].trim();
      val2 = val2.split(" ")[2].trim();
      console.log(val1)
      console.log(val2)

      /*swal({
        title: "Ta bort från listan",
        text: "Är du säker på att du vill ta bort från listan?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Ja!",
        closeOnConfirm: false
      },
      function()
      {
        deleteWordFromList(val1, val2);
      });*/

      deleteWordFromList(val1, val2);
      $('#modalShowWords').modal('hide');


      //console.log($("#modalShowWordsListOfWords"))
      //listOfWords = [];
    })


    $("#modalSettingsRemoveAllWords").bind("click", function (e)
    {
      if($("#modalSettingsRemoveAllWords").hasClass("disabled"))
        return;

      listOfWords = [];
      $("#modalSettings").modal("hide");
    })

    $("#btnSettings").bind("click", function (e)
    {
      if(listOfWords.length == 0)
        $("#modalSettingsRemoveAllWords").addClass("disabled");
      else
        $("#modalSettingsRemoveAllWords").removeClass("disabled");

      $("#modalSettings").modal("show");
    })

    $("#modalShowWords").on("hidden.bs.modal", function (e)
    {
      $("#modalShowWordsRemoveSelectedWord").addClass("disabled")
      $("#modalShowWordsListOfWords").children().remove();
    })

    $("#modalResult").on("hidden.bs.modal", function (e)
    {
      $("#modalResultTitle").text("");
      $("#modalResultListCorrect").children().not("h4").remove();
      $("#modalResultListWrong").children().not("h4").remove();
    })

    $("#modalSettingsSaveBtn").bind("click", function (e)
    {
      lang1 = $("#modalSettingsLang1").val();
      lang2 = $("#modalSettingsLang2").val();

      setLanguage();

      $("#modalSettings").modal("hide");
    })







})
