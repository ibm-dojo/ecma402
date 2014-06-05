define([ "./Record", "requirejs-text/text!./cldr/supplemental/calendarData.json"],
	function (Record, calendarDataJson) {
	var calendarData = JSON.parse(calendarDataJson).supplemental.calendarData;
	var calendarFunctions = {
		eraOffset : function (calendar, era) {
			var eraStartDate = calendarData[calendar].eras[era.toString()]._start;
			var result = eraStartDate.charAt(0) === "-" ? Number(eraStartDate.split("-")[1]) * -1 : Number(eraStartDate
					.split("-")[0]);
			if (result <= 0) {
				result--; // Compensate for the fact that year 0 (Gregorian) doesn't exist.
			}
			return result;
		},
		/*
		 * Used to find the era for a given date. Starts at the most recent era (highest era number) and works
		 * backwards.
		 */
		findEra : function (calendar, date, maxEra) {
			var currentEra = maxEra;
			while (currentEra >= 0) {
				var compareDate = new Date();
				if (calendarData[calendar].eras[currentEra.toString()]) {
					var eraStartDate = calendarData[calendar].eras[currentEra.toString()]._start;
					if (!eraStartDate) {
						return currentEra;
					}
					var pieces = eraStartDate.split("-");
					if (eraStartDate.charAt(0) === "-") {
						compareDate.setFullYear(pieces[1] * -1, pieces[2] - 1, pieces[3] - 1);
					} else {
						compareDate.setFullYear(pieces[0], pieces[1] - 1, pieces[2] - 1);
					}
					if (date >= compareDate) {
						return currentEra;
					}
				}
				currentEra--;
			}
			return currentEra; // Return -1 if date is before the start of era #0
		},
		setTimeFields : function (dt, timeZone, result) {
			result.set("hour", timeZone === "UTC" ? dt.getUTCHours() : dt.getHours());
			result.set("minute", timeZone === "UTC" ? dt.getUTCMinutes() : dt.getMinutes());
			result.set("second", timeZone === "UTC" ? dt.getUTCSeconds() : dt.getSeconds());
			var localMinutes = dt.getHours() * 60 + dt.getMinutes();
			var UTCMinutes = dt.getUTCHours() * 60 + dt.getUTCMinutes();
			result.set("inDST", timeZone === "UTC" ? false : localMinutes + dt.getTimezoneOffset() !== UTCMinutes);
		},
		isLeapYear : function (/*Date*/ dateObject) {
			// summary:
			//		Determines if the year of the dateObject is a leap year.
			// description:
			//		Leap years are years with an additional day YYYY-02-29, where the
			//		Year number is a multiple of four with the following exception: If
			//		A year is a multiple of 100, then it is only a leap year if it is
			//		Also a multiple of 400. For example, 1900 was not a leap year, but
			//		2000 is one.

			var year = dateObject.getFullYear();
			return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
		},
		getYearStart : function (/*Number*/ year) {
			// summary:
			//		Return start of Islamic year.
			return (year - 1) * 354	+ Math.floor((3 + 11 * year) / 30.0);
		},
		getMonthStart : function (/*Number*/ year, /*Number*/ month) {
			// summary:
			//		Return the start of Islamic Month.
			return Math.ceil(29.5 * month) + (year - 1) * 354 + Math.floor((3 + 11 * year) / 30.0);
		},
		compare : function (/*Date*/ date1, /*Date?*/ date2, /*String?*/ portion) {
			// summary:
			//		Compare two date objects by date, time, or both.
			// description:
			//		Returns 0 if equal, positive if a > b, else negative.
			// date1:
			//		Date object
			// date2:
			//		Date object.  If not specified, the current Date is used.
			// portion:
			//		A string indicating the "date" or "time" portion of a Date object.
			//		Compares both "date" and "time" by default.  One of the following:
			//		"date", "time", "datetime"
			date1 = new Date(+date1);
			date2 = new Date(+(date2 || new Date()));

			if (portion === "date") {
				// Ignore times and compare dates.
				date1.setHours(0, 0, 0, 0);
				date2.setHours(0, 0, 0, 0);
			} else if (portion === "time") {
				// Ignore dates and compare times.
				date1.setFullYear(0, 0, 0);
				date2.setFullYear(0, 0, 0);
			}
			if (date1 > date2) {
				return 1;
			}
			if (date1 < date2) {
				return -1;
			}
			return 0;
		},
		difference : function (/*Date*/ date1, /*Date?*/ date2, /*String?*/ interval) {
			// summary:
			//		Get the difference in a specific unit of time (e.g., number of
			//		Months, weeks, days, etc.) between two dates, rounded to the
			//		Nearest integer.
			// date1:
			//		Date object
			// date2:
			//		Date object.  If not specified, the current Date is used.
			// interval:
			//		A string representing the interval.  One of the following:
			//		"year", "month", "day", "hour", "minute", "second",
			//		"millisecond", "quarter", "week", "weekday"
			//
			//		Defaults to "day".
			date2 = date2 || new Date();
			interval = interval || "day";
			var yearDiff = date2.getFullYear() - date1.getFullYear();
			var delta = 1; // Integer return value

			switch (interval) {
				case "quarter":
					var m1 = date1.getMonth();
					var m2 = date2.getMonth();
					// Figure out which quarter the months are in
					var q1 = Math.floor(m1 / 3) + 1;
					var q2 = Math.floor(m2 / 3) + 1;
					// Add quarters for any year difference between the dates
					q2 += (yearDiff * 4);
					delta = q2 - q1;
					break;
				case "weekday":
					var days = Math.round(this.difference(date1, date2, "day"));
					var weeks = parseInt(this.difference(date1, date2, "week"), 10);
					var mod = days % 7;

					// Even number of weeks
					if (mod === 0) {
						days = weeks * 5;
					} else {
						// Weeks plus spare change (< 7 days)
						var adj = 0;
						var aDay = date1.getDay();
						var bDay = date2.getDay();

						weeks = parseInt(days / 7, 10);
						mod = days % 7;
						// Mark the date advanced by the number of
						// round weeks (may be zero)
						var dtMark = new Date(date1);
						dtMark.setDate(dtMark.getDate() + (weeks * 7));
						var dayMark = dtMark.getDay();

						// Spare change days -- 6 or less
						if(days > 0){
							switch (true) {
								// Range starts on Sat
								case aDay === 6:
									adj = -1;
									break;
								// Range starts on Sun
								case aDay === 0:
									adj = 0;
									break;
								// Range ends on Sat
								case bDay === 6:
									adj = -1;
									break;
								// Range ends on Sun
								case bDay === 0:
									adj = -2;
									break;
								// Range contains weekend
								case (dayMark + mod) > 5:
									adj = -2;
							}
						} else if (days < 0) {
							switch (true) {
								// Range starts on Sat
								case aDay === 6:
									adj = 0;
									break;
								// Range starts on Sun
								case aDay === 0:
									adj = 1;
									break;
								// Range ends on Sat
								case bDay === 6:
									adj = 2;
									break;
								// Range ends on Sun
								case bDay === 0:
									adj = 1;
									break;
								// Range contains weekend
								case (dayMark + mod) < 0:
									adj = 2;
							}
						}
						days += adj;
						days -= (weeks * 2);
					}
					delta = days;
					break;
				case "year":
					delta = yearDiff;
					break;
				case "month":
					delta = (date2.getMonth() - date1.getMonth()) + (yearDiff * 12);
					break;
				case "week":
					// Truncate instead of rounding
					// Don't use Math.floor -- value may be negative
					delta = parseInt(this.difference(date1, date2, "day") / 7, 10);
					break;
				case "day":
					delta /= 24;
					// fallthrough
				case "hour":
					delta /= 60;
					// fallthrough
				case "minute":
					delta /= 60;
					// fallthrough
				case "second":
					delta /= 1000;
					// fallthrough
				case "millisecond":
					delta *= date2.getTime() - date1.getTime();
			}

			// Round for fractional values and DST leaps
			return Math.round(delta); // Number (integer)
		}
	};
	return calendarFunctions;
});