$(document).ready(function(){
  $(".button-collapse").sideNav();
  // $('.collapsible').collapsible();

  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.modal-trigger').leanModal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
  });

  // $("#add-entry").hide();

  var dtf = new Intl.DateTimeFormat('en-us', { year: "numeric", month: "short", day: "numeric", hour: "2-digit" });

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
    $('#reg-email').val("");
    $('#reg-password').val("");
    $('#reg-confirm').val("");
  }); // end submit register click handler

  // login user
  $('#login').click(function(){
    var credentials = {
      username: $('#log-email').val(),
      password: $('#log-password').val()
    };
    var loginCb = function (err) {
      if (err){
        console.error(err);
        return;
      }
      $('.current-user').html('Welcome, ' + $('#log-email').val() + '! <i class="mdi-navigation-arrow-drop-down right"></i>');
      api.showList(function (err, data) {
        if (err) {
          console.error(err);
        }
        console.log(data);
        // reverse list, most recent entries at top
        data.logs.reverse();
        for (var i = 0; i < data.logs.length; i++) {
          console.log(data.logs[i].createdAt);
          data.logs[i].createdAt = dtf.format(new Date(data.logs[i].createdAt));
        }
        // handlebars
        var entryIndexTemplate = Handlebars.compile($('#entry-script').html());
        var newHTML = entryIndexTemplate(data);
        $("#list-view").html(newHTML);
      });
    };
    api.login(credentials, loginCb);
    $('#log-password').val("");
  }); // end submit login click handler

  // logout user
  $('.logout').click(function(){
    var logoutCb = function (err) {
      if (err){
        console.error(err);
      }
      $('.current-user').html('Login/Register<i class="mdi-navigation-arrow-drop-down right"></i>');

    };
    api.logout(logoutCb);
  });


  // sync openWeather
  $('#openWeather').click(function() {
    api.sync();
  });


  $('#add-entry-button').click(function(){
    $("#add-entry-form").show();
  });


  $('.cancel').click(function(){
    // hide form
    // $("#add-entry").hide();
    $("#pain").val("");
    $("#mood").val("");
    $("#note").val("");
    $("#symptoms").val("");
    $("#medication").val("");
  });


  $('#save-entry-button').click(function(){
    var newEntry = {
        "pain":$("#pain").val(),
        "mood":$("#mood").val(),
        "note":$("#note").val(),
        "symptoms":$("#symptoms").val(),
        "medication":$("#medication").val(),
    };
    api.createEntry(newEntry,
      function (err) {
        if (err) {
          console.error(err);
          var $toastContent = $('<span>New Entry Unsuccessful!</span>');
          Materialize.toast($toastContent, 5000);
        }
      });
    // hide form
    // $("#add-entry").hide();
  });


  // list health entry button click handler
  $('#list-entries-button').click(function(){
    api.showList(function (err, data) {
      if (err) {
        console.error(err);
      }
      console.log(data);
      // reverse list, most recent entries at top
      data.logs.reverse();
      for (var i = 0; i < data.logs.length; i++) {
        console.log(data.logs[i].createdAt);
        data.logs[i].createdAt = dtf.format(new Date(data.logs[i].createdAt));
      }
      // handlebars
      var entryIndexTemplate = Handlebars.compile($('#entry-script').html());
      var newHTML = entryIndexTemplate(data);
      $("#list-view").html(newHTML);
    });
  });


  // chart.js
  var lineChartData = {
    labels : [],
    datasets : [
      {
        label: "My First dataset",
        fillColor : "rgba(220,220,220,0.2)",
        strokeColor : "rgba(220,220,220,1)",
        pointColor : "rgba(220,220,220,1)",
        pointStrokeColor : "#fff",
        pointHighlightFill : "#fff",
        pointHighlightStroke : "rgba(220,220,220,1)",
        data : []
      }
    ]
  };

  window.onload = function(){
    // var ctx = document.getElementById("canvas").getContext("2d");
    var ctx = $("#canvas").get(0).getContext("2d");

    // pressure data
    api.pressure(function (err, data) {
      if (err) {
        console.error(err);
      } else {
        lineChartData.datasets[0].data = data.pressures;
        lineChartData.labels = data.createdAts;

        window.myLine = new Chart(ctx).Line(lineChartData, {
          responsive: true
        });
      }
    });

  };


  }); // end document ready
