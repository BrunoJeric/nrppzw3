import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
	state() {
		return {
			counter: 0,
			nextRandom: 0,
			history: [0],
		}
	},
	mutations: {
		addToCounter(state, payload) {
			state.counter += payload;
			state.history.push(state.counter)
		},
		setNextRandom(state, payload) {
			console.log(payload)
			state.nextRandom = payload;
		},
	},
	actions: {
		async getNextRandom(context) {
			let data = await axios.get(
				'https://www.random.org/integers/?num=1&min=-1000&max=1000&col=1&base=10&format=plain&rnd=new'
			);
			context.commit('setNextRandom', data.data);
		},
	},
	getters: {
		activeIndexes: (state) => (payload) => {
            let indexes = [];
            state.history.forEach((number, index) => {
                if(number === payload) {
                    indexes.push(index)
                }
            });
            return indexes
        }
	},
	modules: {},
});
