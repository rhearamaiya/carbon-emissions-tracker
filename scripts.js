
const baseURL = "https://www.carboninterface.com/api/v1"

const clear = `
<section id="electricity_estimate">
<!-- Electricity estimate goes here -->
</section>

<!-- <button id="flight" class="btn">Flight</button> -->
<!-- <button id="flight" type="button" class="btn btn-primary">Flight</button> -->

<section id="flight_estimate">
<!-- Flight estimate goes here -->
</section>

<!-- <button id="shipping" class="btn">Shipping</button> -->
<!-- <button id="shipping" type="button" class="btn btn-primary">Shipping</button> -->

<section id="shipping_estimate">
<!-- Shipping estimate goes here -->
</section>

<!-- <button id="vehicle" class="btn">Vehicle</button> -->
<!-- <button id="vehicle" type="button" class="btn btn-primary">Vehicle</button> -->

<section id="vehicle_estimate">
<!-- Vehicle estimate goes here -->
</section>
`

// FOR ELECTRICITY //
document.querySelector("#btn").onclick = value => {
	console.log('why not here')
	console.log(document.querySelector('#choose-type').value)
	console.log(document.getElementById("value").value)
}

document.querySelector('#btn').onclick = ev => {
	if(document.querySelector('#choose-type').value === "electricity"){
		var val=document.getElementById("value").value
		var electricity_data = {
		"type": "electricity",
		"electricity_unit": "mwh",
		"electricity_value": val,
		"country": "us",
		"state": "fl"
	}
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
			console.log("result:", electricity_data)
			console.log(typeof val)
			document.querySelector('#all_results').innerHTML=clear
			document.querySelector('#electricity_estimate').innerHTML = `Carbon released from ${val} megawatt hours of electricity in Florida: ${result.data.attributes.carbon_g} grams`
			
		});
	}


// FOR FLIGHT //

if(document.querySelector('#choose-type').value === "flight")
{
var val=document.getElementById("value").value
const flight_data = {
	"type": "flight",
	"passengers": val,
	"legs": [
		{"departure_airport": "sfo", "destination_airport": "yyz"},
		{"departure_airport": "yyz", "destination_airport": "sfo"}
	]
}
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
		document.querySelector('#all_results').innerHTML=clear
		document.querySelector('#flight_estimate').innerHTML = `Carbon released from round-trip, ${val}-passenger flight San Francisco International Airport
		to Toronto Pearson International Airport: ${result.data.attributes.carbon_g} grams`
	});
}

// FOR SHIPPING //

if(document.querySelector('#choose-type').value === "shipping")
{
var val=document.getElementById("value").value

const shipping_data = {
	"type": "shipping",
	"weight_value": val,
	"weight_unit": "g",
	"distance_value": 2000,
	"distance_unit": "km",
	"transport_method": "truck"
}
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
		document.querySelector('#all_results').innerHTML=clear
		document.querySelector('#shipping_estimate').innerHTML = `Carbon released from ${val}g shipment for 2000km by truck: ${result.data.attributes.carbon_g} grams`
	});
}

// FOR VEHICLE //

if(document.querySelector('#choose-type').value === "vehicle")
{
var val=document.getElementById("value").value
const vehicle_data = {
"type": "vehicle",
"distance_unit": "mi",
"distance_value": val,
"vehicle_model_id": "7268a9b7-17e8-4c8d-acca-57059252afe9"
}
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
		document.querySelector('#all_results').innerHTML=clear
		document.querySelector('#vehicle_estimate').innerHTML = `Carbon released from ${val}mi by 1993 Toyota Corolla: ${result.data.attributes.carbon_g} grams`
	});
}
};
