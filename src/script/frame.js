/*
 * Chrome Extension for Harilo.com
 * 
 * @author		Aalok Thapa <thapa.aalok@gmail.com>
 * @modified	June 15, 2013
 * @link		https://github.com/thinksalot/chrome-harilo
 * 
 */

window.addEventListener('load',function(){ setTimeout('getShopPage()',5)});

function getShopPage()
{
	//display the loading animation
	parent.document.getElementById('progress').innerHTML='<img class=\"spinner\" src=\"img/progress.gif\">';

	var tokenPage=new XMLHttpRequest();
	tokenPage.open("GET","http://www.harilo.com/shop",true);
	tokenPage.onreadystatechange=function(){
		if (tokenPage.readyState==4 && tokenPage.status==200)
		{
			document.getElementById("frameContent").innerHTML=tokenPage.responseText;
			parent.document.getElementById('progress').innerHTML=''; //clear the loading animation
			var page=tokenPage.responseText;
		}
	}
	tokenPage.send(null);
}
