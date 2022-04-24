 $(function (){
     let gmailId = $('#gmailId');
     let gmailIdSubBtn = $('#gmailIdSubBtn');
     let otp = $('#otp');
     let otpSubBtn = $('#otpSubBtn');
     let preloader = $('#preloader');
     let otpFromServer = -1;
     function applypreloadercss()
     {
        preloader.css('margin-left', "465px");
        preloader.css("width", "400px");
        preloader.css("height", "400px");
        preloader.css("background-repeat", "no-repeat");
        preloader.css("display", "flex");
        preloader.css("position", "fixed");
        preloader.css("background-image", "url('./preloader.gif')");

     }
      gmailIdSubBtn.click(function(){
          applypreloadercss();
          $.post('/api/forget-pass-otp',
          {
              mailId: gmailId.val()
          },
          function(data)
          {
              preloader.removeAttr('style');
              //console.log(data);
              if(data.otp != null)
              {
                otpFromServer = data.otp;
                window.alert('otp sent successfully');
              }
              else
              {
                window.alert("some error occured your mail id may be wrong please try again");
              }
          }
          )

      });
      otpSubBtn.click(function(){
          if(otp.val() != otpFromServer)
          {
              //window.alert(otp.val() + " == " + otpFromServer);
              window.alert("otp is invalid");
          }
          else
          {
            applypreloadercss();
            $.post('/api/forget-pass-success',
            {
                mailId: gmailId.val()
            },
            function(data)
            {
                preloader.removeAttr('style');
                if(data.status == 'fail')
                {
                    window.alert("some error occured");
                }
                else
                {
                    window.alert("Password has been sent to your mail id");
                }
            }
            )
          }
      });

 })