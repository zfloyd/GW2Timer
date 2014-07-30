$(document).ready(function(){	
	var hiddenBosses = [];
	$("#uxShowAll").click(function(){
		$(".bossList input:checked").parents("li").toggle();
		$(this).siblings("span").html($(this).is(":checked") ? "Hide Checked" : "Show All");
	});

	$(".bossList input").click(function(){
		var bossName = $(this).val();
		if ($(this).is(":checked"))
			hiddenBosses.push(bossName);
		else
			hiddenBosses = $.grep(hiddenBosses, function (value){
				return value != bossName;
			});

		UpdateBossVisibility();
	});

	$("select").change(function(){
		RefreshData();
	});

	$("#refresh").click(function(){
		RefreshData();
		return false;
	});

	function UpdateBossVisibility(){		
		$(".bossList input").each(function(){
			if (hiddenBosses.indexOf($(this).val()) >= 0)
				$(this).prop("checked", "checked");
			else if ($(this).is(":checked"))
				$(this).prop("checked", false);
		});

		if (!($("#uxShowAll").is(":checked")))
			$(".bossList input:checked").parents("li").hide();
	}

	function RefreshData(){
		var selectedServers = [];
		$("select").each(function(){
			selectedServers.push($(this).val());
		});
		$.ajax({
			url: '/Update',
			dataType: "json",
			type: 'POST',
			cache: false,
			data: {servers: selectedServers },
			success: function (data){
				var bossAlert;
				for (var i = 0; i < data.length; i++){
					var server = data[i];
					var serverElement;
					$("select").each(function(){																									 
						if ($(this).val() == server.ID.toString()){
							serverElement = $(this).siblings("ul");
							return;
						}
					});
					for (var j = 0; j < server.Bosses.length; j++){
						var boss = server.Bosses[j];
						var bossElement = serverElement.find("li[data-id='" + boss.Name + "']");
						if (bossElement.find("input").is(":checked") && !($("#uxShowAll").is(":checked")))
							continue;
						var activeEvent = false;
						for (var k = 0; k < boss.Events.length; k++){
							var event = boss.Events[k];
							if (event.Status){
								activeEvent = true;
								if (bossElement.find(".status").html() != event.Name)
									bossAlert = boss.Name + (event.Name == "Active" ? " is up" : " is in pre");
								bossElement.find(".status").html(event.Name);
								if (event.Name == "Active")
									bossElement.removeClass("warmup").addClass("active");
								else
									bossElement.removeClass("active").addClass("warmup");
								break;
							}
						}
						if (!activeEvent){
							bossElement.find(".status").html("Not Up");
							bossElement.removeClass("active").removeClass("warmup");
						}
					}
				}
				if (bossAlert && $("#uxPlaySound").is(":checked"))
				{
					var url = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase()) ? "http://translate.google.com/translate_tts?ie=UTF-8&tl=en&q=" + bossAlert : "resources/bell-ringing-04.mp3";
					document.getElementById("forSound").innerHTML= '<embed src="' + url + '" hidden="true" autostart="true" loop="false" />';
				}
			},
			error: function (xhr, status, error) {
				console.log('Error: ' + error.message);
			}
		});
	}

	RefreshData();
	setInterval(RefreshData, 5000);
});