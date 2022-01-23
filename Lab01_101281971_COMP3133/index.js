const csv = require('csv-parser');
const fs = require('fs');
const main_data = [];

try {
	if(fs.existsSync('canada.txt')) {
		fs.unlinkSync('canada.txt');
		console.log('canada.txt Deleted Successfully....');
	}
}
catch(err) {
	console.log('canada.txt not found');
}

try {
	if(fs.existsSync('usa.txt')) {
		fs.unlinkSync('usa.txt');
		console.log('usa.txt Deleted Successfully....');
	}
}
catch(err) {
	console.log('usa.txt not found');
}

fs.createReadStream('input_countries.csv')
	.pipe(csv())
	.on('data', (data) => main_data.push(data))
	.on('end', () => { 
		parse_data(main_data);
	});

function parse_data(data) {
	let ca = [], us = [];
	for(let i = 0; i < data.length; i++) {
		let entry = '';
		if(data[i].country === 'Canada') {
			entry = data[i].country + ',' + data[i].year + ',' + data[i].population;
			ca.push(entry);
		}
		else if(data[i].country === 'United States') {
		 	entry = data[i].country + ',' + data[i].year + ',' + data[i].population;
			us.push(entry);
		}
	}
	let ca_data = fs.createWriteStream('canada.txt');
	ca_data.on('error', function(err) {} );
	ca.forEach(value => ca_data.write(`${value}\n`));
	ca_data.on('finish', () => {
		ca_data.end();
	});
	
	let us_data = fs.createWriteStream('usa.txt');
	us_data.on('error', function(err) {} );
	us.forEach(value => us_data.write(`${value}\n`));
	us_data.on('finish', () => {
		us_data.end();
	});
}