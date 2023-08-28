function dateDuration(startDate, endDate) {
	return dateStatus(dateToSeconds(endDate) - dateToSeconds(startDate));
}

function dateStatus(seconds) {
	if (seconds > 60 * 60 * 24 * 365.25) {
	return `${secondsToYears(seconds)} Tahun`;
	} else if (seconds > 60 * 60 * 24 * 30.44) {
	return `${secondsToMonths(seconds)} Bulan`;
	// } else if (seconds > 60 * 60 * 24 * 7) {
	// return `${secondsToWeeks(seconds)} Minggu`
	}else {
	return `${secondsToDays(seconds)} Hari`;
	}
}

function dateToSeconds(date) {
	return Math.floor(new Date(date).getTime() / 1000); // Menggunakan getTime() untuk mendapatkan waktu dalam milidetik, lalu dibagi 1000 untuk mendapatkan detik
}

function secondsToDays(seconds) {
	const secondsInADay = 86400; // Jumlah detik dalam sehari (24 jam x 60 menit x 60 detik)
	return Math.floor(seconds / secondsInADay);
}

// function secondsToWeeks(seconds) {
//     const secondsInAWeek = 60 * 60 * 24 * 7; // Jumlah detik dalam seminggu (7 hari x 24 jam x 60 menit x 60 detik)
//     return Math.floor(seconds / secondsInAWeek);
// }

function secondsToMonths(seconds) {
	const secondsInMonth = 60 * 60 * 24 * 30.44; // Rata-rata jumlah detik dalam sebulan
	return Math.floor(seconds / secondsInMonth);
}

function secondsToYears(seconds) {
	const secondsInYear = 60 * 60 * 24 * 365.25; // Rata-rata tahun dalam detik
	return Math.floor(seconds / secondsInYear);
}

module.exports = dateDuration;