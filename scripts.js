const C_A_K='Bearer pt7oRhb0oW4CSc7IHKIDg';

// GLOBAL VARIABLES:
const baseURL = "https://www.carboninterface.com/api/v1"

var MAKE_ID
var MODEL_ID

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
// document.querySelector("#btn").onclick = value => {
// 	console.log('why not here')
// 	console.log(document.querySelector('#choose-type').value)
// 	console.log(document.getElementById("value").value)
// }

const selectType = document.getElementById('choose-type');

selectType.addEventListener('change', (event) => {
	var emissionType = event.target.value
	// console.log(emissionType)

	if(emissionType==='electricity'){

		document.querySelector('#values').innerHTML = 
		`
		<br>
		<input type="text" id="value" value="" placeholder="Enter megawatt hours">
		<br>
		<select id = "state">
	<option value="AL">Alabama</option>
	<option value="AK">Alaska</option>
	<option value="AZ">Arizona</option>
	<option value="AR">Arkansas</option>
	<option value="CA">California</option>
	<option value="CO">Colorado</option>
	<option value="CT">Connecticut</option>
	<option value="DE">Delaware</option>
	<option value="DC">District Of Columbia</option>
	<option value="FL">Florida</option>
	<option value="GA">Georgia</option>
	<option value="HI">Hawaii</option>
	<option value="ID">Idaho</option>
	<option value="IL" selected>Illinois</option>
	<option value="IN">Indiana</option>
	<option value="IA">Iowa</option>
	<option value="KS">Kansas</option>
	<option value="KY">Kentucky</option>
	<option value="LA">Louisiana</option>
	<option value="ME">Maine</option>
	<option value="MD">Maryland</option>
	<option value="MA">Massachusetts</option>
	<option value="MI">Michigan</option>
	<option value="MN">Minnesota</option>
	<option value="MS">Mississippi</option>
	<option value="MO">Missouri</option>
	<option value="MT">Montana</option>
	<option value="NE">Nebraska</option>
	<option value="NV">Nevada</option>
	<option value="NH">New Hampshire</option>
	<option value="NJ">New Jersey</option>
	<option value="NM">New Mexico</option>
	<option value="NY">New York</option>
	<option value="NC">North Carolina</option>
	<option value="ND">North Dakota</option>
	<option value="OH">Ohio</option>
	<option value="OK">Oklahoma</option>
	<option value="OR">Oregon</option>
	<option value="PA">Pennsylvania</option>
	<option value="RI">Rhode Island</option>
	<option value="SC">South Carolina</option>
	<option value="SD">South Dakota</option>
	<option value="TN">Tennessee</option>
	<option value="TX">Texas</option>
	<option value="UT">Utah</option>
	<option value="VT">Vermont</option>
	<option value="VA">Virginia</option>
	<option value="WA">Washington</option>
	<option value="WV">West Virginia</option>
	<option value="WI">Wisconsin</option>
	<option value="WY">Wyoming</option>
</select>				
		`
		document.querySelector("#values").style.textAlign = "center";
		document.querySelector('#btn').onclick = ev => {

			var val=document.getElementById("value").value;
			var state=document.getElementById("state").value.toLowerCase();

			var electricity_data = {
			"type": "electricity",
			"electricity_unit": "mwh",
			"electricity_value": val,
			"country": "us",
			"state": state
			}

		fetch(`https://www.carboninterface.com/api/v1/estimates`,
		{
			method: 'POST',
			headers: {
				// 'Authorization':'Bearer pt7oRhb0oW4CSc7IHKIDg',
				'Authorization':`${C_A_K}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(electricity_data)
		})
			.then(response => response.json())
			.then(result => {
				document.querySelector('#all_results').innerHTML=clear
				document.querySelector('#electricity_estimate').innerHTML = `Carbon released from ${val} megawatt hours of electricity in ${document.getElementById("state").value}: ${result.data.attributes.carbon_g} grams`
				
				document.querySelector("#electricity_estimate").style.textAlign = "center";
				})

		}}
	
		if(emissionType==='flight')
		{

		document.querySelector('#values').innerHTML = 
		`
		<br>
		<input type="text" id="passenger_no" value="" placeholder="Enter # passengers">
		<br>
		<br>
		
		<input type="text" id="departure_airport" value="" placeholder="Enter departure airport">
		<br>
		<input type="text" id="destination_airport" value="" placeholder="Enter destination airport">
		`
		document.querySelector("#values").style.textAlign = "center";
		document.querySelector('#btn').onclick = ev => {
		var departure_airport = document.getElementById("departure_airport").value
		var destination_airport = document.getElementById("destination_airport").value


		fetch(`http://api.aviationstack.com/v1/airports?access_key=cf8ebf88e8d6a326496624e4c6388000`, {
			method: 'GET'
		})
			.then(response => response.json())
			.then(result => {
				var list_departure = result.data
				var list_destination = result.data
				// console.log('list_departure:', list_departure, 'list_destination', list_destination)
				var obj_departure = list_departure.find(res => res.airport_name === departure_airport)
				var obj_destination = list_destination.find(res => res.airport_name === destination_airport)

				var iata_departure = obj_departure.iata_code
				var iata_destination = obj_destination.iata_code

			// .then(result => {
			// 	obj = result.find(res => res.data.attributes.name === vehicle_model)

			// 	MODEL_ID = obj.data.id


		var passenger_no=document.getElementById("passenger_no").value
		const flight_data = {
			"type": "flight",
			"passengers": passenger_no,
			"legs": [
				{"departure_airport": iata_departure, "destination_airport": iata_destination}
			]
		}
		console.log('flight data: ', flight_data)
		fetch(`https://www.carboninterface.com/api/v1/estimates`,{
			method: 'POST',
			headers: {
				'Authorization':`${C_A_K}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(flight_data)
		})
			.then(response => response.json())
			.then(result => {
				document.querySelector('#all_results').innerHTML=clear
				document.querySelector('#flight_estimate').innerHTML = `Carbon released from round-trip, ${passenger_no}-passenger flight from ${departure_airport}
				to ${destination_airport}: ${result.data.attributes.carbon_g} grams`
				document.querySelector("#flight_estimate").style.textAlign = "center";
				// document.querySelector('#all_results').innerHTML
			
			});

		})
		}}

		if(emissionType==="shipping"){
			document.querySelector('#values').innerHTML = 
			`
			<br>
			
			<input type="text" id="distance_value" value="" placeholder="Enter distance (in km)">
			<br>
			
			<input type="text" id="weight_value" value="" placeholder="Enter weight (in g)">
			<br>
			
			`
			document.querySelector("#values").style.textAlign = "center";

			document.querySelector('#values').style.display="block"

			document.querySelector('#btn').onclick = ev => {

				var distance_value=document.getElementById("distance_value").value;
				var weight_value=document.getElementById("weight_value").value;
	

				const shipping_data = {
					"type": "shipping",
					"weight_value": weight_value,
					"weight_unit": "g",
					"distance_value": distance_value,
					"distance_unit": "km",
					"transport_method": "truck"
				}
				fetch(`https://www.carboninterface.com/api/v1/estimates`,{
					method: 'POST',
					headers: {
						'Authorization':`${C_A_K}`,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(shipping_data)
				})
					.then(response => response.json())
					.then(result => {
						// console.log(result)
						document.querySelector('#all_results').innerHTML=clear
						document.querySelector('#shipping_estimate').innerHTML = `Carbon released from ${weight_value}g shipment for ${distance_value}km by truck: ${result.data.attributes.carbon_g} grams`
						document.querySelector("#shipping_estimate").style.textAlign = "center";

					});
				}
				
		}

		if(emissionType==="vehicle"){
			document.querySelector('#values').innerHTML = 
			`
			<br>
			<input type="text" id="distance_value" value="" placeholder="Enter mileage">
			<br>
			<br>
			<input type="text" id="vehicle_make" value="" placeholder="Enter vehicle make">
			<br>
			<input type="text" id="vehicle_model" value="" placeholder="Enter vehicle model">

			`
			document.querySelector("#values").style.textAlign = "center";
			document.querySelector('#btn').onclick = ev => {

				var distance_value=document.getElementById("distance_value").value;
				var vehicle_make = document.getElementById("vehicle_make").value;
				var vehicle_model = document.getElementById("vehicle_model").value;

				fetch(`https://www.carboninterface.com/api/v1/vehicle_makes`,{
					method: 'GET',
					headers: {
						'Authorization':`${C_A_K}`,
						'Content-Type': 'application/json'
					}

				})
					.then(response => response.json())
					.then(result => {
						obj = result.find(res => res.data.attributes.name === vehicle_make)
						// console.log(obj.data.id)
						// return MAKE_ID = obj.data.id
						return obj.data.id
						// console.log(MAKE_ID)
					})
					.then(result => {
						// console.log('MAKE ID:', MAKE_ID)
						MAKE_ID = result
						// console.log('MAKE_ID:', MAKE_ID)
					

				fetch(`https://www.carboninterface.com/api/v1/vehicle_makes/${MAKE_ID}/vehicle_models`,{
					method: 'GET',
						headers: {
							'Authorization':`${C_A_K}`,
							'Content-Type': 'application/json'
						}
				})
					.then(response => response.json())
					.then(result => {
						obj = result.find(res => res.data.attributes.name === vehicle_model)

						MODEL_ID = obj.data.id
						
						// console.log('MODEL ID: ', MODEL_ID)
					

				const vehicle_data = {
					"type": "vehicle",
					"distance_unit": "mi",
					"distance_value": distance_value,
					"vehicle_model_id": MODEL_ID
					}
					fetch(`https://www.carboninterface.com/api/v1/estimates`,{
						method: 'POST',
						headers: {
							'Authorization':`${C_A_K}`,
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(vehicle_data)
					})
						.then(response => response.json())
						.then(result => {
							//console.log('data:', result.data.attributes.carbon_g);
							//type of car is in response too
							document.querySelector('#all_results').innerHTML=clear
							document.querySelector('#vehicle_estimate').innerHTML = `Carbon released from ${distance_value} miles by ${vehicle_make} ${vehicle_model}: ${result.data.attributes.carbon_g} grams`
							document.querySelector("#vehicle_estimate").style.textAlign = "center";

							});
						})
					})
					}
					}
	});