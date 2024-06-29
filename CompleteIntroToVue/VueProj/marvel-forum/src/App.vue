<script>
  import CharacterStats from "./components/CharacterStats.vue"
  import CharacterCards from "./components/CharacterCards.vue"
  import CharacterLayouts from "./components/CharacterLayouts.vue"
  export default {
    components: {
      CharacterStats,
      CharacterCards,
      CharacterLayouts,
    },
    data() {
      return {
            genderOptions: ["Male", "Female", "Unspecified"],
            listOfCharacters: [
              {name: "Captain America",
                skill: "Shield Throwing",
                gender: "Male"},
              
              {name: "Iron Man",
                skill: "Blasting Beams",
                gender: "Male"},
              
              {name: "Hulk",
                skill: "Raging",
                gender: "Male"},
              
              {name: "Black Widow",
                skill: "Whacking and Smacking",
                gender: "Female"},
              
              {name: "Hawkeye",
                skill: "Arrow Shooting",
                gender: "Male"},
              
                {name: "Some Dude",
                skill: "",
                gender: "Unspecified"}
            ],
            favouriteCharacters: new Set(),
            newCharacter: {
                name: "",
                skill: "",
                gender: "Unspecified"
            }
        }
    },
    methods: {
        addFavourite(payload) {
          this.favouriteCharacters.add(payload) 
        },
        addCharacter() {
            //console.log(inputCharacter)
            this.listOfCharacters.push(this.newCharacter)
            this.newCharacter = {
                name: "",
                skill: "",
                gender: "Unspecified",
            }
        }
    }
  }
</script>

<template>
  <CharacterLayouts>
    <template v-slot:sidebar>
      <h1>Marvel Superheroes!!!</h1>
    </template>
    <template v-slot:main>
      <div v-for="(character, index) in listOfCharacters" :key="`char-${index}`">
        <CharacterCards :character="character" @add-favourite="addFavourite"/>
      </div>
    </template>
    <template #footer>
      <h2>Favourite Characters</h2>
      <p>{{ favouriteCharacters }}</p>  
    </template>
  </CharacterLayouts>
  
  
  <hr />
  <h2>Add Characters</h2>
  <pre>
      {{ newCharacter }}
  </pre>
  <div>
      <input type="text" placeholder="Hero Name" v-model="newCharacter.name"/>
      <br/>
      <input type="text" placeholder="Hero Skill" v-model="newCharacter.skill"/>
      <br/>
      <select v-model="newCharacter.gender">
          <option v-for="(gender, index) in genderOptions" :key="`gender-${index}`">
            {{ gender }}
          </option>
      </select>
      <button @click="addCharacter">Submit</button>
  </div>
  <hr />
  <div>
      <h2>Add Character Pt.2</h2>
      <label for="character-name">Name: </label>
      <input type="text" 
      placeholder="Hero Name" 
      v-model="newCharacter.name"
      @keyup.enter="addCharacter"/>
  </div>
  <hr />
  <CharacterStats :characters="listOfCharacters"/>
  <hr />
  <p>
      <span v-for="(character, index) in listOfCharacters" :key="`char-${index}`">
          {{ character.name }}{{ index === listOfCharacters.length - 1 ? '' : ', '}}
      </span>
  </p>
  <p>{{ listOfCharacters.map(a => a.name).join(", ") }}</p>
  <p>{{ listOfCharacters.map(({ name }) => name) }}</p>

</template>