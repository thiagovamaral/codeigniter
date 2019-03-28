$(function() {

	$("#btn_add_course").click(function(){
		clearErrors();
		$("#modal_course").modal();
	});

	$("#btn_add_member").click(function(){

		$("#modal_member").modal();
	});

	$("#btn_add_user").click(function(){
		$("#modal_user").modal();
	});
})