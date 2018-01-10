function placeMessage(messageNo)
{
        console.log("In placeMessage"); 
    var newMessage;
    SAPsy.myLastMsg = messageNo;
    switch (messageNo) {
        case 0:
            newMessage = "";
            break;
        case 1:
            newMessage = "[01]Invalid Client. 010, 020, 030 possible.";
            break;
        case 2:
            newMessage = "[02]User must start with Q or q.";
            break;   
        case 3:
            newMessage = "[03]User have exactly 7 characters.";
            break; 
        case 4:
            newMessage = "[04]User must be alphanumeric.";
            break;  
        case 5:
            newMessage = "[05]The last 4 characters of your User must be digits.";
            break; 
        case 6:
            newMessage = "[06]Your Password must be alpha numeric.";
            break;  
        case 7:
            newMessage = "[07]Your passwpord may not have capitals in it.";
            break;  
        case 8:
            newMessage = "[08]Your passwpord must start with a letter.";
            break;  
        case 9:
            newMessage = "[09]Your Password may have no more than 4 digits.";
            break;  
        case 10:
            newMessage = "[10]Your Password may not be the same as User.";
            break;    
        case 11:
            newMessage = "[11]Only languages \"EN\" and \"DE\" are loaded";
            break; 
        case 12:
            newMessage = "[12]Please enter a password";
            break;  
        case 13:
            newMessage = "[13]WARNING: That function has not been implemented.  Please try a different function.";
            break; 
        case 14:
            newMessage = "[14]Selection is not valid!  Pleasew choose a valid option.";
            break;
        case 15:
            newMessage = "[15]Can not go back to logon screen! Use LOGOFF";
            break;
        case 16:
            newMessage = "[16]Bin to Bin TO submitted.";
            break;  
        case 17:
            newMessage = "[17]Field must be filled.";
            break; 
        case 18:
            newMessage = "[18]Field must have excatly 3 characters.";
            break; 
        case 19:
            newMessage = "[19]Field must have 9 digits";
            break;  
        case 20:
            newMessage = "[20]Field can only be formatted ######### or ###-######";
            break; 
        case 21:
            newMessage = "[21]Bin must start with Stor.Typ.";
            break;   
        case 22:
            newMessage = "[22]Field must be alphanumeric.";
            break;     
        case 23:
            newMessage = "[23]Field must be numeric.";
            break; 
        case 24:
            newMessage = "[24]Field can only be formatted ######### or #######-##";
            break;  
        case 25:
            newMessage = "[25]Field must be decimal";
            break;    
        default:
	    console.log("In placeMessage / " + messageNo );
            newMessage = "[00]SYSTEM ERROR : Missing Message";
    }
    if (SAPsy.footerShows === false  && messageNo > 0 )
    {
        var tempMessNo = messageNo;
	tempMessNo = 0;
	console.log("Your alert has popped up for message " + tempMessNo  );
	window.alert(newMessage);
    }
    if (messageNo > 0) 
    {
/*  Change the messageShows flag, unhide the message footer element,  Place the 
    message in the message footer element. */        
        messageShows = true;
        var ftrEle = document.getElementsByClassName('footer-1');
        for(var i = 0; i < ftrEle.length; i++)
        {
            ftrEle[i].innerHTML = newMessage;
            ftrEle[i].style.display = 'block';   
        }       
    } 
    else 
    {
/*  Change the messageShows flag to show, hide the message footer element,  
    Place the message in the message footer element. */         
        messageShows = false;
        var ftrEle = document.getElementsByClassName('footer-1');
        for(var i = 0; i < ftrEle.length; i++)
        {
            ftrEle[i].innerHTML = newMessage;
            ftrEle[i].style.display = 'none';   
        }              
    }
}