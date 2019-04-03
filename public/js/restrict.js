$(function() {

	$("#btn_add_course").click(function(){
		clearErrors();
		$("#form_course")[0].reset();
		$("#course_img_path").attr("src", "");
		$("#modal_course").modal();
	});

	$("#btn_add_member").click(function(){
		clearErrors();
		$("#form_member")[0].reset();
		$("#member_photo_path").attr("src", "");
		$("#modal_member").modal();
	});

	$("#btn_add_user").click(function(){
		clearErrors();
		$("#form_user")[0].reset();
		$("#modal_user").modal();
	});

	$("#btn_upload_course_img").change(function() {
		uploadImg($(this), $("#course_img_path"), $("#course_img"));
	});

	$("#btn_upload_member_photo").change(function() {
		uploadImg($(this), $("#member_photo_path"), $("#member_photo"));
	});

	$("#form_course").submit(function() {

		$.ajax({
			type: "POST",
			url: BASE_URL + "restrict/ajax_save_course",
			dataType: "json",
			data: $(this).serialize(),
			beforeSend: function() {
				clearErrors();
				$("#btn_save_course").siblings(".help-block").html(loadingImg("Verificando..."));
			},
			success: function(response) {
				clearErrors();
				if (response["status"]) {
					$("#modal_course").modal("hide");
					swal("Sucesso!","Curso salvo com sucesso!", "success");
					dt_course.ajax.reload();
				} else {
					showErrorsModal(response["error_list"])
				}
			}
		})

		return false;
	});

	$("#form_member").submit(function() {

		$.ajax({
			type: "POST",
			url: BASE_URL + "restrict/ajax_save_member",
			dataType: "json",
			data: $(this).serialize(),
			beforeSend: function() {
				clearErrors();
				$("#btn_save_member").siblings(".help-block").html(loadingImg("Verificando..."));
			},
			success: function(response) {
				clearErrors();
				if (response["status"]) {
					$("#modal_member").modal("hide");
					swal("Sucesso!","Membro salvo com sucesso!", "success");
					dt_member.ajax.reload();
				} else {
					showErrorsModal(response["error_list"])
				}
			}
		})

		return false;
	});

	$("#form_user").submit(function() {

		$.ajax({
			type: "POST",
			url: BASE_URL + "restrict/ajax_save_user",
			dataType: "json",
			data: $(this).serialize(),
			beforeSend: function() {
				clearErrors();
				$("#btn_save_user").siblings(".help-block").html(loadingImg("Verificando..."));
			},
			success: function(response) {
				clearErrors();
				if (response["status"]) {
					$("#modal_user").modal("hide");
					swal("Sucesso!","Usuário salvo com sucesso!", "success");
					dt_user.ajax.reload();
				} else {
					showErrorsModal(response["error_list"])
				}
			}
		})

		return false;
	});

	$("#btn_your_user").click(function() {

		$.ajax({
			type: "POST",
			url: BASE_URL + "restrict/ajax_get_user_data",
			dataType: "json",
			data: {"user_id": $(this).attr("user_id")},
			success: function(response) {
				clearErrors();
				$("#form_user")[0].reset();
				$.each(response["input"], function(id, value) {
					$("#"+id).val(value);
				});
				$("#modal_user").modal();
			}
		})

		return false;
	});

	var dt_course = $("#dt_courses").DataTable({
		
		"autoWidth": false,
		
		"serverSide": true,
		"ajax": {
			"url": BASE_URL + "restrict/ajax_list_course",
			"type": "POST",
		},
		"columnDefs": [
			{ targets: "no-sort", orderable: false },
			{ targets: "dt-center", className: "dt-center" },
		]
	});

	var dt_member = $("#dt_team").DataTable({
		"autoWidth": false,
		"serverSide": true,
		"ajax": {
			"url": BASE_URL + "restrict/ajax_list_member",
			"type": "POST",
		},
		"columnDefs": [
			{ targets: "no-sort", orderable: false },
			{ targets: "dt-center", className: "dt-center" },
		]
	});
})