define([ "./Record", "./calendarFunctions", "./gregorianCalendar", "./islamicCalendar"],
		function (Record, calendarFunctions, gregorian, islamicCalendar) {

	var umalquraCalendar = {
		
		HIJRI_BEGIN : 1300,
		HIJRI_END : 1600,
		M_LAST_INDX: 300,
		M_ROWS: 60,
						//1300-1304
	    MONTH_LENGTH : ["101010101010", "110101010100", "111011001001", "011011010100", "011011101010",
	                  //1305-1309
	                  "001101101100", "101010101101", "010101010101", "011010101001", "011110010010",
	                  //1310-1314
	                  "101110101001", "010111010100", "101011011010", "010101011100", "110100101101",
	                  //1315-1319
	                  "011010010101", "011101001010", "101101010100", "101101101010", "010110101101",
	                  //1320-1324
	                  "010010101110", "101001001111", "010100010111", "011010001011", "011010100101",
	                  //1325-1329
	                  "101011010101", "001011010110", "100101011011", "010010011101", "101001001101",
	                  //1330-1334
	                  "110100100110", "110110010101", "010110101100", "100110110110", "001010111010",
	                  //1335-1339
	                  "101001011011", "010100101011", "101010010101", "011011001010", "101011101001",
	                  //1340-1344
	                  "001011110100", "100101110110", "001010110110", "100101010110", "101011001010",
	                  //1345-1349
	                  "101110100100", "101111010010", "010111011001", "001011011100", "100101101101",
	                  //1350-1354
	                  "010101001101", "101010100101", "101101010010", "101110100101", "010110110100",
	                  //1355-1359
	                  "100110110110", "010101010111", "001010010111", "010101001011", "011010100011",
	                  //1360-1364
	                  "011101010010", "101101100101", "010101101010", "101010101011", "010100101011",
	                  //1365-1369
	                  "110010010101", "110101001010", "110110100101", "010111001010", "101011010110",
	                  //1370-1374
	                  "100101010111", "010010101011", "100101001011", "101010100101", "101101010010",
	                  //1375-1379
	                  "101101101010", "010101110101", "001001110110", "100010110111", "010001011011",
	                  //1380-1384
	                  "010101010101", "010110101001", "010110110100", "100111011010", "010011011101",
	                  //1385-1389
	                  "001001101110", "100100110110", "101010101010", "110101010100", "110110110010",
	                  //1390-1394
	                  "010111010101", "001011011010", "100101011011", "010010101011", "101001010101",
	                  //1395-1399
	                  "101101001001", "101101100100", "101101110001", "010110110100", "101010110101",
	                  //1400-1404
	                  "101001010101", "110100100101", "111010010010", "111011001001", "011011010100",
	                  //1405-1409
	                  "101011101001", "100101101011", "010010101011", "101010010011", "110101001001",
	                  //1410-1414
	                  "110110100100", "110110110010", "101010111001", "010010111010", "101001011011",
	                  //1415-1419
	                  "010100101011", "101010010101", "101100101010", "101101010101", "010101011100",
	                  //1420-1424
	                  "010010111101", "001000111101", "100100011101", "101010010101", "101101001010",
	                  //1425-1429
	                  "101101011010", "010101101101", "001010110110", "100100111011", "010010011011",
	                  //1430-1434
	                  "011001010101", "011010101001", "011101010100", "101101101010", "010101101100",
	                  //1435-1439
	                  "101010101101", "010101010101", "101100101001", "101110010010", "101110101001",
	                  //1440-1444
	                  "010111010100", "101011011010", "010101011010", "101010101011", "010110010101",
	                  //1445-1449
	                  "011101001001", "011101100100", "101110101010", "010110110101", "001010110110",
	                  //1450-1454
	                  "101001010110", "111001001101", "101100100101", "101101010010", "101101101010",
	                  //1455-1459
	                  "010110101101", "001010101110", "100100101111", "010010010111", "011001001011",
	                  //1460-1464
	                  "011010100101", "011010101100", "101011010110", "010101011101", "010010011101",
	                  //1465-1469
	                  "101001001101", "110100010110", "110110010101", "010110101010", "010110110101",
	                  //1470-1474
	                  "001011011010", "100101011011", "010010101101", "010110010101", "011011001010",
	                  //1475-1479
	                  "011011100100", "101011101010", "010011110101", "001010110110", "100101010110",
	                  //1480-1484
	                  "101010101010", "101101010100", "101111010010", "010111011001", "001011101010",
	                  //1485-1489
	                  "100101101101", "010010101101", "101010010101", "101101001010", "101110100101",
	                  //1490-1494
	                  "010110110010", "100110110101", "010011010110", "101010010111", "010101000111",
	                  //1495-1499
	                  "011010010011", "011101001001", "101101010101", "010101101010", "101001101011",
	                  //1500-1504
	                  "010100101011", "101010001011", "110101000110", "110110100011", "010111001010",
	                  //1505-1509
	                  "101011010110", "010011011011", "001001101011", "100101001011", "101010100101",
	                  //1510-1514
	                  "101101010010", "101101101001", "010101110101", "000101110110", "100010110111",
	                  //1515-1519
	                  "001001011011", "010100101011", "010101100101", "010110110100", "100111011010",
	                  //1520-1524
	                  "010011101101", "000101101101", "100010110110", "101010100110", "110101010010",
	                  //1525-1529
	                  "110110101001", "010111010100", "101011011010", "100101011011", "010010101011",
	                  //1530-1534
	                  "011001010011", "011100101001", "011101100010", "101110101001", "010110110010",
	                  //1535-1539
	                  "101010110101", "010101010101", "101100100101", "110110010010", "111011001001",
	                  //1540-1544
	                  "011011010010", "101011101001", "010101101011", "010010101011", "101001010101",
	                  //1545-1549
	                  "110100101001", "110101010100", "110110101010", "100110110101", "010010111010",
	                  //1550-1554
	                  "101000111011", "010010011011", "101001001101", "101010101010", "101011010101",
	                  //1555-1559
	                  "001011011010", "100101011101", "010001011110", "101000101110", "110010011010",
	                  //1560-1564
	                  "110101010101", "011010110010", "011010111001", "010010111010", "101001011101",
	                  //1565-1569
	                  "010100101101", "101010010101", "101101010010", "101110101000", "101110110100",
	                  //1570-1574
	                  "010110111001", "001011011010", "100101011010", "101101001010", "110110100100",
	                  //1575-1579
	                  "111011010001", "011011101000", "101101101010", "010101101101", "010100110101",
	                  //1580-1584
	                  "011010010101", "110101001010", "110110101000", "110111010100", "011011011010",
	                  //1585-1589
	                  "010101011011", "001010011101", "011000101011", "101100010101", "101101001010",
	                  //1590-1594
	                  "101110010101", "010110101010", "101010101110", "100100101110", "110010001111",
	                  //1595-1599
	                  "010100100111", "011010010101", "011010101010", "101011010110", "010101011101",
	                  //1600
	                  "001010011101"],
	        
	    getGregorianRef : function () {
			var gregorianRef = new Array(61);
			gregorianRef[0] = new Date(1882, 10, 12, 0, 0, 0, 0);
			gregorianRef[1] = new Date(1887, 8, 19, 0, 0, 0, 0);
			gregorianRef[2] = new Date(1892, 6, 25, 0, 0, 0, 0);
			gregorianRef[3] = new Date(1897, 5, 2, 0, 0, 0, 0);
			gregorianRef[4] = new Date(1902, 3, 10, 0, 0, 0, 0);
			gregorianRef[5] = new Date(1907, 1, 14, 0, 0, 0, 0);
			gregorianRef[6] = new Date(1911, 11, 22, 0, 0, 0, 0);
			gregorianRef[7] = new Date(1916, 9, 28, 0, 0, 0, 0);
			gregorianRef[8] = new Date(1921, 8, 4, 0, 0, 0, 0);
			gregorianRef[9] = new Date(1926, 6, 11, 0, 0, 0, 0);
			gregorianRef[10] = new Date(1931, 4, 19, 0, 0, 0, 0);
			gregorianRef[11] = new Date(1936, 2, 24, 0, 0, 0, 0);
			gregorianRef[12] = new Date(1941, 0, 29, 0, 0, 0, 0);
			gregorianRef[13] = new Date(1945, 11, 6, 0, 0, 0, 0);
			gregorianRef[14] = new Date(1950, 9, 13, 0, 0, 0, 0);
			gregorianRef[15] = new Date(1955, 7, 19, 0, 0, 0, 0);
			gregorianRef[16] = new Date(1960, 5, 26, 0, 0, 0, 0);
			gregorianRef[17] = new Date(1965, 4, 3, 0, 0, 0, 0);
			gregorianRef[18] = new Date(1970, 2, 9, 0, 0, 0, 0);
			gregorianRef[19] = new Date(1975, 0, 14, 0, 0, 0, 0);
			gregorianRef[20] = new Date(1979, 10, 21, 0, 0, 0, 0);
			gregorianRef[21] = new Date(1984, 8, 26, 0, 0, 0, 0);
			gregorianRef[22] = new Date(1989, 7, 3, 0, 0, 0, 0);
			gregorianRef[23] = new Date(1994, 5, 11, 0, 0, 0, 0);
			gregorianRef[24] = new Date(1999, 3, 17, 0, 0, 0, 0);
			gregorianRef[25] = new Date(2004, 1, 21, 0, 0, 0, 0);
			gregorianRef[26] = new Date(2008, 11, 29, 0, 0, 0, 0);
			gregorianRef[27] = new Date(2013, 10, 4, 0, 0, 0, 0);
			gregorianRef[28] = new Date(2018, 8, 11, 0, 0, 0, 0);
			gregorianRef[29] = new Date(2023, 6, 19, 0, 0, 0, 0);
			gregorianRef[30] = new Date(2028, 4, 25, 0, 0, 0, 0);
			gregorianRef[31] = new Date(2033, 3, 1, 0, 0, 0, 0);
			gregorianRef[32] = new Date(2038, 1, 6, 0, 0, 0, 0);
			gregorianRef[33] = new Date(2042, 11, 14, 0, 0, 0, 0);
			gregorianRef[34] = new Date(2047, 9, 21, 0, 0, 0, 0);
			gregorianRef[35] = new Date(2052, 7, 26, 0, 0, 0, 0);
			gregorianRef[36] = new Date(2057, 6, 3, 0, 0, 0, 0);
			gregorianRef[37] = new Date(2062, 4, 10, 0, 0, 0, 0);
			gregorianRef[38] = new Date(2067, 2, 17, 0, 0, 0, 0);
			gregorianRef[39] = new Date(2072, 0, 22, 0, 0, 0, 0);
			gregorianRef[40] = new Date(2076, 10, 28, 0, 0, 0, 0);
			gregorianRef[41] = new Date(2081, 9, 4, 0, 0, 0, 0);
			gregorianRef[42] = new Date(2086, 7, 11, 0, 0, 0, 0);
			gregorianRef[43] = new Date(2091, 5, 19, 0, 0, 0, 0);
			gregorianRef[44] = new Date(2096, 3, 24, 0, 0, 0, 0);
			gregorianRef[45] = new Date(2101, 2, 1, 0, 0, 0, 0);
			gregorianRef[46] = new Date(2106, 0, 7, 0, 0, 0, 0);
			gregorianRef[47] = new Date(2110, 10, 13, 0, 0, 0, 0);
			gregorianRef[48] = new Date(2115, 8, 20, 0, 0, 0, 0);
			gregorianRef[49] = new Date(2120, 6, 27, 0, 0, 0, 0);
			gregorianRef[50] = new Date(2125, 5, 3, 0, 0, 0, 0);
			gregorianRef[51] = new Date(2130, 3, 10, 0, 0, 0, 0);
			gregorianRef[52] = new Date(2135, 1, 14, 0, 0, 0, 0);
			gregorianRef[53] = new Date(2139, 11, 23, 0, 0, 0, 0);
			gregorianRef[54] = new Date(2144, 9, 28, 0, 0, 0, 0);
			gregorianRef[55] = new Date(2149, 8, 3, 0, 0, 0, 0);
			gregorianRef[56] = new Date(2154, 6, 12, 0, 0, 0, 0);
			gregorianRef[57] = new Date(2159, 4, 19, 0, 0, 0, 0);
			gregorianRef[58] = new Date(2164, 2, 24, 0, 0, 0, 0);
			gregorianRef[59] = new Date(2169, 0, 30, 0, 0, 0, 0);
			gregorianRef[60] = new Date(2173, 11, 7, 0, 0, 0, 0);
			return gregorianRef;
		},
		/* jshint maxcomplexity: 26 */
		fromGregorian : function (/* Date */gdate) {
			// summary:
			//		This function returns the equivalent islamic(umalqura) date value for a give input gregorian date.
			// gdate: Date
			//      Gregorian date which will be converted to islamic date
			// returns:
			//      Islamic(umalqura) date.
			var date = new Date(gdate);
			gdate = new Date(gdate);
			date.setHours(0, 0, 0, 0);
			var gregorianRef = this.getGregorianRef();
			var gregorianLastRef = new Date(2174, 10, 25, 0, 0, 0, 0);

			if (calendarFunctions.compare(date, gregorianRef[0]) >= 0
					&& calendarFunctions.compare(date, gregorianLastRef) <= 0) {
				var diff;
				if (calendarFunctions.compare(date, gregorianRef[this.M_ROWS]) <= 0) {
					var count = 0;
					var pos = 0;
					var isRef = 0;
					for (count = 0; count < gregorianRef.length; count++) {
						if (calendarFunctions.compare(date, gregorianRef[count], "date") === 0) {
							pos = count;
							isRef = 1;
							break;
						} else if (calendarFunctions.compare(date, gregorianRef[count], "date") < 0) {
							pos = count - 1;
							break;
						}
					}
					var j = 0;
					var flag = 0;
					var monthL = 0;
					if (isRef === 1) {
						this.date = 1;
						this.month = 0;
						this.year = this.HIJRI_BEGIN + pos * 5;
						this.hours = gdate.getHours();
						this.minutes = gdate.getMinutes();
						this.seconds = gdate.getSeconds();
						this.milliseconds = gdate.getMilliseconds();
						this.day = gregorianRef[pos].getDay();
					} else {
						diff = calendarFunctions.difference(gregorianRef[pos], date, "day");
						pos = pos * 5;
						for (var i = pos; i < pos + 5; i++) {
							for (j = 0; j <= 11; j++) {
								if (this.MONTH_LENGTH[i].charAt(j) === "1") {
									monthL = 30;
								} else if (this.MONTH_LENGTH[i].charAt(j) === "0") {
									monthL = 29;
								}
								
								if (diff > monthL) {
									diff = diff - monthL;
								} else {
									flag = 1;
									break;
								}
							}

							if (flag === 1) {
								if (diff === 0) {
									diff = 1;
									if (j === 11) {
										j = 1;
										++i;
									} else {
										++j;
									}
									break;
								} else {
									if (diff === monthL) {
										diff = 0;
										if (j === 11) {
											j = 0;
											++i;
										} else {
											++j;
										}
									}
									diff++;
									break;
								}
							}
						}
						this.date = diff;
						this.month = j;
						this.year = this.HIJRI_BEGIN + i;
						this.hours = gdate.getHours();
						this.minutes = gdate.getMinutes();
						this.seconds = gdate.getSeconds();
						this.milliseconds = gdate.getMilliseconds();
						this.day = gdate.getDay();
					}
				} else {
					diff = calendarFunctions.difference(gregorianRef[this.M_ROWS], date, "day");
					for (j = 0; j <= 11; j++) {
						if (this.MONTH_LENGTH[this.M_LAST_INDX].charAt(j) === "1") {
							monthL = 30;
						} else if (this.MONTH_LENGTH[this.M_LAST_INDX].charAt(j) === "0") {
							monthL = 29;
						}
						if (diff > monthL) {
							diff = diff - monthL;
						} else {
							flag = 1;
							break;
						}
					}
					
					if (flag === 1) {
						if (diff === 0) {
							diff = 1;
							if (j === 11) {
								j = 1;
								++i;
							} else {
								++j;
							}
						} else {
							if (diff === monthL) {
								diff = 0;
								if (j === 11) {
									j = 0;
									++i;
								} else {
									++j;
								}
							}
							diff++;
						}
					}
					this.date = diff;
					this.month = j;
					this.year = this.HIJRI_END;
					this.hours = gdate.getHours();
					this.minutes = gdate.getMinutes();
					this.seconds = gdate.getSeconds();
					this.milliseconds = gdate.getMilliseconds();
					this.day = gdate.getDay();
				}

			}
			else {
				var islamicDate = islamicCalendar.fromGregorian(date);
				this.date = islamicDate.date;
				this.month = islamicDate.month;
				this.year = islamicDate.year;
				this.hours = islamicDate.hours;
				this.minutes = islamicDate.minutes;
				this.seconds = islamicDate.seconds;
				this.milliseconds = islamicDate.milliseconds;
				this.day = islamicDate.day;
			}
			return this;
		},
		
		toLocalTime : function (date, timeZone) {
			var islamicDate = this.fromGregorian(date);
			var dt = new Date(date);
			var result = new Record();
			result.set("weekday", timeZone === "UTC" ? dt.getUTCDay() : dt.getDay());
			result.set("era", 0);
			result.set("year", islamicDate.year);
			result.set("month", islamicDate.month);
			result.set("day", islamicDate.date);
			calendarFunctions.setTimeFields(dt, timeZone, result);
			return result;
		}
	};
	
	return umalquraCalendar;
});