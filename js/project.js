$(document).ready(function(){
  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.modal-trigger').leanModal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
  });

  // register user
  $('#register').click(function(){
    var credentials = {
      username: $('#reg-email').val(),
      password: $('#reg-password').val(),
      confirmpassword: $('#reg-confirm').val()
    };
    if (credentials.password !== credentials.confirmpassword) {
      var $toastContent = $('<span>Registration Unsuccessful</span>');
      Materialize.toast($toastContent, 5000);
    } else {
      api.register(credentials, function (err) {
        if (err) { console.error(err); }
      });
    }
  }); // end submit register click handler

  // login user
  $('#login').click(function(){
    var credentials = {
      username: $('#log-email').val(),
      password: $('#log-password').val()
    };
    var loginCb = function(err) {
      if (err){
        console.error(err);
        return;
      }
      $('#current-user').html('Welcome, ' + $('#log-email').val() + '! <span class="caret"></span>');
    };
    api.login(credentials, loginCb);
  }); // end submit login click handler

  // sync openWeather
  $('#openWeather').click(function() {
    api.sync();
  });

  // chart.js
  var randomScalingFactor = function () {
    return Math.round(Math.random()*100);
  };
  var lineChartData = {
    labels : ["January","February","March","April","May","June","July"],
    datasets : [
      {
        label: "My First dataset",
        fillColor : "rgba(220,220,220,0.2)",
        strokeColor : "rgba(220,220,220,1)",
        pointColor : "rgba(220,220,220,1)",
        pointStrokeColor : "#fff",
        pointHighlightFill : "#fff",
        pointHighlightStroke : "rgba(220,220,220,1)",
        data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
      },
      {
        label: "My Second dataset",
        fillColor : "rgba(151,187,205,0.2)",
        strokeColor : "rgba(151,187,205,1)",
        pointColor : "rgba(151,187,205,1)",
        pointStrokeColor : "#fff",
        pointHighlightFill : "#fff",
        pointHighlightStroke : "rgba(151,187,205,1)",
        data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
      }
    ]
  };

  window.onload = function(){
    // var ctx = document.getElementById("canvas").getContext("2d");
    var ctx = $("#canvas").get(0).getContext("2d");

    window.myLine = new Chart(ctx).Line(lineChartData, {
      responsive: true
    });
  };


  }); // end document ready
