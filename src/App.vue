<template>
  <div class="container">
    <div class="topWrapper">
      <div class="selectWrapper">
        <label for="quoteCategory">Select quote category:</label>
        <select
          name="quoteCategory"
          id="quoteCategory"
          v-model="selectedCategory"
        >
          <option value="select">No category</option>
          <option value="age">Age</option>
          <option value="art">Art</option>
          <option value="car">Car</option>
        </select>
      </div>

      <div class="topButtons">
        <button class="shareBtn" @click="shareQuote('telegram')">
          <i class="pi pi-telegram" style="font-size: 1rem"></i>Share
        </button>
        <button class="shareBtn" @click="shareQuote('facebook')">
          <i class="pi pi-facebook" style="font-size: 1rem"></i>Share
        </button>
        <button class="copyBtn" @click="copyQuote">
          <i class="pi pi-copy" style="font-size: 1rem"></i> Copy
        </button>
      </div>
    </div>

    <div class="quote">
      <SkeletonLoader v-if="loading" />
      <div v-else>
        <h2>{{ currentQuote.quote }}</h2>
        <p>{{ currentQuote.author }}</p>
      </div>
    </div>

    <div v-if="loading" class="loader">Loading...</div>

    <button class="addBtn" @click="addQuote" :disabled="loading">
      Generate new quote
    </button>

    <div class="quotesTable" v-if="quotes.length">
      <h2>Quotes history</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Quote</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(quote, index) in quotes" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ quote.quote }}</td>
            <td>{{ quote.author }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { toast } from 'vue3-toastify'
import SkeletonLoader from './components/SkeletonLoader.vue'

export default {
  components: {
    SkeletonLoader,
  },
  computed: {
    ...mapState(['quotes', 'currentQuote']),
  },
  data() {
    return {
      loading: false,
      selectedCategory: 'select',
    }
  },
  methods: {
    async addQuote() {
      this.loading = true
      try {
        await this.$store.dispatch('fetchCurrentQuote', this.selectedCategory)
        this.$store.dispatch('addNewQuote', this.currentQuote)
      } catch (error) {
        console.error('Error fetching quote:', error)
      } finally {
        this.loading = false
      }
    },
    copyQuote() {
      const quoteText = `"${this.currentQuote.quote} - ${this.currentQuote.author}""`
      navigator.clipboard
        .writeText(quoteText)
        .then(() => {
          toast.success('Quote copied to clipboard!', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          })
        })
        .catch((err) => {
          console.error('Failed to copy the quote:', err)
          toast.error('Failed to copy quote!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          })
        })
    },
    shareQuote(platform) {
      const quoteText = encodeURIComponent(this.currentQuote.quote)
      const author = encodeURIComponent(this.currentQuote.author)
      const fullQuote = `${quoteText} - ${author}`
      let url

      if (platform === 'telegram') {
        url = `https://t.me/share/url?text=${fullQuote}`
      } else if (platform === 'facebook') {
        url = `https://www.facebook.com/sharer/sharer.php?text=${fullQuote}`
      }

      window.open(url, '_blank')
    },
  },
  mounted() {
    this.$store.dispatch('fetchCurrentQuote', this.selectedCategory)
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', Helvetica, sans-serif;
  background: #ffffff;
}
.container {
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
  margin: 2rem auto;
  padding: 2rem;
  gap: 8px;
  max-width: min(1124px, 90%);
}

.topWrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.topButtons {
  display: flex;
  gap: 8px;
}

.copyBtn {
  display: flex;
  width: fit-content;
  align-self: flex-end;
  padding: 8px;
  border: none;
  cursor: pointer;
  background: transparent;
  border-radius: 8px;
  font-weight: 600;
  gap: 4px;
  transition: background-color 0.3s ease-in-out;
}

.shareBtn {
  display: flex;
  width: fit-content;
  align-self: flex-end;
  padding: 8px;
  border: none;
  cursor: pointer;
  background: transparent;
  border-radius: 8px;
  font-weight: 600;
  gap: 4px;
  transition: background-color 0.3s ease-in-out;
}

.copyBtn:hover {
  background-color: #ddd;
}

.shareBtn:hover {
  background-color: #ddd;
}

.quote {
  padding: 1rem;
  font-size: 24px;
  text-align: left;
  border-radius: 8px;
  background-color: #f2f2f2;
  margin-bottom: 1rem;
}

.quote p {
  margin-top: 8px;
  text-align: right;
  font-size: 20px;
  font-weight: 400;
}

.addBtn {
  background-color: #f2f2f2;
  padding: 0;
  height: 40px;
  width: 33%;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.addBtn:hover {
  background-color: #ddd;
}

.quotesTable {
  margin-top: 2rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.selectWrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 300px;
  margin: 1rem 0;
  font-family: 'Arial', sans-serif;
}

.selectWrapper label {
  font-size: 1rem;
  color: #464646;
  font-weight: 600;
  text-align: center;
}

.selectWrapper select {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #333;
  border: 2px solid #f2f2f2;
  border-radius: 0.5rem;
  background-color: #ffffff;
  outline: none;
  appearance: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.1);
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23979797' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1rem;
}

.selectWrapper select:hover {
  border-color: #ddd;
}

.selectWrapper select:focus {
  border-color: #979797;
  box-shadow: 0px 0px 5px rgba(241, 220, 214, 0.5);
}
</style>
