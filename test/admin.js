var DEBUG = true

var listOfWords = new Array()


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

function isEmpty(str)
{
    return (!str || 0 === str.length)
}

function fetchFromDatabase(glosID)
{

    console.log("fetchFromDatabase() " + glosID)
    $.ajax
    ({
        url: 'fetchGlosorFromDatabase.php',                //the script to call to get data
        data: "glosforhor="+glosID,       //you can insert url argumnets here to pass to api.php
                                       //for example "id=5&parent=6"
        dataType: 'json',                //data format
        success: function(data)          //on recieve of reply
        {
            console.log(data)
            $("#glosorTable").children().remove()
            $("#glosorTable").append("<tr><td align=center bgcolor=#c4c4c7>ID</td><td align=center bgcolor=#c4c4c7>Lang1</td><td align=center bgcolor=#c4c4c7>Lang2</td><td align=center bgcolor=#c4c4c7>Tid</td></tr>")

            for(var a = 0; a < data.length; a++)
            {
                $("#glosorTable").append("<tr><td align=center>" + data[a]["id"] + "</td><td align=center>" + data[a]["lang_one"] + "</td><td align=center>" + data[a]["lang_two"] + "</td><td align=center>" + data[a]["tid"] + "</td></tr>")
            }
        }
    })
}

function sendGlosorToDatabase(glosID, data)
{
    console.log("data: " + data)

    if(isEmpty(glosID))
    {
        swal("Skriv in vilket id dom ska läggas till i!", "", "error")
        return
    }
    if(isEmpty(data))
    {
        swal("Du måste ladda upp glosor!", "", "error")
        return
    }


    data.push({glosforhor: glosID});
    console.log("data: " + data)

    var jsonData = JSON.stringify(data);
    console.log("sendGlosorToDatabase() " + jsonData)

    $.ajax
    ({
        url: "insertManyGlosor.php",                //the script to call to get data
        data: {data : jsonData},

        success: function(data)          //on recieve of reply
        {
            console.log(data)
        }
    })

    swal("Glosor tillagda!", "","success")
}

function sendWordToDatabase(glosforhor, lang_one, lang_two)
{

    if(isEmpty(glosforhor))
    {
        swal("Skriv in vilket glosförhör glosan ska läggas till i!", "", "error")
        return
    }
    if(isEmpty(lang_one))
    {
        swal("Du måste skriva in ordet i lang1!", "", "error")
        return
    }
    if(isEmpty(lang_two))
    {
        swal("Du måste skriva in ordet i lang2!", "", "error")
        return
    }



    $.ajax
    ({
        url: "insertOneWord.php",                //the script to call to get data
        data: "glosforhor=" + glosforhor + "&lang_one=" + lang_one +"&lang_two=" + lang_two,

        success: function(data)          //on recieve of reply
        {
            console.log(data)
            swal("Glosa tillagda!", "","success")
        }
    })


}

function wordPair(word1, word2)
{
    this.lang1 = word1
    this.lang2 = word2
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


$(document).ready(function()
{

    readFromFile()

    $("#btnFetchGlosforhorID").bind("click", function (e)
    {
        //$.get( "admin.php", { glosforhor: $("#fetchGlosforhorID").val() } );
         //window.location.replace("http://glosor.oskarrosen.com/test/admin.php?glosforhor=" + $("#fetchGlosforhorID").val() )
         fetchFromDatabase($("#fetchGlosforhorID").val())
         $("#fetchGlosorFromDatabaseTitle").text("Glosförhör " +  $("#fetchGlosforhorID").val())
         $("#fetchGlosforhorID").val("")
    })

    $("#btnAddManyWords").bind("click", function (e)
    {
        //console.log($("#quizzIdManyWords").val())
        sendGlosorToDatabase($("#quizzIdManyWords").val(), listOfWords)
        $("#quizzIdManyWords").val("")
    })

    $("#btnAddOneWord").bind("click", function (e)
    {
        //console.log($("#quizzIdOneWord").val())
        //console.log($("#wordLang1OneWord").val())
        //console.log($("#wordLang2OneWord").val())

        sendWordToDatabase($("#quizzIdOneWord").val(), $("#wordLang1OneWord").val(), $("#wordLang2OneWord").val())

    })



})
