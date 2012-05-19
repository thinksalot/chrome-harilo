/*
 * Chrome Extension for Harilo.com
 * 
 * @author		Aalok Thapa <thapa.aalok@gmail.com>
 * @modified	May 19, 2012
 * 
 */

function postForm(callback)
{
  document.getElementById('progress').innerHTML=' <img class=\"spinner\"  src=\"img/progress.gif\">'; //display the progress animation
  var token=getToken();
  //console.log('Token:'+token);

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
        //console.log('Added to cart !'); //log value for debugging
        //window.close();
        callback();
      }
      else
      {
        //document.getElementById('progress').innerHTML='<span style=\"color:red\">Ahh crap! Something bad happened. Please retry !</span>';
      }
    }
  }
  http.send(params);
  //console.log('Parameter:'+params); //log value for debugging
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

function getShopPage()
{
  parent.document.getElementById('progress').innerHTML='<img class=\"spinner\" src=\"img/progress.gif\">'; //display the loading animation
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

