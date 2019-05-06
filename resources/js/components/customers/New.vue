<template>
    <div class="customer-new">
        <form @submit.prevent="add">
            <table class="table">
                <tr>
                    <th>Name</th>
                    <td>
                        <input type="text" class="form-control" v-model="customer.name" placeholder="Customer Name">
                    </td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>
                        <input type="text" class="form-control"  v-model="customer.email" placeholder="Customer Email">
                    </td>
                </tr>
                <tr>
                    <th>Phone</th>
                    <td>
                        <input type="text" class="form-control" v-model="customer.phone" placeholder="Customer Phone">
                    </td>
                </tr>
                <tr>
                    <th>Website</th>
                    <td>
                        <input type="text" class="form-control" v-model="customer.website" placeholder="Customer Website">
                    </td>
                </tr>
                <tr>
                    <td>
                        <router-link to="/customers" class="btn">Cancel</router-link>
                    </td>
                    <td>
                        <input type="submit" value="Create" class="btn btn-primary">
                    </td>
                </tr>
            </table>
        </form>
        <div class="errors" v-if="errors">
            <ul>
                <li v-for="(fieldsError, fieldName) in errors" :key="fieldName">
                    <strong>{{ fieldName }}</strong> {{ fieldsError.join('\n') }}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import validate from 'validate.js';
export default {
    name: 'new',
    data() {
        return {
            customer: {
                name: '',
                email: '',
                phone: '',
                website: ''
            },
            errors: null
        }
    },
    computed: {
        currentUser() {
            return this.$store.getters.currentUser;
        }
    },
    methods: {
        add() {
            this.errors = null;

            const constraints = this.getConstraints();

            const errors = validate(this.customer, constraints);

            if(errors) {
                this.errors = errors;
                return;
            }

            axios.post('/api/customers/new', this.customer, {
                headers: {
                    "Authorization": `Bearer ${this.currentUser.token}`
                }
            })
            .then((response) => {
                this.$router.push('/customers');
            })
            .catch((error) => {
                console.log(error);
            })
        },
        getConstraints() {
            return {
                name: {
                    presence: true,
                    length: {
                        minimum: 3,
                        message: 'Must be at least 3 characters long'
                    }
                },
                email: {
                    presence: true,
                    email: true
                },
                phone: {
                    presence: true,
                    numericality: true,
                    length: {
                        minimum: 10,
                        message: 'Must be at least 10 digits long'
                    }
                },
                website: {
                    presence: true,
                    url: true
                }
            }
        }
    }
}
</script>
<style scoped>
    .errors {
        background: lightcoral;
        border-radius: 5px;
        padding: 21px 0 2px 0;
    }
</style>


