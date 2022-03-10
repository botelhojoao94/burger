<template>
  <div>
    <Message :msg="msg" v-show="msg" />
    <div>
      <form id="burger-form" @submit="createBurger">
        <div class="input-container">
          <label for="name">Nome do cliente:</label>
          <input
            type="text"
            id="name"
            name="name"
            v-model="name"
            placeholder="Digite o seu nome"
          />
        </div>
        <div class="input-container">
          <label for="bread">Escolha o pão:</label>
          <select name="bread" id="bread" v-model="breadSelected">
            <option value="">Selecione seu pão</option>
            <option v-for="bread in breads" :key="bread.id" :value="bread.type">
              {{ bread.type }}
            </option>
          </select>
        </div>
        <div class="input-container">
          <label for="meat">Escolha a carne:</label>
          <select name="meat" id="meat" v-model="meatSelected">
            <option value="">Selecione o type de carne</option>
            <option v-for="meat in meats" :key="meat.id" :value="meat.type">
              {{ meat.type }}
            </option>
          </select>
        </div>
        <div class="input-container" id="optional-container">
          <label id="optional-title" for="optional"
            >Selecione os opcionais:</label
          >
          <div
            id="checkbox-container"
            v-for="optional in optionals"
            :key="optional.id"
          >
            <input
              type="checkbox"
              name="optional"
              v-model="optionalSelected"
              :value="optional.type"
            />
            <span>{{ optional.type }}</span>
          </div>
        </div>
        <div class="input-container">
          <input type="submit" class="submit-btn" value="Solicitar" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Message from "./Message.vue";

export default {
  name: "BurgerForm",
  components: {
    Message,
  },
  data() {
    return {
      name: null,
      breads: null,
      meats: null,
      optionals: null,
      breadSelected: null,
      meatSelected: null,
      optionalSelected: [],
      status: "solicitado",
      msg: null,
    };
  },
  methods: {
    async getIngredients() {
      const req = await fetch("http://localhost:3000/ingredients");
      const data = await req.json();
      this.breads = data.breads;
      this.meats = data.meats;
      this.optionals = data.optionals;
    },

    async createBurger(e) {
      e.preventDefault();

      const data = {
        name: this.name,
        bread: this.breadSelected,
        meat: this.meatSelected,
        optionals: Array.from(this.optionalSelected),
        status: "Solicitado",
      };

      const dataJson = JSON.stringify(data)

      const req = await fetch("http://localhost:3000/burgers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dataJson,
      });

      const res = await req.json();

      this.msg = `Pedido n ${res.id} realizado com sucesso`
      setTimeout(() => {
          this.msg = null
      }, 3000)

      this.name = "";
      this.breadSelected = "";
      this.meatSelected = "";
      this.optionalSelected = "";
    },
  },

  mounted() {
    this.getIngredients();
  },
};

</script>

<style scoped>
#burger-form {
  max-width: 400px;
  margin: 0 auto;
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  margin-bottom: 15px;
  color: #222;
  padding: 5px 10px;
  border-left: 4px solid #fcba03;
}

input,
select {
  padding: 5px 10px;
  width: 300px;
}

#optional-container {
  flex-direction: row;
  flex-wrap: wrap;
}

#optional-title {
  width: 100%;
}

#checkbox-container {
  display: flex;
  align-items: flex-start;
  width: 50%;
  margin-bottom: 20px;
}

#checkbox-container span,
#checkbox-container input {
  width: auto;
}

#checkbox-container span {
  margin-left: 6px;
  font-weight: bold;
}

.submit-btn {
  background-color: #222;
  color: #fcba03;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
}

.submit-btn:hover {
  background-color: transparent;
  color: #222;
}
</style>
