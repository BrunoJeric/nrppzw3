<template>
	<div>
		<h1>Counter</h1>
		<h1 class="counter">{{ counter }}</h1>
		<Button
			@btn-click="addToCounter(-parseInt(value))"
			:color="'red'"
			:text="'MINUS'"
		/>
		<input type="number" v-model="value" />
		<Button
			@btn-click="addToCounter(parseInt(value))"
			:color="'blue'"
			:text="'PLUS'"
		/>
		<div>
			<p v-if="nextRandom != 0"> Next Random: <b>{{nextRandom}}</b></p>
			<p v-else>Loading...</p>
			<Button
				@btn-click="addRandom(nextRandom)"
				:color="'green'"
				:text="'Add Random'"
			/>
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations,mapActions } from 'vuex';
import Button from './Button.vue';
export default {
	data() {
		return {
			value: 1,
		};
	},
	computed: {
		...mapState(['counter', 'nextRandom']),
	},
	components: {
		Button,
	},
	methods: {
		...mapMutations(['addToCounter']),
        ...mapActions(['getNextRandom']),
		addRandom(nextRandom) {
			this.addToCounter(nextRandom)
			this.$store.dispatch('getNextRandom')
		}
	},
	beforeCreate() {
		this.$store.dispatch('getNextRandom')
	},
};
</script>

<style scoped>
.counter {
	font-size: 5rem;
}
input {
	padding: 0.4rem;
	margin: 0 0.5rem;
	text-align: center;
}
</style>
