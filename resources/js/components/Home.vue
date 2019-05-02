<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default">
                    <div class="card-header">
                        Vue.JS SPA example
                    </div>
                    <div class="card-body">
                        <h2>{{welcome}} :)</h2>
                        <img width="150" :src="'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-9/59347638_1948996375212321_2870244957933797376_n.jpg?_nc_cat=100&_nc_oc=AQmhG5SLhPOOCH2RtRdLD13VV-Zy0AIbIUbABv1YMAhUkFBAHomBVZ3Y2VJvKBH0JRw&_nc_ht=scontent.fhan2-4.fna&oh=cd4b35c71e8d9cd3f6985f700332fdb8&oe=5D3380FA'" alt="WeCode">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'home',
    computed: {
        welcome(){
            return this.$store.getters.welcome;
        }
    }
}
</script>

