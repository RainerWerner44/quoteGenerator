import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      quotes: [],
      currentQuote: { quote: '', author: '' },
    }
  },
  mutations: {
    addQuote(state, quote) {
      state.quotes.push(quote)
    },
    setCurrentQuote(state, quote) {
      state.currentQuote = quote
    },
  },
  actions: {
    async fetchCurrentQuote({ commit }, category) {
      try {
        const url =
          category === 'select'
            ? 'https://api.api-ninjas.com/v1/quotes'
            : `https://api.api-ninjas.com/v1/quotes?category=${category}`

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'X-Api-Key': `${process.env.VUE_APP_API_KEY}`,
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        if (data && Array.isArray(data) && data.length > 0) {
          commit('setCurrentQuote', {
            quote: data[0].quote,
            author: data[0].author,
          })
        }
      } catch (error) {
        console.error('Error fetching current quote:', error)
      }
    },

    addNewQuote({ commit }, quote) {
      commit('addQuote', quote)
    },
  },
})

export default store
