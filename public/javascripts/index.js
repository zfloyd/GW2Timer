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
		$.ajax({
			url: '/Update',
			dataType: "json",
			type: 'POST',
			success: function (data){
				var dingDingDing = false;
				for (var i = 0; i < data.length; i++){
					var server = data[i];
					var serverElement = $("ul[data-id='" + server.ID + "']");
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
									dingDingDing = true;
								bossElement.find(".status").html(event.Name);
								if (event.Name == "Active")
									bossElement.addClass("active");
								else
									bossElement.removeClass("active");
								break;
							}
						}
						if (!activeEvent){
							bossElement.find(".status").html("Not Up");
							bossElement.removeClass("active");
						}
					}
				}
				if (dingDingDing && $("#uxPlaySound").is(":checked"))
					document.getElementById("forSound").innerHTML= "<embed src=\"resources/bell-ringing-04.mp3\" hidden=\"true\" autostart=\"true\" loop=\"false\" />";
			},
			error: function (xhr, status, error) {
				console.log('Error: ' + error.message);
			}
		});
	}

	RefreshData();
	setInterval(RefreshData, 5000);
});