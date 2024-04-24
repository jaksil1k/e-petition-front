<template>

  <section class="poster">
    <h1 class="poster__title">The way to change your future</h1>
    <p class="poster__text">200 000 people are already changing a future of their country</p>
    <router-link to="/create-petition"><button class="poster__button" >Start a petition</button></router-link>
  </section>
  <section class="slider">
    <img class="slider__image" src="@/assets/images/slider-image.png" alt="slider img"/>
    <div class="slider__content">
      <p class="slider__title">A petition about domestic violence has been signed by over 233 222 people</p>
      <p class="slider__description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacus lorem, placerat vitae ornare id,
        interdum eu quam. Donec cursus ac lacus quis vulputate. Phasellus pulvinar convallis nunc at efficitur.
        Proin vehicula turpis in mauris posuere aliquam. Nam elementum est sem, sed porttitor mi consectetur et.
      </p>
      <div class="slider__buttons-group">
        <button class="slider__button">
          <img class="slider__icon" src="@/assets/images/france-icon.png" alt="france icon"/>
          <p class="slider__text">France</p>
        </button>
        <button class="slider__button">
          <img class="slider__icon" src="@/assets/images/people-icon.png" alt="people icon"/>
          <p class="slider__text"><b>233 222 <br/></b>participants</p>
        </button>
      </div>
    </div>
  </section>
  <section class="breadcrumb">
    <h3 class="breadcrumb__title">
      Petitions
    </h3>

    <ul class="breadcrumb__list">
      <li class="breadcrumb__item" v-for="item in list" :key="item.id">
        <article class="article" @click="showPetition(item.id)">
          <div class="article__content">
            <div class="article__info">
              <div class="article__title">
                {{item.title}}
              </div>
              <div class="article__description">
                {{item.body}}
              </div>
            </div>
            <img class="article__image" src="@/assets/images/article-image.png" alt="petition image">
          </div>
        </article>
      </li>
    </ul>
  </section>


</template>

<script>
import axios from "axios";

export default {

  name: 'HomeView',
  components: {
  },
  data() {
    return {
      list: [],
    }
  },
  methods: {
    showPetition(id) {
      this.$router.push({name: 'petition_view', params: {id: id}})
    }
  },
  mounted() {
    axios.get("/petition")
        .then(result => this.list = result.data)
        .catch(e => console.log(e))
  }

}
</script>

<style scoped>
@import '../assets/css/home/poster.css';
@import '../assets/css/home/slider.css';
@import '../assets/css/home/breadcrumb.css';
@import '../assets/css/home/article.css';
</style>