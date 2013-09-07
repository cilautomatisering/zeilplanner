$("#PlanForm").submit(function() {
	alert("U wilt op " + $("#departure_date").val() + " naar " + $("#destination-location").val() + ". Daarvoor moet u om hh:mm:ss vertrekken");
});

var departures = {
	'Den Helder KMJC' : {
		'location' : 'Den Helder',
		'Ijmuiden' : {
			'tide' : 'HW',
			'departure' : [-60, 120]
		},
		'Scheveningen' : {
			'tide' : 'LW',
			'departure' : [30]
		}
	}
};

var tides = {
	'Den Helder' : {
		'01-01-2013' : {
			'HW' : ['10:00', '22:00'],
			'LW' : ['16:00', '04:00']
		},
		'02-01-2013' : {
			'HW' : ['12:00'],
			'LW' : ['18:00']
		}
	},
	'Ijmuiden' : {
		'01-01-2013' : {
			'HW' : ['11:00', '23:00'],
			'LW' : ['17:00', '05:00']
		},
		'02-01-2013' : {
			'HW' : ['13:00'],
			'LW' : ['19:00']
		}
	}
};

function get_tideTimes(place, date, tide) {
	if (!tides[place])
		return null;
	if (!tides[place][date])
		return null;
	if (!tides[place][date][tide])
		return null;
	var dates = new Array();
	var dateSplit = date.split(/-/);
	if (tides[place][date][tide][0]) {
		var timeSplit = tides[place][date][tide][0].split(/:/);
		dates.push(new Date(dateSplit[2], dateSplit[1], dateSplit[0], timeSplit[0], timeSplit[1]));
	}
	if (tides[place][date][tide][1]) {
		var timeSplit = tides[place][date][tide][1].split(/:/);
		dates.push(new Date(dateSplit[2], dateSplit[1], dateSplit[0], timeSplit[0], timeSplit[1]));
	}
	return dates;
}

function get_departureTimes(from, to, date) {
	var result = new Array();
	var location = departures[from]['location'];
	var tide = departures[from][to]['tide'];
	var tideTimes = get_tideTimes(location, date, tide);
	var departure = departures[from][to]['departure'];
	if (!tideTimes || !departure) return null;
	for (var i = 0; i < tideTimes.length; i++){
		var fromTideTime = new Date(tideTimes[i]);
		if (departure.length == 1){
			fromTideTime.setMinutes(fromTideTime.getMinutes() + departure[0]); 
			result.push("Vertrektijd: " + to_display_date(fromTideTime));
		} else if (departure.length == 2){
			var toTideTime = new Date(fromTideTime);
			fromTideTime.setMinutes(fromTideTime.getMinutes() + departure[0]); 
			result.push("Vertrektijd van: " + to_display_date(fromTideTime));
			toTideTime.setMinutes(toTideTime.getMinutes() + departure[1]); 
			result.push("Vertrektijd tot: " + to_display_date(toTideTime));
		}
	}
	return result;
}

function to_display_date(date){
	var day = date.getDate();
	var month = date.getMonth();
	var year = date.getFullYear();
	var hours = date.getHours();
	var minutes = date.getMinutes();  
	return day + "-" + month + "-" + year + " " + hours + ":" +	minutes; 
}

alert(get_departureTimes('Den Helder KMJC', 'Scheveningen', '01-01-2013'));

/*
 document.addEventListener("deviceready", onDeviceReady, false);

 function onDeviceReady() {
 document.addEventListener("pause", onPause, false);
 document.addEventListener("resume", onResume, false);
 alert("Device is Ready");
 }

 function onPause() {
 alert("paused!");
 }

 function onResume() {
 alert("resume");
 }
 */