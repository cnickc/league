import axios from 'axios'

export default {
    name: 'Login',
    data() {
        return {
            input: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            axios.post(`/api/login`, {
                body: this.input
              })
              .then(response => { console.log(`xxx`,response,`qqq`)})
              .catch(e => {
                this.errors.push(e)
              })
        }
    }
}
