
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
				'Authorization':'Bearer pt7oRhb0oW4CSc7IHKIDg',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(electricity_data)
		})
			.then(response => response.json())
			.then(result => {
				document.querySelector('#all_results').innerHTML=clear
				document.querySelector('#electricity_estimate').innerHTML = `Carbon released from ${val} megawatt hours of electricity in ${document.getElementById("state").value}: ${result.data.attributes.carbon_g} grams`
			
				})

		}}
	
		if(emissionType==='flight')
		{

		document.querySelector('#values').innerHTML = 
		`
		<br>
		<input type="text" id="passenger_no" value="" placeholder="Enter # passengers">
		<br>
		
		<input type="text" id="departure_airport" value="sfo" placeholder="Enter departure airport">
		<br>
		<input type="text" id="destination_airport" value="yyz" placeholder="Enter destination airport">
		`
		document.querySelector('#btn').onclick = ev => {

		var passenger_no=document.getElementById("passenger_no").value
		const flight_data = {
			"type": "flight",
			"passengers": passenger_no,
			"legs": [
				{"departure_airport": "sfo", "destination_airport": "yyz"}
			]
		}
		console.log('flight data: ', flight_data)
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
				console.log('getting here?')
				document.querySelector('#all_results').innerHTML=clear
				document.querySelector('#flight_estimate').innerHTML = `Carbon released from round-trip, ${passenger_no}-passenger flight San Francisco International Airport
				to Toronto Pearson International Airport: ${result.data.attributes.carbon_g} grams`
			});
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
						'Authorization':'Bearer pt7oRhb0oW4CSc7IHKIDg',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(shipping_data)
				})
					.then(response => response.json())
					.then(result => {
						console.log(result)
						document.querySelector('#all_results').innerHTML=clear
						document.querySelector('#shipping_estimate').innerHTML = `Carbon released from ${weight_value}g shipment for ${distance_value}km by truck: ${result.data.attributes.carbon_g} grams`
					});
				}
				
		}

		if(emissionType==="vehicle"){
			document.querySelector('#values').innerHTML = 
			`
			<br>
			<input type="text" id="distance_value" value="" placeholder="Enter mileage">
			`
			document.querySelector("#values").style.textAlign = "center";
			document.querySelector('#btn').onclick = ev => {

				var distance_value=document.getElementById("distance_value").value;

				const vehicle_data = {
					"type": "vehicle",
					"distance_unit": "mi",
					"distance_value": distance_value,
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
							document.querySelector('#vehicle_estimate').innerHTML = `Carbon released from ${distance_value}mi by 1993 Toyota Corolla: ${result.data.attributes.carbon_g} grams`
						});

					}
				}
});