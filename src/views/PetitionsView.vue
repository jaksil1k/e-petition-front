<template>
  <main>
    <section class="poster">
      <h1 class="poster__title">
        Select any petition that
        you’re looking for
      </h1>
    </section>
    <section class="petitions__section">
      <nav class="petitions__nav">

        <a class="petitions__link" href="#">Recommended</a>
        <a class="petitions__link" href="#">Popular</a>
        <a class="petitions__link" href="#">Recent</a>
        <a class="petitions__link" href="#">Succeeded</a>
      </nav>
    </section>
    <section class="breadcrumb">
      <div>
        <ul class="breadcrumb__list">
          <li class="breadcrumb__item" v-for="petition in list">
            <article class="article" @click="showPetition(petition.id)">
              <div class="article__content" >
                <div class="article__info">
                  <div class="article__title">
                    {{petition.title}}
                  </div>
                  <div class="article__description">
                    {{petition.body}}
                  </div>
                </div>
                <img class="article__image" src="@/assets/images/article-image.png" alt=""/>
              </div>
              <div class="article_footer">
                <div class="article__item left">
                  <img class="article__icon" src="@/assets/images/person-icon.png" alt="person_icon"/>
                  <div class="author_info">
                    <p class="bold">Ricardo Milos</p>
                    <p>Madrid, Spain</p>
                  </div>
                </div>
                <div class="article__item right">
                  <p>23.01.2024</p>
                  <img class="article__icon" src="@/assets/images/mail-icon.png" alt="mail icon"/>
                  <p>32,456</p>
                  <img class="article__icon" src="@/assets/images/people-icon.png" alt="people icon"/>
                </div>
              </div>
            </article>
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: 'PetitionView',
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
  async mounted() {
    let result = await axios.get("http://localhost:8081/api/petition");
    console.log(result.data);
    this.list = result.data;
  }
}
</script>

<style scoped>
@import '../assets/css/petitions/poster-petitions.css';
@import '../assets/css/petitions/petitions-nav.css';
@import '../assets/css/petitions/breadcrumb.css';
@import '../assets/css/petitions/article-petitions.css';
</style>