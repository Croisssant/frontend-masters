<script>
    export default {
        props: {
            characters: {
                type: Array,
                required: true
            }
        },
        computed: {
            genderPercentage() {
                return this.characters.reduce(function(obj, v) {
                    obj[v.gender] = (obj[v.gender] || 0) + 1
                    return obj
                }, {})
            }
        }
    }
</script>

<template>
    <h2>Gender Chart</h2>
    <h3>{{ genderPercentage }}</h3>
</template>