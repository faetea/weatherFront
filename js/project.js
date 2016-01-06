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


  }); // end document ready
