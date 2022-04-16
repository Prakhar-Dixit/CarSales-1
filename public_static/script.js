 $(function (){
     let gmailId = $('#gmailId');
     let gmailIdSubBtn = $('#gmailIdSubBtn');
     let otp = $('#otp');
     let otpSubBtn = $('#otpSubBtn');
     let otpFromServer = -1;
      gmailIdSubBtn.click(function(){
          $.post('/api/forget-pass-otp',
          {
              mailId: gmailId.val()
          },
          function(data)
          {
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
            $.post('/api/forget-pass-success',
            {
                mailId: gmailId.val()
            },
            function(data)
            {
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