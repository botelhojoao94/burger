<template>
  <div id="burger-table">
    <Message :msg="msg" v-show="msg" />
    <div>
      <div id="burger-table-heading">
        <div class="order-id">#:</div>
        <div>Cliente:</div>
        <div>Pão:</div>
        <div>Carne:</div>
        <div>Opcionais:</div>
        <div>Ações:</div>
      </div>
    </div>
    <div id="burger-table-rows">
      <div class="burger-table-row" v-for="burger in burgers" :key="burger.id">
        <div class="order-number">{{ burger.id }}</div>
        <div>{{ burger.name }}</div>
        <div>{{ burger.bread }}</div>
        <div>{{ burger.meat }}</div>
        <div>
          <ul>
            <li v-for="(optional, index) in burger.optionals" :key="index">
              {{ optional }}
            </li>
          </ul>
        </div>
        <select
          name="status"
          class="status"
          @change="updateBurger($event, burger.id)"
        >
          <option
            v-for="s in status"
            :key="s.id"
            :value="s.type"
            :selected="burger.status == s.type"
          >
            {{ s.type }}
          </option>
        </select>
        <button @click="deleteBurger(burger.id)" class="delete-btn">
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Message from "./Message.vue";

export default {
  name: "Dashboard",
  components: {
    Message,
  },
  data() {
    return {
      burgers: null,
      burger_id: null,
      status: [],
      msg: null,
    };
  },
  methods: {
    async getOrders() {
      const req = await fetch("http://localhost:3000/burgers");

      const data = await req.json();

      this.burgers = data;
    },
    async getStatus() {
      const req = await fetch("http://localhost:3000/status");

      const data = await req.json();

      this.status = data;
    },
    async deleteBurger(id) {
      const req = await fetch(`http://localhost:3000/burgers/${id}`, {
        method: "DELETE",
      });

      const res = await req.json();

      this.msg = `Pedido Removido com sucesso!`;

      setTimeout(() => {
        this.msg = null;
      }, 3000);

      this.getOrders();
    },
    async updateBurger(event, id) {
      const option = event.target.value;

      const dataJson = JSON.stringify({ status: option });

      const req = await fetch(`http://localhost:3000/burgers/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: dataJson,
      });

      const res = await req.json();

      this.msg = `O pedido n ${res.id} foi atualizado para ${res.status}`;

      setTimeout(() => {
        this.msg = null;
      }, 3000);
    },
  },
  mounted() {
    this.getOrders();
    this.getStatus();
  },
};
</script>

<style scoped>
#burger-table {
  max-width: 1200px;
  margin: 0 auto;
}

#burger-table-heading,
#burger-table-rows,
.burger-table-row {
  display: flex;
  flex-wrap: wrap;
}

#burger-table-heading {
  font-weight: bold;
  padding: 12px;
  border-bottom: 3px solid #333;
}

#burger-table-heading div,
.burger-table-row div {
  width: 19%;
}

.burger-table-row {
  width: 100%;
  padding: 12px;
  border-bottom: 1px solid #ccc;
}

#burger-table-heading .order-id,
.burger-table-row .order-number {
  width: 5%;
}

select {
  height: 40px;
  padding: 12px 6px;
  margin-right: 12px;
  cursor: pointer;
}

.delete-btn {
  background-color: #222;
  color: #fcba03;
  font-weight: bold;
  height: 40px;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
}

.delete-btn:hover {
  background-color: transparent;
  color: #222;
}
</style>
