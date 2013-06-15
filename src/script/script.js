/*
 * Chrome Extension for Harilo.com
 * 
 * @author		Aalok Thapa <thapa.aalok@gmail.com>
 * @modified	June 15, 2013
 * @link		https://github.com/thinksalot/chrome-harilo
 * 
 */

window.addEventListener("load",init);

function init(){

	document.getElementById('addCartButton').addEventListener('click',addCartButton);
	document.getElementById('checkoutButton').addEventListener('click',checkoutButton);

	chrome.tabs.getSelected(null, function(tab) {
		document.forms[0].elements[1].value =tab.url;//get current url from chrome and put it in item[url]
	});
}

function postForm(callback)
{
	//display the progress animation
	document.getElementById('progress').innerHTML=' <img class=\"spinner\"  src=\"img/progress.gif\">'; 

	var token=getToken();
	var http = new XMLHttpRequest();

	//get form values and encode them
	var itemQty=encodeURIComponent(document.forms[0].elements[0].value);
	var itemUrl=encodeURIComponent(document.forms[0].elements[1].value);
	var token=encodeURIComponent(token);
	var itemComment=encodeURIComponent(document.forms[0].elements[3].value);

	var params = 'item[quantity]='+itemQty+'&item[url]='+itemUrl+'&authenticity_token='+token+'&item[comment][content]='+itemComment;

	http.open("POST", "http://www.harilo.com/cart_items", true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	http.onreadystatechange = function() {
		if (http.readyState == 4)
		{
			if(http.status == 200)
			{
				callback();
			}
			else
			{
				//document.getElementById('progress').innerHTML='<span style=\"color:red\">Ahh crap! Something bad happened. Please retry !</span>';
			}
		}
	}
	http.send(params);
}

function addCartButton()
{
	postForm(function(){
		closePopup();
	});
}

function closePopup()
{
	window.close();
}

function gotoCart()
{
	window.open('http://www.harilo.com/checkout')
}

function checkoutButton()
{
	closePopup();
	gotoCart();
}

function getToken()
{
	var shopFrame = document.getElementById("shopFrame");
	var shopDocument = shopFrame.contentDocument || shopFrame.contentWindow.document;
	var token = shopDocument.forms[0].elements[0].value;
	return token;
}


