/* 
   ##############################################################
   # Coder - Neal Wilhite   BMWMC - FG-AM-61 - ITS Mobile team  #
   # Proj - Practice Web Design                                 #
   # Started - 10/16/2017           Last Tested - 01/04/2018    #
   #                                                            #
   # Known errors with this version                             #
   # *  in process-choose.html incorrect fill of field slct     #
   #                                                            #
   # Version Updates                                            #
   # v1.0   11/17/2017      Initial version sent to Jason       #  
   # v1.1   01/04/2018      Eliminates Slct check fail & submit #
   ##############################################################
*/


/* Setup System Object */

var SAPsy = 
{
//    myLastMsg: "0",
//    myLastScreen: "0000",
    Client: "010",
    User: " ",
    PW: " ",  
    Spras: "EN",
    Screen: "0100",
    myCurrScreen: "0000",
    mandt: "010",
    footerShows: true,
    thisForm: "",
    nextScreen: "",
    supLocStor: false, // the value returned when checking if browser 
                       // supports local storage
// parameters below this point are mainly for Debugging    
    submittedAt: 0,
    msg0At: 0,
    onSubmitCnt: 0,
    
// System Object Functions    
    changeMandt: function () 
    {
        console.log("In SAPsy.changeMandt");
        document.getElementById("SAP-mandt").innerHTML = this.mandt;
    }    
} 

// ***************  Default Functions  ***************

//interface Storage {
//  getter any getItem(in DOMString key);
//  setter creator void setItem(in DOMString key, in any data);
//}


// ***************  Super Structure Controls  ***************
/*        
  This keeps the footer from covering the bottom edge of the language field.
  All footer elements are hidden if the screen is shorter than this.  
*/ 

function hideFooter()
{
    console.log("In hideFooter"); 
    var h = window.innerHeight;
    console.log(h);
    switch (SAPsy.myCurrScreen)
    {
        case "0100":
            SAPsy.minScnHeight = 350;
            break;
        case "0200":
            SAPsy.minScnHeight = 515;
            break; 
        case "7000":
            SAPsy.minScnHeight = 535;
            break;  
        default:
            SAPsy.myCurrScreen = '0000';
            break;
    }
    if (SAPsy.minScnHeight <= h) 
// 350 is approximately the window height where the footer starts to 
// interfer with the language field    
    {
        var ftrEle = document.getElementsByClassName('footer');
        for(var i = 0; i < ftrEle.length; i++)
        {
            ftrEle[i].style.display = 'block';
        }
        SAPsy.footerShows = true;
    }
    else
    {
        ftrEle = document.getElementsByClassName('footer');
        for(i = 0; i < ftrEle.length; i++)
        {
            ftrEle[i].style.display = 'none';   
        }
        SAPsy.footerShows = false;
// When this is true, message should automatically popup        
    }
    
    console.log("Out of hideFooter"); 

}

// ***************  Field Value Tests  *************** 
/*
  The client and the language fields are both testable on field exit. 
  Therefore, I test them in the 
*/
function clientLangTest()
{
    console.log("In clientLangTest"); 
// Only clients 010, 020, 030 are available  
    if ("010" !== document.getElementById("SAP-Client").value &&
        "020" !== document.getElementById("SAP-Client").value &&
        "030" !== document.getElementById("SAP-Client").value 
        )
    {      
        document.getElementById("SAP-Client").focus();
        document.getElementById("SAP-Client").value = "010";
        placeMessage(1);
        console.log(document.getElementById("SAP-Client").value);

    }
// Only languages EN and DE are loaded     
    else if ("EN" !== document.getElementById("SAP-Spras").value &&
             "DE" !== document.getElementById("SAP-Spras").value) 
    {       
        document.getElementById("SAP-Spras").focus();
        placeMessage(11);
        console.log(document.getElementById("SAP-Spras").value);             
    }
// Otherwise, messages should be cleared and the footer message box hidden     
    else
    { 
        console.log("Client " + document.getElementById("SAP-Client").value
                    + "  Spras " + 
                    document.getElementById("SAP-Spras").value);
        
        SAPsy.msg0At = 123;
        localStorage.setItem('msg0At', SAPsy.msg0At); 

        placeMessage(0);
        SAPsy.mandt = document.getElementById("SAP-Client").value;
    }
}

function userPWTest()
{
    console.log("In userPWTest");   
    var i;
    SAPsy.mandt = document.getElementById("SAP-Client").value;
    console.log("SAPsy.mandt = " + SAPsy.mandt); 
    var myPassword = document.getElementById("SAP-PW").value;
    var pwDigitCt;
    pwDigitCt = 0;
    for (i = 1; i < myPassword.length; i++) 
    {
       var pwChar = myPassword.substring(i, i + 1);       
       if (pwChar.match(/[0-9]+/g)) 
       {
          pwDigitCt++;
       }
    }
    var myUser = document.getElementById("SAP-User").value;
    var myUserFC = myUser.substring(0, 1);
    var myUserl4 = myUser.substring(myUser.length - 4, myUser.length + 1); 
    var myPassWFC = myPassword.substring(0, 1);    
    console.log("Last 4 Digits " + "|" + myUserl4 + "|");
    console.log("User Length" + myUser.length);
//  User must start with a q    
    if ( (myUserFC !== "Q") && (myUserFC !== "q") ) 
    {        
        document.getElementById("SAP-User").focus();
        placeMessage(2);
        console.log(document.getElementById("SAP-User").value);
    } 
//  User must be exactly 7 characters       
    else if (myUser.length != 7)    
    {   
        document.getElementById("SAP-User").focus();
        placeMessage(3);
        console.log(document.getElementById("SAP-User").value);  
    } 
//  User must be alphanumeric    
    else if (myUser.match(/[^a-zA-Z0-9]+/g))     
    {
        document.getElementById("SAP-User").focus();
        placeMessage(4);
        console.log(document.getElementById("SAP-User").value);  
    }   
//  User must end in 4 digits    
    else if (myUserl4.match(/[^0-9]+/g))     
    {
        document.getElementById("SAP-User").focus();
        placeMessage(5);
        console.log(document.getElementById("SAP-User").value);  
    }    
//  Password must be alpha numeric     
    else if (myPassword.match(/[^a-zA-Z0-9]+/g))     
    {  
        document.getElementById("SAP-PW").focus();
        placeMessage(6);
        console.log(document.getElementById("SAP-PW").value);  
    } 
//  Password must be all lower case 
    else if (myPassword.match(/[A-Z]/g))     
    {      
        document.getElementById("SAP-PW").focus();
        placeMessage(7);
        console.log(document.getElementById("SAP-PW").value);   
    }  
//  Password must start with alpha  
    else if (myPassWFC.match(/[^a-zA-Z]+/g))     
    {       
        document.getElementById("SAP-PW").focus();
        placeMessage(8);
        console.log(document.getElementById("SAP-PW").value);  
    } 
//  Password may have no more than 4 digits    
    else if (pwDigitCt > 4) 
    {
        document.getElementById("SAP-PW").focus();
        placeMessage(9);
        console.log(document.getElementById("SAP-PW").value);
    }
//  Password may not be the same as User     
    else if (myPassword == myUser) 
    { 
        document.getElementById("SAP-PW").focus();   
        placeMessage(10);
        console.log(document.getElementById("SAP-PW").value);          
    } 
//  Password may not be blank      
    else if (myPassword === "") 
    {
        document.getElementById("SAP-PW").focus();   
        placeMessage(12);
        console.log(document.getElementById("SAP-PW").value);          
    }
// Ready to submit to next screen     
    else
    {   
        
        SAPsy.msg0At = 228;
        localStorage.setItem('msg0At', SAPsy.msg0At);
        
        placeMessage(0);
        console.log(document.getElementById("SAP-User").value); 

        document.getElementById("SAP-Client").disabled=true;
        document.getElementById("SAP-User").disabled=true;
        document.getElementById("SAP-PW").disabled=true;
        document.getElementById("SAP-Spras").disabled=true;
        document.getElementById("SAP-Screen").disabled=true;        
        localStorage.setItem('SAP-Client', 
                    document.getElementById('SAP-Client').value);
        localStorage.setItem('SAP-User', 
                    document.getElementById('SAP-User').value);
        localStorage.setItem('SAP-PW', 
                    document.getElementById('SAP-PW').value);
        localStorage.setItem('SAP-Spras', 
                    document.getElementById('SAP-Spras').value); 
        localStorage.setItem('SAP-Screen', 
                    document.getElementById('SAP-Screen').value); 
        
        SAPsy.thisForm = 'logonId';
        SAPsy.nextScreen = 'process-choose.html';
        nextScreen();        
        
    }
}  

function slctFldTest()
{
    console.log("In slctFldTest");
    var mySlct = document.getElementById("slctFld").value;
    console.log("In slctFldTest / mySlct = " + mySlct);
    switch (mySlct) 
    {
        case "1": 
        case "2": 
        case "3": 
        case "4": 
        case "5": 
        case "6":
        placeMessage(13);
        document.getElementById("slctFld").focus(); 
        console.log("In slctFldTest / 1-6 chosen");
        break;
    case "7":
            
        SAPsy.msg0At = 279;
        localStorage.setItem('msg0At', SAPsy.msg0At); 
 
        placeMessage(0);
        document.getElementById("slctFld").focus();   
        console.log("In slctFldTest / 7 chosen");
        // goto Bin2Bin.html via submit
        SAPsy.action = "Bin2Bin.html";
        submitNotIndx();
        break;

    case "":
        console.log("In slctFldTest / Focus is on " + 
                        document.activeElement.id);
        var myBtnId = document.activeElement.id;
        switch (myBtnId) {
            case "bin2BinBtn":
                SAPsy.action = "Bin2Bin.html";
                submitNotIndx();
                break;
            default:
                break;
        }
    default:

        document.getElementById("slctFld").focus(); 
        console.log("In slctFldTest / default chosen");
        placeMessage(14);
        break;
    }    
}

function testBin2Bin(){
    console.log("In testBin2Bin");
    var fBinVal = document.getElementById("SAP-FBin").value;
    var digiFBinVal = digitCount(fBinVal);
    var tBinVal = document.getElementById("SAP-TBin").value;
    var digiToBinVal = digitCount(tBinVal); 
    var mTypVal = document.getElementById("SAP-MTyp").value;
//    SAPsy.mTypVal1 = mTypVal;  placed here to enable debug
    var matnr = document.getElementById("SAP-Matnr").value;
    var digitMatnr = digitCount(matnr);
    var menge = document.getElementById("SAP-Menge").value;
    var decMenge = decCount(menge);
    
    if (document.getElementById("SAP-WHs").value === null ) 
    {
        placeMessage(17);
        document.getElementById("SAP-WHs").focus();
        returnValue = false;
    }
    else if (document.getElementById("SAP-WHs").value.length !== 3)
    {
        placeMessage(18);
        document.getElementById("SAP-WHs").focus();        
        returnValue = false;
    }
    else if (document.getElementById("SAP-STyp").value === null ) 
    {
        placeMessage(17);
        document.getElementById("SAP-STyp").focus();
        returnValue = false;
    }
    else if (document.getElementById("SAP-STyp").value.length !== 3)
    {
        placeMessage(18);
        document.getElementById("SAP-STyp").focus();        
        returnValue = false;
    }
    else if (digiFBinVal !== 9)
    {
        console.log("In testBin2Bin / fBinVal" + fBinVal + " / " + digiFBinVal);
        placeMessage(19);
        document.getElementById("SAP-FBin").focus();        
        returnValue = false;
    }  
    else if (fBinVal.substring(3, 4) !== "-" && 
             fBinVal.length === 10)
    {
        placeMessage(20);
        document.getElementById("SAP-FBin").focus();        
        returnValue = false;
    }  
    else if (fBinVal.substring(0, 3) !== 
             document.getElementById("SAP-STyp").value)
    {
        placeMessage(21);
        document.getElementById("SAP-FBin").focus();        
        returnValue = false;
    } 
    else if (document.getElementById("SAP-MTyp").value === null ) 
    {
        placeMessage(17);
        document.getElementById("SAP-MTyp").focus();
        returnValue = false;
    }
    else if (document.getElementById("SAP-MTyp").value.length !== 3)
    {
        placeMessage(18);
        document.getElementById("SAP-MTyp").focus();        
        returnValue = false;
    }     
// The next 3 evaluate MTyp composition
    else if (mTypVal.substring(0, 1) === "6" && mTypVal.match(/[^a-zA-Z0-9]+/g)
            ) 
    {
        placeMessage(22);
        document.getElementById("SAP-MTyp").focus();        
        returnValue = false;
    } 
    else if (mTypVal.substring(0, 1).match(/[0-57-9]+/g) &&        
             mTypVal.match(/[^0-9]+/g)
            ) 
    {
        placeMessage(23);
        document.getElementById("SAP-MTyp").focus();        
        returnValue = false;
    }   
    else if (mTypVal.match(/[^0-9a-zA-Z]+/g) ) 
    {
        placeMessage(22);
        document.getElementById("SAP-MTyp").focus();        
        returnValue = false;
    }   
    else if (digitMatnr !== 9)
    {
        console.log("In testBin2Bin / " + matnr + " / " + digitMatnr);
        placeMessage(19);
        document.getElementById("SAP-Matnr").focus();        
        returnValue = false;
    }  
    else if (matnr.substring(7, 8) !== "-" && 
             matnr.length === 10)
    {
        placeMessage(24);
        document.getElementById("SAP-Matnr").focus();        
        returnValue = false;
    }
    else if (document.getElementById("SAP-Menge").value === "") 
    {
        placeMessage(17);
        document.getElementById("SAP-Menge").focus();        
        returnValue = false;
    } 
 
    else if (document.getElementById("SAP-Menge").value.match(/[^0-9.]+/g) ) 
    {
        placeMessage(23);
        document.getElementById("SAP-Menge").focus();        
        returnValue = false;
    } 
    else if (decMenge > 1)
    {
        placeMessage(25);
        document.getElementById("SAP-Menge").focus();        
        returnValue = false;
    }    
    else if (document.getElementById("SAP-Meins").value === "") 
    {
        placeMessage(17);
        document.getElementById("SAP-Meins").focus();        
        returnValue = false;
    }
    else if (digiToBinVal !== 9)
    {
        placeMessage(19);
        document.getElementById("SAP-TBin").focus();        
        returnValue = false;
    }  
    else if (tBinVal.substring(3, 4) !== "-" && 
             tBinVal.length === 10)
    {
        placeMessage(20);
        document.getElementById("SAP-TBin").focus();        
        returnValue = false;
    }  
    else if (tBinVal.substring(0, 3) !== 
             document.getElementById("SAP-STyp").value)
    {
        placeMessage(21);
        document.getElementById("SAP-TBin").focus();        
        returnValue = false; 
    }
    else 
    {
        var returnValue = true;
    }
    
    return returnValue;
}

function fillForm()
{
    console.log("In fillForm");      
//    var sy = document.URL //.searchParams.get("SAP-Client");
//    console.log("Show URL : |" + sy + "|");
//    var parm = getUrlVars();
    SAPsy.Client = localStorage.getItem("SAP-Client");
    SAPsy.User = localStorage.getItem("SAP-User");
    SAPsy.PW = localStorage.getItem("SAP-PW");    
    SAPsy.Spras = localStorage.getItem("SAP-Spras");
    SAPsy.Screen = localStorage.getItem("SAP-Screen");
    
    SAPsy.submittedAt = localStorage.getItem("submittedAt");
    SAPsy.onSubmitCnt = localStorage.getItem("onSubmitCnt")
    
/*    
    localStorage.removeItem("SAP-Client");
    localStorage.removeItem("SAP-User");
    localStorage.removeItem("SAP-PW");    
    localStorage.removeItem("SAP-Spras"); 
    localStorage.removeItem("SAP-Screen");
*/    

    console.log("Show first parameter : |" + SAPsy.Client + "|" 
                + SAPsy.User + "|" 
//                + SAPsy.PW + "|" 
                + SAPsy.Spras + "|" + SAPsy.Screen + "|" );
    document.getElementById("SAP-ClientH").value = SAPsy.Client;
    document.getElementById("SAP-mandt").innerHTML = SAPsy.Client;
    document.getElementById("SAP-UserH").value = SAPsy.User;
    document.getElementById("SAP-PWH").value = SAPsy.PW;  
    document.getElementById("SAP-SprasH").value = SAPsy.Spras; 
    document.getElementById("SAP-Screen").value = SAPsy.Screen;     
    
}

function chsLoad ()
{
    console.log("In chsLoad ||"); 
    
    SAPsy.supLocStor = supLocStorFn();
    console.log("This browser supports local storage = " + SAPsy.supLocStor);
       
    if (document.getElementById("SAP-ClientH") !== null) 
    {
        fillForm();
    }
// Do something here that fills the current screen  
    

    var sPath = window.location.pathname;
    var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
    console.log("In chsLoad / sPage =" + sPage); 
    switch (sPage)
    {
        case "index.html":
            SAPsy.myCurrScreen = '0100';
            break;
        case "process-choose.html":
            SAPsy.myCurrScreen = '0200';
            break; 
        case "Bin2Bin.html":
            SAPsy.myCurrScreen = '7000';
            console.log("In chsLoad " + SAPsy.myCurrScreen); 
            break;  
        default:
            SAPsy.myCurrScreen = '0000'; 
            break;
    }
    
    hideFooter();    
    
}

function getUrlVars() {
    console.log("In getUrlVars");
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

// 1. Clear button to do its job    [check]
function runClr(){
    console.log("In runClr");
    if (document.getElementById("slctFld") !== null)
        {
            console.log("Element slctFld found");
            document.getElementById("slctFld").value = null;
        } 
    if (document.getElementById("SAP-WHs") !== null)
        {
            console.log("Element SAP-WHs found");
            document.getElementById("SAP-WHs").value = "X20";
            document.getElementById("SAP-STyp").value = null;
            document.getElementById("SAP-FBin").value = null;
            document.getElementById("SAP-MTyp").value = null;
            document.getElementById("SAP-Matnr").value = null;
            document.getElementById("SAP-Menge").value = null;
            document.getElementById("SAP-Meins").value = null;
            document.getElementById("SAP-TBin").value = null;
        }     
}

// 2. Back button to return to index
function goBack()
{
    console.log("In goBack " + "|" + SAPsy.myCurrScreen + "|"); 

    switch (SAPsy.myCurrScreen)
    {
        case "7000":  
            console.log("In goBack, 7000");  
            SAPsy.thisForm = 'bin2BinFrm';
            SAPsy.nextScreen = 'process-choose.html';
            nextScreen();
            break;
            
        default:
// however back is not possible process-choose.            
            placeMessage(15);
            break;
    }
}

function fldTest()
{
    console.log("In fldTest");
    if(document.getElementById("SAP-Client") !== null)
//Then you are in Screen 0100        
    {
        console.log("In fldTest/SAP-Client/1"); 
        if(document.getElementById("SAP-Client").style.display !== 'none') 
        {
            console.log("In fldTest/SAP-Client/2");
            userPWTest()
        } //style.display = 'block'
    }
    
    if(document.getElementById("slctFld") !== null)
//Then you are in Screen 0200        
    {
        console.log("In fldTest/slctFld/1"); 
        if (document.getElementById("slctFld").style.display !== 'none')
        {
            console.log("In fldTest/slctFld/2");  
            slctFldTest();  
        }
    }
}

// 5. Button Logoff to do appropriate 
//      close browser? 
//      or logon and initialize 
function goLogoff()
{
//    document.history.delete;

    window.location.replace('index.html');
}
//  6. Do we want a logoff popup


function goSave(){
    console.log("In goSave"); 
    if (testBin2Bin() === true)
    {
        placeMessage(16);
        runClr()
        
    }
}


function digitCount(word)
{
    var digitCt = 0;
    for (var i = 0; i < word.length; i++) 
    {
       var wordChar = word.substring(i, i + 1);       
       if (wordChar.match(/[0-9]+/g)) 
       {
          digitCt++;
       }
    }
    return digitCt;
} 

function decCount(word)
{
    var decCt = 0;
    for (var i = 0; i < word.length; i++) 
    {
       var wordChar = word.substring(i, i + 1);       
       if (wordChar.match(/[.]+/g)) 
       {
          decCt++;
       }
    }
    return decCt;
}  

function clearPassword()
{
    document.getElementById("SAP-PW").disabled="disabled";
    document.getElementById("SAP-PWH").value = "";  
    
    SAPsy.onSubmitCnt++ ;
    localStorage.setItem('onSubmitCnt', SAPsy.onSubmitCnt); 
}

function supLocStorFn() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch(e){
    return false;
  }
}

function submitNotIndx()
{
    document.getElementById("SAP-ClientH").disabled=true;
    document.getElementById("SAP-UserH").disabled=true;
    document.getElementById("SAP-PWH").disabled=true;
    document.getElementById("SAP-SprasH").disabled=true;
    document.getElementById("SAP-Screen").disabled=true; 
//    SAPsy.myCurrScreen
    switch (SAPsy.myCurrScreen)
    {
        case "0100":  
            
            localStorage.setItem('SAP-Client', 
                document.getElementById('SAP-Client').value);
            localStorage.setItem('SAP-User', 
                document.getElementById('SAP-User').value);
            localStorage.setItem('SAP-PW', 
                document.getElementById('SAP-PW').value);
            localStorage.setItem('SAP-Spras', 
                document.getElementById('SAP-Spras').value); 
            localStorage.setItem('SAP-Screen', 
                document.getElementById('SAP-Screen').value); 
            document.getElementById("logonId").action = SAPsy.action;
            
            SAPsy.submittedAt = 697;
            localStorage.setItem('submittedAt', SAPsy.submittedAt);    
            
            break;
           
        case "0200":  
/*            
            localStorage.setItem('SAP-Client', 
                document.getElementById('SAP-ClientH').value);
            localStorage.setItem('SAP-User', 
                document.getElementById('SAP-UserH').value);
            localStorage.setItem('SAP-PW', 
                document.getElementById('SAP-PWH').value);
            localStorage.setItem('SAP-Spras', 
                document.getElementById('SAP-SprasH').value); 
            localStorage.setItem('SAP-Screen', 
                document.getElementById('SAP-ScreenH').value); 
*/                 
            document.getElementById("procChoForm").action =   
                SAPsy.action;
            
            SAPsy.submittedAt = 719;
            localStorage.setItem('submittedAt', SAPsy.submittedAt);
            
            break;
            
        case "7000":  
/*            
            localStorage.setItem('SAP-Client', 
                document.getElementById('SAP-ClientH').value);
            localStorage.setItem('SAP-User', 
                document.getElementById('SAP-UserH').value);
            localStorage.setItem('SAP-PW', 
                document.getElementById('SAP-PWH').value);
            localStorage.setItem('SAP-Spras', 
                document.getElementById('SAP-SprasH').value); 
*/                
            localStorage.setItem('SAP-Screen', 
                document.getElementById('SAP-ScreenH').value); 
            document.getElementById("bin2BinFrm").action = SAPsy.action;
            
            SAPsy.submittedAt = 740;
            localStorage.setItem('submittedAt', SAPsy.submittedAt);
 
            break;          
            
        default:
            break;
    }
    
}

function keyActions()
{
    console.log("Key Caught = " + event.keyCode);
    SAPsy.keyCode = event.keyCode;
    switch (SAPsy.keyCode) 
    {
        case 13: 
            placeMessage(0);
            fldTest();
            break;
        case 113:     // Clr Function
            runClr();
            break;
        case 114:     // Back Function
            goBack();
            break;
        case 115:     // Next Function
        case 116:
        case 117:
        case 118:
        case 120:        
        case 121:            
            placeMessage(13);
            break;      
        case 119:     // Logoff Function
            goLogoff();
            break;            
        default:
// Do nothing
            break;
    }       
}

function submitbin2bin()
{
    SAPsy.thisForm = 'procChoForm';
    SAPsy.nextScreen = "Bin2Bin.html";
    nextScreen();
}



// 2. Back button to return to index
function nextScreen()
{
    console.log("In nextScreen " + "|" + SAPsy.myCurrScreen + "|"); 

    var myForm = document.getElementById(SAPsy.thisForm);
    myForm.setAttribute('method', 'GET');
    myForm.setAttribute('action', SAPsy.nextScreen);
            
    SAPsy.submittedAt = 864;
    localStorage.setItem('submittedAt', SAPsy.submittedAt);    
            
    myForm.submit();

}

//function whatClick()
//{   
//}