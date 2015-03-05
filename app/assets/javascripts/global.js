function openwindow(url,name,options) {
    newwindow = window.open(url,name,options)
}

function openSignupWindow(url) {
    signupExtraWindow = window.open(url,"signupExtraWindow","toolbars=no,address=no,left=10,top=10,status=no,width=468,height=400,scrollbars=yes,resizable=no")
}

function signup(url) {
    signupwindow = window.open(url,"signup","toolbars=no,address=no,left=10,top=10,status=no,width=468,height=400,scrollbars=yes,resizable=no")
}

function displayError(formNode, validators){
 var errorHTML = "";
 for(var i=0;i<validators.length;i++){
  errorHTML += "<li>" + validators[i].message + "</li>";
 }
 document.getElementById("errorDisplay").style.display = "block";
 document.getElementById("errorDisplay").innerHTML = "<ul>" + errorHTML + "</ul>";
}

function privacy(){
    privacyWin = window.open("privacy.php","privacyWin","toolbars=no,address=no,left=10,top=10,status=no,width=468,height=400,scrollbars=yes,resizable=no")
}

function terms(){
    termsWin = window.open("terms.php","termsWin","toolbars=no,address=no,left=10,top=10,status=no,width=468,height=400,scrollbars=yes,resizable=no")
}

function rules(){
    rulesWin = window.open("rules.php","rulesWin","toolbars=no,address=no,left=10,top=10,status=no,width=468,height=400,scrollbars=yes,resizable=no")
}

function highscores(){
    hsWin = window.open("leaderboard.php","leaderboard","toolbars=no,address=no,left=10,top=10,status=no,width=400,height=400,scrollbars=yes,resizable=no")
}

function getbrowserwidth() {
    	if (navigator.userAgent.indexOf("MSIE") > 0)	{
        		return(screen.width);
       	} else {
            	return(window.screen.width);
       	}	
}
        
function getbrowserheight() {
	if (navigator.userAgent.indexOf("MSIE") > 0) {
		return(screen.height);
    } else {
		return(window.screen.height);
	}
}
				
var popup = new Object()

function CenterPopup(URL, popname, width, height, scrollbars) {
									
		// get center of browser window
        var X = getbrowserwidth()/2;
        var Y = getbrowserheight()/2;
                    	
        popup = window.open(URL, popname, 
                    		'scrollbars=' + scrollbars + ',' +
                    		'width=' + width + ',' +
                    		'height=' + height + ',' +
                    		'top=' + ((Y - (height/2))) + ',' +
                    		'left=' + ((X - (width/2))) 
                    		);
                    	
        popup.focus();
}


function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}

/* Inline JS moved from index file */
function validatePrivPolicy()
{
	if(document.forms[0].chkPrivPol.checked == false)
	{
		alert("Please tick the Privacy Policy check box to confirm that you have read our Privacy Policy before you submit your details.");
		return false;
	}
	//Added by Ashu for PBN: 83214
	if((document.getElementById('countrycode').value == 'US') || ((document.getElementById('dob_show').value == 'show') && (document.getElementById('dob_show_mandatory').value == 'show')))
	{
		if (document.getElementById('dob_day').value == 'DD')
		{
			alert('Please select the day you were born.');
			document.getElementById("dob_day").focus();
			return false;
		}
		if (document.getElementById('dob_month').value == 'MM')
		{
			alert('Please select the month you were born.');
			document.getElementById("dob_month").focus();
			return false;
		}
		if (document.getElementById('dob_year').value == 'YYYY')
		{
			alert('Please select the year you were born.');
			document.getElementById("dob_year").focus();
			return false;
		}
	}
	//End code for PBN: 83214
	// Added by Rahul. Parental Check. PBN Ticket : 40816
	var returnVal = true;	
	if(Visible_ParentalEmailBox())
	{
		if($.trim(document.getElementById("email").value) != "")
		{
			if($.trim(document.getElementById("email").value) == $.trim(document.getElementById("pemail").value))
			{
				alert($.trim(document.getElementById("pemail").value)+" is not a valid email address. Please submit a valid email address for a parent or guardian");
				document.getElementById("pemail").focus();
				return false;

			}
			var myreturn = 0;
			$.ajax({
				type: "GET",
				url: "/tools/GlobalAJAXRequestServer.pl",
				data: "requestfrom=registrationpage&email="+document.getElementById("email").value,
				async: false,
				success: function(msg)
				{
					if(msg == 'UNCONF')
						returnVal = enabledParentEmailBox(true);
					else
						returnVal = disabledParentEmailBox();
				},
				error: function (XMLHttpRequest, textStatus, errorThrown)
				{
					alert("An error occurred while processing the request: '" + textStatus + "'");
					return false;
				}
			});
		}
		else
			return disabledParentEmailBox();
	}
	else
		returnVal = disabledParentEmailBox();

	return returnVal;
}

function dob_change()
{
	if ((document.getElementById('countrycode').value == 'US'))
	{
		document.getElementById("dob_span").style.display = "";
		document.getElementById("dob_span_mandatory").style.display = "";
	}
	else if((document.getElementById('countrycode').value != 'US') && (document.getElementById('dob_show').value == 'show') && (document.getElementById('dob_show_mandatory').value == 'not_show'))
	{
		document.getElementById("dob_span").style.display = "";
		document.getElementById("dob_span_mandatory").style.display = "none";
	}
	else if((document.getElementById('countrycode').value != 'US') && (document.getElementById('dob_show').value == 'show') && (document.getElementById('dob_show_mandatory').value == 'show'))
	{
		document.getElementById("dob_span").style.display = "";
		document.getElementById("dob_span_mandatory").style.display = "";
	}
	else
	{
		document.getElementById("dob_span").style.display = "none";
		document.getElementById('dob_day').value='DD'
		document.getElementById('dob_month').value='MM';
		document.getElementById('dob_year').value='YYYY';
	}
	//document.getElementById("dob_span").style.display = "none";
}
//End code for PBN: 83214

// Added by Rahul. Parental Check. PBN Ticket : 40816
function enabledParentEmailBox(showAlert)
{
	document.getElementById("parent_conf").value = "UNCONF"; // parent consent remain unconfirmed
	document.getElementById("parentalform").style.display = "";
	var obj = document.getElementById("pemail");
	obj.disabled=false;
	
	var reg = new RegExp("^[\\+\\w\\.=-]+@[\\w\.-]+\\.[\\w\\.-]{2,4}$");
	if(reg)
	{
		if(reg.test(document.getElementById("pemail").value))
			return true;
		else
		{
			if(obj.className.indexOf(obj.getAttribute("tmt:errorclass")) == -1)
				obj.className = obj.className + " " + obj.getAttribute("tmt:errorclass");

			if(showAlert)
			{
				var msg = "Please submit a valid email address for a parent or guardian";
				if($.trim(document.getElementById("pemail").value) != "")
					msg = $.trim(document.getElementById("pemail").value)+" is not a valid email address. "+msg;
				alert(msg);
			}
			obj.focus();
			return false;
		}
	}
}

// Added by Rahul. Parental Check. PBN Ticket : 40816
function disabledParentEmailBox()
{
	if(document.getElementById("parentalform"))
	{
		document.getElementById("parent_conf").value = "CONF"; // parent consent confirmed
		document.getElementById("pemail").value = "";
		document.getElementById("pemail").disabled=true;
		document.getElementById("parentalform").style.display = "none";
	}
	return true;
}

// Added by Rahul. Parental Check. PBN Ticket : 40816
function Visible_ParentalEmailBox()
{
	if(!document.getElementById('dob_year') || !document.getElementById('dob_month') || !document.getElementById('dob_day')) return false;
	var maxAge = 12;
	var day = document.getElementById('dob_day').value;
	var month = document.getElementById('dob_month').value;
	var year = document.getElementById('dob_year').value;


	var currentTime = new Date();
	var cday = currentTime.getDate();
	var cmonth = currentTime.getMonth() + 1
	var cyear = currentTime.getFullYear();

	if(cyear-year > maxAge)
	{
		return false;
	}
	else if(cyear-year < maxAge)
	{
		return true;
	}
	else
	{
		if(cmonth > month)
		{
			return false;
		}
		else if(cmonth < month)
		{
			return true;
		}
		else
		{
			if(cday < day)
			{
				return true;
			}
			else
			{
				return false;
			}
		}
	}
}

/* Inline JS moved from index file  */