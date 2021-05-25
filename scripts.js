const baseURL = "https://www.carboninterface.com/api/v1"

// FOR ELECTRICITY //

//hard coded data/parameters
const electricity_data = {
        "type": "electricity",
        "electricity_unit": "mwh",
        "electricity_value": 42,
        "country": "us",
        "state": "fl"
}

document.querySelector('#electricity').onclick = ev => {
	fetch(`https://www.carboninterface.com/api/v1/estimates`,{
        method: 'POST',
        headers: {
			'Authorization':'Bearer pt7oRhb0oW4CSc7IHKIDg',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(electricity_data)
    })
		.then(response => response.json())
		.then(result => {
			//console.log('data:', result.data.attributes.carbon_g);
			document.querySelector('#electricity_estimate').innerHTML = `Carbon released from 42 megawatt hours of electricity in Florida: ${result.data.attributes.carbon_g} grams`
			
		});
};

// FOR FLIGHT //

const flight_data = {
	"type": "flight",
	"passengers": 2,
	"legs": [
	  {"departure_airport": "sfo", "destination_airport": "yyz"},
	  {"departure_airport": "yyz", "destination_airport": "sfo"}
	]
}

document.querySelector('#flight').onclick = ev => {
fetch(`https://www.carboninterface.com/api/v1/estimates`,{
	method: 'POST',
	headers: {
		'Authorization':'Bearer pt7oRhb0oW4CSc7IHKIDg',
		'Content-Type': 'application/json'
	},
	body: JSON.stringify(flight_data)
})
	.then(response => response.json())
	.then(result => {
		//console.log('data:', result.data.attributes.carbon_g);
		document.querySelector('#flight_estimate').innerHTML = `Carbon released from round-trip, 2-passenger flight San Francisco International Airport
		to Toronto Pearson International Airport: ${result.data.attributes.carbon_g} grams`
	});
};

// FOR SHIPPING //

const shipping_data = {
	"type": "shipping",
	"weight_value": 200,
	"weight_unit": "g",
	"distance_value": 2000,
	"distance_unit": "km",
	"transport_method": "truck"
}

document.querySelector('#shipping').onclick = ev => {
fetch(`https://www.carboninterface.com/api/v1/estimates`,{
	method: 'POST',
	headers: {
		'Authorization':'Bearer pt7oRhb0oW4CSc7IHKIDg',
		'Content-Type': 'application/json'
	},
	body: JSON.stringify(shipping_data)
})
	.then(response => response.json())
	.then(result => {
		//console.log('data:', result.data.attributes.carbon_g);
		document.querySelector('#shipping_estimate').innerHTML = `Carbon released from 200g shipment for 2000km by truck: ${result.data.attributes.carbon_g} grams`
	});
};

// FOR VEHICLE //

const vehicle_data = {
	"type": "vehicle",
	"distance_unit": "mi",
	"distance_value": 100,
	"vehicle_model_id": "7268a9b7-17e8-4c8d-acca-57059252afe9"
}

document.querySelector('#vehicle').onclick = ev => {
fetch(`https://www.carboninterface.com/api/v1/estimates`,{
	method: 'POST',
	headers: {
		'Authorization':'Bearer pt7oRhb0oW4CSc7IHKIDg',
		'Content-Type': 'application/json'
	},
	body: JSON.stringify(vehicle_data)
})
	.then(response => response.json())
	.then(result => {
		//console.log('data:', result.data.attributes.carbon_g);
		//type of car is in response too
		document.querySelector('#vehicle_estimate').innerHTML = `Carbon released from 100mi by 1993 Toyota Corolla: ${result.data.attributes.carbon_g} grams`
	});
};