<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'index.jsp' starting page</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
  </head>
  
  <body>
  
	<h1>SpringMVC - File Upload with/without Ajax</h1> 
	
	<!--  Form 1 -->
	<i>Uploading File Without Ajax</i><br/>
	<form id="form1" method="post" action="/spring-mvc-file-upload/rest/cont/upload" enctype="multipart/form-data">
	  
	  <!-- File input -->     
	  <input name="file" id="file" type="file" /><br/>
	  
	  <input type="submit" value="Upload" />
	</form>
	<hr/>
	<i>Uploading File With Ajax</i><br/>
	
	<!--  Form 2 -->
	<form id="form2" method="post" action="/spring-mvc-file-upload/rest/cont/upload" enctype="multipart/form-data">
	  <!-- File input -->     
	  <input name="file2" id="file2" type="file" /><br/>
	</form>
	
	<button value="Submit" onclick="uploadJqueryForm()" >Upload</button><i>Using JQuery Form Plugin</i><br/>
	<button value="Submit" onclick="uploadFormData()" >Upload</button><i>Using FormData Object</i>
	
	<div id="result"></div>




  <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
  <script src="http://malsup.github.com/jquery.form.js"></script>
  <script type="text/javascript" >
	
	//using jquery.form.js
	function uploadJqueryForm(){
	    $('#result').html('');
	
	   $("#form2").ajaxForm({
		success:function(data) { 
		      //$('#result').text(data+" uploaded by Jquery Form plugin!");
		      $('#result').html(data);
	
		 },
		 dataType:"text"
	   }).submit();
	}
	//---------------------------------------------------------
	//using FormData() object
	function uploadFormData(){
	    $('#result').html('');
	
	  var oMyForm = new FormData();
	  oMyForm.append("file", file2.files[0]);
	  
	  $.ajax({
	    url: 'http://localhost:8080/spring-mvc-file-upload/rest/cont/upload',
	    data: oMyForm,
	    dataType: 'text',
	    processData: false,
	    contentType: false,
	    type: 'POST',
	    success: function(data){
	    //  $('#result').html(data+ " uploaded by FormData!");
	      $('#result').html(data);
	
	    }
	  });
	}
	</script>
  </body>
</html>
