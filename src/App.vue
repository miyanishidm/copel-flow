<template>
  <div>
    <div v-if="loadingCompleted">
      <div class="w-full flex justify-center items-center h-screen">
        <svg role="status" class="w-16 h-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"/>
          <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"/>
        </svg>
      </div>
    </div>
    <div v-else class="w-full flex justify-center items-center h-screen px-6">
      <Sidebar :owners="owners" :products="allProducts" :allIcms="allIcms" :cotacaoPTAX="cotacaoPTAX"
               :destinos="allDestinos" :embalagens="allEmbalagens" :client="client"/>
    </div>
  </div>
</template>


<script>
import Sidebar from "./components/Sidebar.vue";

const feriados = [
  "2022-01-01",
  "2022-02-28",
  "2022-03-01",
  "2022-04-15",
  "2022-04-21",
  "2022-05-01",
  "2022-06-16",
  "2022-09-07",
  "2022-10-12",
  "2022-11-02",
  "2022-11-15",
  "2022-12-25",
  "2023-01-01",
  "2023-02-20",
  "2023-02-21",
  "2023-04-07",
  "2023-04-21",
  "2023-05-01",
  "2023-06-08",
  "2023-09-07",
  "2023-10-12",
  "2023-11-02",
  "2023-11-15",
  "2023-12-25",
  "2024-01-01",
  "2024-02-12",
  "2024-02-13",
  "2024-03-29",
  "2024-04-21",
  "2024-05-01",
  "2024-05-30",
  "2024-09-07",
  "2024-10-12",
  "2024-11-02",
  "2024-11-15",
  "2024-12-25",
  "2025-01-01",
  "2025-03-03",
  "2025-03-04",
  "2025-04-18",
  "2025-04-21",
  "2025-05-01",
  "2025-06-19",
  "2025-09-07",
  "2025-10-12",
  "2025-11-02",
  "2025-11-15",
  "2025-12-25"
];

var clients;

export default {
  created() {
    clients = app.initialized();
    this.get();
  },
  name: "App",
  components: {
    Sidebar,
  },
  data() {
    return {
      client: {},
      metaAllProducts: 0,
      cotacaoPTAX: 0,
      loadingCompleted: true,
      allProducts: [],
      allIcms: [],
      allEmbalagens: [],
      allDestinos: [],
      currentPage: {
        products: 1,
      },
      loading: {
        allProducts: true
      },
      owners: []
    };
  },
  watch: {
    loading: {
      handler() {
        this.loadingCompleted = Object.values(this.loading).reduce((a, b) => a || b);
      },
      deep: true
    }
  },
  methods: {
    async get() {
      app.initialized().then((client) => {
        this.client = client;
        this.getQuotation(client);
        this.getAllProducts(client);
        this.getAllEmbalagens(client);
        this.getAllDestinos(client);
        this.getAllIcms(client);
        this.getVendedores(client);
      });
    },
    async getAllDestinos(client) {
      await this.client.request.invokeTemplate(
          "getAllDestinos",
          {
            context: {
              page: this.currentPage.products,
              api_key: 'Token token=7TZV4nBzcEPnag9n8-PzTg'
            },
            "options": {
              "isOAuth": false
            }
          }).then(
          (data) => {
            data = JSON.parse(data.response);
            this.allDestinos = data.cm_frete;
          },
          (error) => {
            console.error("errorr", error);
          }
      );
    },

    async getAllIcms(client) {
      await this.client.request.invokeTemplate(
          "getAllIcms",
          {
            context: {
              page: this.currentPage.products,
              api_key: 'Token token=7TZV4nBzcEPnag9n8-PzTg'
            },
            "options": {
              "isOAuth": false
            }
          }).then(
          async (data) => {
            data = JSON.parse(data.response);
            this.allIcms = data.cm_imposto
          },
          (error) => {
            console.error("errorr", error);
          }
      );
    },
    async getVendedores(client) {
      await this.client.request.invokeTemplate(
          "getVendedores",
          {
            context: {
              page: this.currentPage.products,
              api_key: 'Token token=7TZV4nBzcEPnag9n8-PzTg'
            },
            "options": {
              "isOAuth": false
            }
          }).then(
          (data) => {
            this.owners = JSON.parse(data.response)
          },
          (error) => {
            console.log('error acquiring vendedores', error);
          }
      )
    },
    async getAllEmbalagens(client) {
      await this.client.request.invokeTemplate(
          "getAllEmbalagens",
          {
            context: {
              page: this.currentPage.products,
              api_key: 'Token token=7TZV4nBzcEPnag9n8-PzTg'
            },
            "options": {
              "isOAuth": false
            }
          }).then(
          (data) => {
            let dataResponse = JSON.parse(data.response)
            this.allEmbalagens = dataResponse.cm_embalagem;
          },
          (error) => {
            console.error("errorr", error);
          }
      ).finally(() =>
          this.allEmbalagens.sort((a, b) => a.name.localeCompare(b.name))
      )
    },

    async getAllProducts(client) {
      await client.request.invokeTemplate(
          "getAllProducts",
          {
            context: {
              page: this.currentPage.products,
              api_key: 'Token token=7TZV4nBzcEPnag9n8-PzTg'
            },
            "options": {
              "isOAuth": false
            }
          }).then(
          (data) => {
            let dataResponse = JSON.parse(data.response)
            const products = dataResponse.products
            products.map((product) => {
              if (product.is_active) {
                product.fullName = `${product.description} ${product.name}`
                this.allProducts.push(product)
              }
            });
            this.metaAllProducts = dataResponse.meta
            this.currentPage.products++;

            if (this.metaAllProducts.total_pages > 1) {
              for (this.currentPage.products; this.currentPage.products <= this.metaAllProducts.total_pages; this.currentPage.products++) {
                this.getAllProducts(client);
                if (this.currentPage.products == this.metaAllProducts.total_pages) {
                  this.loading.allProducts = false;
                }
              }
            } else {
              this.loading.allProducts = false;
            }
          },
          (error) => {
            console.error("errorr", error);
          }
      ).finally(() => {
        this.allProducts.sort((a, b) => a.fullName.localeCompare(b.fullName))
      })
    },
    //   getPreviousDay(date = new Date()) {
    //    const previous = new Date(date.getTime());

    //   if (feriados.includes(previous.toISOString().split('T')[0])) {
    //     const dayNameCheckForWeekends = previous.toLocaleDateString('en-US', { weekday: 'long' })
    //     if (dayNameCheckForWeekends === "Saturday") {
    //       previous.setDate(date.getDate() - 1);
    //    } else if (dayNameCheckForWeekends === "Sunday") {
    //       previous.setDate(date.getDate() - 3);
    //     } else {
    //      previous.setDate(date.getDate() - 1)
    //     }
    //   } else {
    //     previous.setDate(date.getDate() - 1)
    //   }

    //   const dayName = previous.toLocaleDateString('en-US', { weekday: 'long' })
    //   if (dayName === "Sunday") {
    //      previous.setDate(date.getDate() - 3);
    //    }

    //    return previous.toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }).replaceAll('/', '-');
    // },
    
    // async getQuotation(client) {
    //   const previousDay = this.getPreviousDay()
    //   const url =
    //     "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='" +
    //     previousDay +
    //     "'&$format=json";
    //   await client.request.get(url).then(
    //     (data) => {
    //       data = JSON.parse(data.response);
    //       this.cotacaoPTAX = data.value[0].cotacaoVenda;
    //     },
    //     (error) => {
    //       console.error("Error PTAX", error);
    //     }
    //   );
    // },

    async getQuotation(client) {
      let currentDate = new Date();
      let previousDay = new Date(currentDate.getTime());

      let quotation = 0;
      let run = 0;

      while (quotation === 0) {
        previousDay.setDate(previousDay.getDate() - 1);
        const formattedDate = previousDay.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric'
        }).replaceAll('/', '-');
        let query = "'" + formattedDate + "'&$top=100&$format=json";
        try {
          run = run + 1;
          if (run <= 5) {
            const response = await this.client.request.invokeTemplate(
                "cotacaoDolarDia",
                {
                  context: {
                    dataCotacao: formattedDate
                  },
                  "options": {
                    "isOAuth": false
                  }
                }
            );
            const data = JSON.parse(response.response);
            quotation = data.value[0].cotacaoVenda;
          }
        } catch (error) {
          quotation = 5.0077;
          console.error("Error PTAX", error);
        }
      }

      this.cotacaoPTAX = quotation;
    }
  },
};
</script>
<style scoped></style>
