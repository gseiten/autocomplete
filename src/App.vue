
<template>
<div id="app">

	<section class="hero is-info has-background is-transparent" style="height: 100vh">
		<div class="hero-head">
		</div>
		<div class="hero-body">
			<div class="container has-text-centered">
				<div class="column is-6 is-offset-3">
					<h1 class="title">
						Gseiten Autocomplete 101
					</h1>
					<h2 class="subtitle">
						Search as you go...
					</h2>
					<div class="">
						
						<b-field label="">
							<b-autocomplete
								rounded
								clearable
								expanded
								max-height="500px"
								size="is-medium"
								v-model="location_name"
								:data="location_data"
								field="name"
								placeholder="e.g. delhi"
								icon="magnify"
								@typing="getAsyncData"
								@select="option => selected_location = option">
								<template slot="empty">No results found</template>

								<template slot-scope="props">
									<div class="is-inline-block">
										<div class="has-text-weight-bold is-size-6">{{ props.option.name }}</div>
										<div>{{ props.option.type }}, {{ props.option.state }}, {{ props.option.country }}</div>
									</div>
								</template>


							</b-autocomplete>
						</b-field>

						<section class="box" v-if="selected_location">
							<div class="content">
								
								<h3>
									{{ selected_location['name'] }}, 
									<span v-if="selected_location['city']"> {{ selected_location['city'] }},</span>
									<span v-if="selected_location['postcode']"> {{ selected_location['postcode'] }},</span>
									<span v-if="selected_location['state']"> {{selected_location['state']}},</span>
									<span> {{selected_location['country']}}</span>
									<br>
									<span class="has-text-link">{{ selected_location['coordinates']['lat'] }}, {{ selected_location['coordinates']['lon'] }}</span>
									<br>
									<span class="is-italic has-text-info">{{ selected_location['type'] }}</span>
								</h3>
							</div>
							
						</section>


						
					</div>
				</div>
			</div>
		</div>
	</section>

</div>
</template>

<script>

// import axios from 'axios';
import debounce from 'lodash/debounce';

export default {

	name: 'App',
	components: {},
	data() {
		return {
			location_name: "",
			location_data: [],
			selected_location: null,
			isFetching: false,

		}
	},

	methods: {

		// getAsyncData: function(name){
		// 	let letterCount = name.replace(/\s+/g, '').length;
		// 	if(letterCount > 3){
		// 		axios.get(`http://photon.komoot.de/api/?q=${name}&limit=8`).then(response => {
		// 			this.location_data = [];
		// 			for(var i in response.data['features']){
		// 				this.location_data.push(
		// 					{
		// 						'name': response.data['features'][i]['properties']['name'],
		// 						'country':  response.data['features'][i]['properties']['country'],
		// 						'type': response.data['features'][i]['properties']['osm_value'],
		// 						'state': response.data['features'][i]['properties']['state']
		// 					}
		// 				)
		// 			}
		// 	})
		// 	}
		// }

		getAsyncData: debounce(function (name) {
			if (!name.length) {
				this.location_data = []
				return
			}
			this.isFetching = true
			this.$http.get(`https://photon.komoot.de/api/?q=${name}&limit=8`)
				.then(({ data }) => {
					this.location_data = []
					data.features.forEach((item) => this.location_data.push(
						{
							'name': item.properties.name,
							'country': item.properties.country,
							'type': item.properties.osm_value,
							'state': item.properties.state,
							'postcode': item.properties.postcode,
							'city': item.properties.city,
							'coordinates': {
								'lat': item.geometry.coordinates[0],
								'lon': item.geometry.coordinates[1]
							}
						}
					))
				})
				.catch((error) => {
					this.location_data = []
					throw error
				})
				.finally(() => {
					this.isFetching = false
				})
		}, 250)

	}
}

</script>

<style>

.hero.has-background {
    background: url('./assets/background.jpg');
    position: relative;
    overflow: hidden;
}

.hero-background {
    position: absolute;
    object-fit: cover;
    object-position: center center;
    width: 100%;
    height: 100%;
}

/* .hero-background.is-transparent {
    opacity: 0.8;
} */
</style>
