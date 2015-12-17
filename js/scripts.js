jQuery(document).ready(function() {
	/*var e = document.getElementById('q-mark');
	e.onmouseover = function() {
	  document.getElementById('q-text').style.display = 'block';
	}
	e.onmouseout = function() {
	  document.getElementById('q-text').style.display = 'none';
	}*/
	
	$(".q-mark").hover(
		function () {
			$(this).next('.q-text').show();
		} , 
		function () {
			$(this).next('.q-text').hide();
		}
	);
});