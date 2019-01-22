function start() {
    if ($("#friendName").val() === "" || $("#friendPhoto").val() === "" || $("#q1").val() === "" || $("#q2").val() === "" || $("#q3").val() === "" || $("#q4").val() === "" || $("#q5").val() === "" || $("#q6").val() === "" || $("#q7").val() === "" || $("#q8").val() === "" || $("#q9").val() === "" || $("#q10").val() === "") {
        alert("Please fill out all fields before submitting!");
        $("#friendName").val("");
        $("#friendPhoto").val("");
        $("#q1").val("");
        $("#q2").val("");
        $("#q3").val("");
        $("#q4").val("");
        $("#q5").val("");
        $("#q6").val("");
        $("#q7").val("");
        $("#q8").val("");
        $("#q9").val("");
        $("#q10").val("");
    } else {
      var newFriend = {
          name: $("#friendName").val().trim(),
          photo: $("#friendPhoto").val().trim(),
          scores: [$("#q1").val(),
              $("#q2").val(),
              $("#q3").val(),
              $("#q4").val(),
              $("#q5").val(),
              $("#q6").val(),
              $("#q7").val(),
              $("#q8").val(),
              $("#q9").val(),
              $("#q10").val()
          ]
      };
      var newScore = 0;

      for (var i = 0; i < newFriend.scores.length; i++) {
          newScore += parseInt(newFriend.scores[i]);
      }

      console.log("newscore is: "+ newScore);
      Array.min = function(array) {
          return array.indexOf(Math.min.apply(Math, array));
      };

      var currentURL = window.location.origin;

      $.ajax({
            url: currentURL + "/api/friends",
            method: "GET"
        })
        .done(function(friendData) {
            var friendScoresRaw = [];
            var friendCheck = 0;
            var checkList = [];
            var finalList = [];
            for (var m = 0; m < friendData.length; m++) {
                friendScoresRaw.push(friendData[m].scores);
            }
            console.log("friendScoresRaw: "+ friendScoresRaw);
            for (var i = 0; i < friendScoresRaw.length; i++) {
                var friendScores = [];
                for (var j = 0; j < friendScoresRaw[i].length; j++) {
                    friendScores.push(parseInt(friendScoresRaw[i][j]));
                }
                console.log("friendScores: " +friendScores);
                friendCheck = 0;
                if (friendScores.length > 9) {
                    for (var k = 0; k < friendScores.length; k++) {
                        friendCheck += friendScores[k];
                    }
                    checkList.push(friendCheck)
                }
            }
            console.log("checkList: " + checkList);
            for (var i = 0; i < checkList.length; i++) {
                var absValue = Math.abs(checkList[i] - newScore);
                finalList.push(absValue);
            }
            console.log("finalList: "+ finalList);
            var answerArray = [];
            for (var l=0; l<finalList.length; l++){
                if (finalList[l] ==! 0) {
                    answerArray.push(finalList[l]);
                }

            }
            var answer = Math.abs(Array.min(answerArray));

            console.log("answer: " + answer);


            for (var h = 0; h < friendData.length; h++) {
                if (h === answer) {
                    console.log("Your Match is: \n "+ JSON.stringify(friendData[h]));
                    $(".nameModal").html(""+friendData[h].name+"");
                    $('.imageModal').attr('src', friendData[h].photo);
                }
            }
          });
      $.post("/api/friends", newFriend,
          function(data) {
              $("#friendName").val("");
              $("#friendPhoto").val("");
              $("#q1").val("");
              $("#q2").val("");
              $("#q3").val("");
              $("#q4").val("");
              $("#q5").val("");
              $("#q6").val("");
              $("#q7").val("");
              $("#q8").val("");
              $("#q9").val("");
              $("#q10").val("");
              $("#ex2").trigger("click");
          });
    }
}
// $(document).ready(function(){
//     $(".submit").on("click", function(event) {
//         // event.preventDefault();
//         // start();
//         console.log("does this even work?");
//     });
// });