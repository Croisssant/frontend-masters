<script>
export default {
    props: {
        character: {
            type: Object,
            required: true
        }
    },
    emits: ["add-favourite"],
    methods: {
        addFavouriteCharacter() {
            this.$emit("add-favourite", this.character.name)
        }
    }
}
</script>

<template>
    <h1>{{ character.name }}</h1>
    <p v-if="character.skill">{{ character.skill }}</p>
    <p v-else>What Skill?</p>
    <button @click="addFavouriteCharacter">Favourite</button>
</template>