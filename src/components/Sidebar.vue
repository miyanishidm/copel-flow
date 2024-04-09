<template>
  <div id="app" class="App">
    <div v-show="showModal" class="fixed right-1 h-full w-full z-50">
      <div class="flex justify-end">
        <span class="mt-8 rounded-lg bg-zinc-800 p-2 text-white">
          <button @click="showModal = false" type="button" class="
                                    focus:outline-none
                                    bg-red-700
                                    hover:bg-red-800
                                    focus:ring-4 focus:ring-red-300
                                    font-medium
                                    rounded-lg
                                    text-sm
                                    p-2
                                    px-2.5
                                    mr-2
                                    mb-2
                                    dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900
                                  ">
            X
          </button>
          {{ alertMessage }}
        </span>
      </div>
    </div>
    <div class="p-6 w-full h-full bg-zinc-800 text-white rounded-xl">
      <div class="lg:flex justify-center lg:gap-6 bg-gray-800 py-6 rounded-xl w-full">
        <div class="bg-gray-800">
          <div class="px-5 flex justify-center w-full">
            <div class="flex justify-between w-full">
              <p class="text-2xl">Cotação</p>
              <div class="bg-gray-800 text-green-500">
                <div class="flex flex-row gap-4 justify-center mx-4">
                  <div class="">
                    <label for="">IPI</label>
                    <select disabled class="cursor-not-allowed rounded-lg px-2 py-1 bg-zinc-800 appearance-none	">
                      <option :value="ipi">{{ realIpi }}</option>
                    </select>
                  </div>
                  <div class="">
                    <label for="">ICMS</label>
                    <select disabled class="cursor-not-allowed rounded-lg px-2 py-1 bg-zinc-800 appearance-none	">
                      <option :value="icms">{{
                          Number(icms).toLocaleString('pt-br', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })
                        }}
                      </option>
                    </select>
                  </div>

                  <div class="">
                    <label for="">PIS/COFINS</label>
                    <select disabled class="cursor-not-allowed rounded-lg px-2 py-1 bg-zinc-800 appearance-none	">
                      <option :value="cofins">{{
                          cofins.toLocaleString('pt-br', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 3
                          })
                        }}
                      </option>
                    </select>
                  </div>

                  <div class="">
                    <label for="">PTAX</label>
                    <select disabled class="cursor-not-allowed rounded-lg px-2 py-1 bg-zinc-800 appearance-none	">
                      <option :value="cotacaoPTAX">{{
                          cotacaoPTAX.toLocaleString('pt-br', {minimumFractionDigits: 4})
                        }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-3 lg:grid-cols-4 gap-4 p-6">
            <div class="flex flex-col gap-1">
              <div class="flex">
                <div class="flex items-center gap-2">
                  <label>Cliente</label>
                  <svg v-if="loadingContacts" aria-hidden="true"
                       class="mr-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                       viewBox="0 0 100 101"
                       fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 18.9766 18.3858 0.59082 50 0.59082C77.6142 0.59082 100 18.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"/>
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"/>
                  </svg>
                </div>
              </div>
              <div class="">
                <div class="flex ">
                  <input v-on:keyup.enter="getSearchContact()" type="text" v-model="searchedWord"
                         class="rounded-lg py-1 px-1 bg-zinc-800 w-full">
                  <div @click="getSearchContact()"
                       class="bg-zinc-800 rounded-lg -ml-8 flex items-center justify-end px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         class="bi bi-search" viewBox="0 0 16 16">
                      <path
                          d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                  </div>
                </div>
                <div v-if="this.filteredResult.length > 0 && this.searchedWord.length >= 3" class="relative w-full">
                  <div class="absolute z-10 w-full">
                    <div v-for="contact in filteredResult" :value="contact.id" :key="contact.id"
                         class="border-b border-1 bg-white pl-2 text-black hover:bg-blue-400"
                         @click="setSelectedContact(contact)">
                      {{ contact.name }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-1">
              <label for="produto">Produto</label>
              <select class="rounded-lg pr-8 py-1 bg-zinc-800" id="produto" @change="getSelectedProductInfo()"
                      v-model="selectedProduct">
                <option value="1" disabled selected>Selecione</option>
                <option v-for="product in products" :key="product.id" :value="product.id">{{ product.fullName }}
                </option>
              </select>
            </div>

            <div class="flex flex-col gap-1">
              <label for="embalagem">Embalagem (Kg)</label>
              <select class="rounded-lg px-2 py-1 bg-zinc-800 col-span-3" id="embalagem" v-model="embalagem">
                <option value="1" selected disabled>Selecione</option>
                <option v-for="embalagem in embalagens" :key="embalagem.id" :value="embalagem.name">
                  {{ embalagem.name }}
                </option>
              </select>
            </div>

            <div class="flex flex-col gap-1">
              <label for="quantidade">Quantidade (Kg)</label>
              <input required v-model="productQuantityFormated" class="rounded-lg py-1 px-1 bg-zinc-800"/>
            </div>

            <div class="flex flex-col gap-1">
              <label>Contatos</label>
              <select class="rounded-lg py-1 bg-zinc-800" v-model="subContact" :disabled="!subContactsExists">
                <option value="1" selected disabled>Nenhum</option>
                <option v-for="contact in subContacts" :key="contact.id" :value="contact">
                  {{ contact.display_name }}
                </option>
              </select>
            </div>

            <div class="flex flex-col gap-1">
              <label>Tipo de frete</label>
              <select class="rounded-lg py-1 bg-zinc-800" v-model="typeOfFrete">
                <option value="0" disabled selected>Selecione</option>
                <option value="FOB Retira | 133">FOB Retira | 133</option>
                <option value="CIF Despacho | 131">CIF Despacho | 131</option>
                <option value="CIF Redespacho | 132">CIF Redespacho | 132</option>
              </select>
            </div>

            <div class="flex flex-col gap-1 col-span-1">
              <label>Transportadora (FOB / CIF Redespacho)</label>

              <select class="rounded-lg py-1 bg-zinc-800" :disabled="getTypeOfFrete" v-model="transportadora">
                <option v-if="getTypeOfFrete" value="0" disabled selected>Nenhum</option>
                <option v-else v-for="transportadora in this.transportadoraRedespacho" :key="transportadora"
                        :value="transportadora">{{ transportadora }}
                </option>
              </select>
            </div>

            <div class="flex flex-col gap-1">
              <label for="quantidade">Preço de lista (USD/Kg)</label>
              <input type="number" disabled v-model="precoLista" class="rounded-lg py-1 px-1 bg-zinc-800"/>
            </div>

            <div class="flex flex-col gap-1">
              <label for="quantidade">Preço mínimo (USD/Kg)</label>
              <input v-model="precoMinimo" type="number" disabled class="rounded-lg py-1 px-1 bg-zinc-800"/>
            </div>

            <div class="flex flex-col gap-1">
              <label for="quantidade">Qtde p/ desconto (Kg)</label>
              <input v-model="quantidadeDesconto" type="number" disabled class="rounded-lg py-1 px-1 bg-zinc-800"/>
            </div>

            <div class="flex flex-col gap-1">
              <label for="quantidade">Preço c/ desconto (USD/Kg)</label>
              <input v-model="precoComDesconto" type="number" disabled class="rounded-lg py-1 px-1 bg-zinc-800"/>
            </div>

            <div class="flex flex-col gap-1">
              <label for="quantidade"> Preço final da cotação (USD/Kg)</label>
              <input required v-model="precoFinalFormatedInput" class="rounded-lg py-1 px-1 bg-zinc-800"/>
            </div>

            <div class="flex flex-col gap-1">
              <label for="quantidade">Adicional de frete se ≤ 500 Kg (%)</label>
              <input v-model="freteMaior" class="rounded-lg py-1 px-1 bg-zinc-800"/>
            </div>

            <div class="flex flex-col gap-1">
              <label for="quantidade">Preço final com frete (USD/Kg)</label>
              <input disabled v-model="precoFinalComFreteFormated" class="rounded-lg py-1 px-1 bg-zinc-800"/>
            </div>

            <div class="flex flex-col gap-1">
              <label for="quantidade">Data venc. cotação</label>
              <input required maxlength="10" v-model="dataVencimento" class="rounded-lg py-1 px-1 bg-zinc-800"/>
            </div>

            <div class="flex flex-col gap-1 justify-center">
              <label>Vendedor responsável pela cotação</label>
              <select required class="rounded-lg py-1 bg-zinc-800" v-model="vendedor">
                <option value="" disabled selected>Selecione o Vendedor</option>
                <option v-for="owner in owners.users" :key="owner.id" :value="owner"> {{ owner.display_name }}</option>
              </select>
            </div>

            <div class="flex flex-col gap-1 col-span-2 justify-center">
              <label>Observações</label>
              <input v-model="observacoes" class="rounded-lg py-1 px-1 bg-zinc-800"/>
            </div>

            <div class="flex flex-row justify-center item-end rounded-xl pt-4">
              <button @click="cleanInputValues()" class="rounded-xl p-2 bg-red-800 w-full h-fit">Limpar</button>
            </div>

            <div class="flex flex-row justify-center item-end rounded-xl pt-4">
              <button @click="addProduct()" class="rounded-xl p-2 bg-blue-400 w-full h-fit">Adicionar</button>
            </div>
          </div>

        </div>
      </div>

      <div v-if="savedProducts.length">
        <div class="flex flex-col gap-4 bg-gray-800 p-2 w-full">
          <div class="px-2 mx-6 border-b border-gray-400 py-1">
            <p class="text-2xl">Itens da cotação</p>
          </div>

          <!-- Table -->
          <div class="w-full">
            <div class="flex flex-wrap">
              <div class="w-full px-4">
                <div class="max-w-full overflow-x-auto">
                  <table class="table-auto w-full">
                    <thead>
                    <tr class="bg-primary text-center">
                      <th class="
                                                  text-sm
                                                  font-semibold
                                                  text-white
                                                  px-1
                                                ">
                        ITEM
                      </th>
                      <th class="
                                                  text-sm
                                                  font-semibold
                                                  text-white
                                                  px-1
                                                ">
                        PRODUTO
                      </th>
                      <th class="
                                                  text-sm
                                                  font-semibold
                                                  text-white
                                                  px-1
                                                ">
                        EMBALAGEM(KG)
                      </th>
                      <th class="
                                                  text-sm
                                                  font-semibold
                                                  text-white
                                                  px-1
                                                ">
                        PREÇO NET(KG)
                      </th>
                      <th class="
                                                  text-sm
                                                  font-semibold
                                                  text-white
                                                  px-1
                                                ">
                        PIS/COFINS(%)
                      </th>
                      <th class="
                                                  text-sm
                                                  font-semibold
                                                  text-white
                                                  px-1
                                                ">
                        ICMS(%)
                      </th>
                      <th class="
                                                  text-sm
                                                  font-semibold
                                                  text-white
                                                  px-1
                                                ">
                        PREÇO C/ IMP(KG)
                      </th>
                      <th class="
                                                  text-sm
                                                  font-semibold
                                                  text-white
                                                  px-1
                                                ">
                        IPI
                      </th>
                      <th class="
                                                  text-sm
                                                  font-semibold
                                                  text-white
                                                  px-1
                                                ">
                        TIPO DE FRETE
                      </th>
                      <th class="
                                                  text-sm
                                                  font-semibold
                                                  text-white
                                                  px-1
                                                ">
                        QUANTIDADE(KG)
                      </th>
                      <th class="
                                                  text-sm
                                                  font-semibold
                                                  text-white
                                                  px-1
                                                ">
                        V/TOTAL USD
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="produto in savedProducts" :key="produto.id">
                      <td class="
                                                  text-center text-dark
                                                  font-medium
                                                  text-base
                                                  py-2
                                                  border-b border-t border-gray-400
                                                ">
                        {{ produto.id }}
                      </td>
                      <td class="
                                                  text-center text-dark
                                                  font-medium
                                                  text-base
                                                  py-2
                                                  border-b border-t border-gray-400
                                                ">
                        {{ produto.name }}
                      </td>
                      <td class="
                                                  text-center text-dark
                                                  font-medium
                                                  text-base
                                                  py-2
                                                  border-b border-t border-gray-400
                                                ">
                        {{ produto.embalagem }}
                      </td>
                      <td class="
                                                  text-center text-dark
                                                  font-medium
                                                  text-base
                                                  py-2
                                                  border-b border-t border-gray-400
                                                ">
                        {{ produto.precoNet }}
                      </td>
                      <td class="
                                                  text-center text-dark
                                                  font-medium
                                                  text-base
                                                  py-2
                                                  border-b border-t border-gray-400
                                                ">
                        {{ produto.pisAndCofins }}
                      </td>
                      <td class="
                                                  text-center text-dark
                                                  font-medium
                                                  text-base
                                                  py-2
                                                  border-b border-t border-gray-400
                                                ">
                        {{ produto.icms }}
                      </td>
                      <td class="
                                                  text-center text-dark
                                                  font-medium
                                                  text-base
                                                  py-2
                                                  border-b border-t border-gray-400
                                                ">
                        {{ produto.precoComImposto }}
                      </td>
                      <td class="
                                                  text-center text-dark
                                                  font-medium
                                                  text-base
                                                  py-2
                                                  border-b border-t border-gray-400
                                                ">
                        {{ produto.ipi }}
                      </td>
                      <td class="
                                                  text-center text-dark
                                                  font-medium
                                                  text-base
                                                  py-2
                                                  border-b border-t border-gray-400
                                                ">
                        {{ produto.frete }}
                      </td>
                      <td class="
                                                  text-center text-dark
                                                  font-medium
                                                  text-base
                                                  py-2
                                                  border-b border-t border-gray-400
                                                ">
                        {{ produto.quantidade }}
                      </td>
                      <td class="
                                                  text-center text-dark
                                                  font-medium
                                                  text-base
                                                  py-2
                                                  border-b border-t border-gray-400
                                                ">
                        {{ vueNumberFormat(produto.valorTotal, {prefix: '', decimal: ',', thousand: '.'}) }}
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-row gap-4 bg-gray-800 p-2 pb-4 justify-end pr-4 rounded-xl">
          <button @click="deleteLast()" class="rounded-xl p-2 bg-red-800">Eliminar última entrada</button>
          <button @click="generatePdf()" class="rounded-xl p-2 bg-green-400">Salvar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {initializeApp} from "firebase/app"
import {ptBR} from 'vuejs-datepicker/dist/locale'
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDZBxJ8_WELlvSUCq2Pbui7F0ilGlw7iK8",
  authDomain: "pdfsaver-4f860.firebaseapp.com",
  projectId: "pdfsaver-4f860",
  storageBucket: "pdfsaver-4f860.appspot.com",
  messagingSenderId: "457778789933",
  appId: "1:457778789933:web:e4db0589311593b72882a4",
  measurementId: "G-FGCPYLSCGV"
};

export default {
  name: "Sidebar",
  props: {
    client: Object,
    embalagens: Array,
    products: Array,
    destinos: Array,
    allIcms: Array,
    cotacaoPTAX: Number,
    owners: Object
  },
  data() {
    return {
      ptBR: ptBR,
      loadingContacts: false,
      today: new Date(),
      dealURL: "",
      productsIdForDeal: [],
      searchedWord: '',
      selectedProduct: null,
      precoFinal: null,
      precoFinalFormated: null,
      precoLista: null,
      currentProduct: null,
      transportadora: " ",
      freteMaior: 0,
      observacoes: '',
      dataVencimento: null,
      condicaoPagamento: null,
      currentContact: {
        name: ''
      },
      precoMinimo: null,
      subContacts: [],
      subContact: null,
      quantidadeDesconto: null,
      precoComDesconto: null,
      selectedContact: null,
      embalagem: null,
      selectedFrete: null,
      typeOfFrete: null,
      filteredResult: [],
      selectedNet: null,
      selectedDestino: 0,
      numberOfSavedProducts: 0,
      productQuantity: 0,
      pis: 6.4,
      ipi: 0,
      icms: 0,
      currentDeal: null,
      cofins: 9.25,
      icmsProduct: {},
      savedProducts: [],
      allListaPreco: [],
      metaAllListPreco: [],
      matchedFields: [],
      valorTotal: 0,
      showModal: false,
      alertMessage: "",
      currentPage: {
        listaPreco: 1
      },
      blobFile: null,
      downloadPdfUrl: null,
      vendedor: null,
      realIpi: 0
    }
  },
  watch: {
    searchedWord(newWord) {
      if (newWord === "") {
        this.filteredResult = []
      }
    },
    precoFinalFormated() {
      this.precoFinal = this.vueNumberFormat(this.precoFinalFormated, {
        prefix: '',
        decimal: '.',
        thousand: '',
        precision: '6'
      })
    },
    currentProduct() {
      if (this.currentProduct && this.currentContact.name && this.embalagem) {
        this.cleanSettedValues()
        this.setValuesForCurrentProduct()
      }
    },
    currentContact() {
      if (this.currentProduct && this.currentContact.name && this.embalagem) {
        this.cleanSettedValues()
        this.setValuesForCurrentProduct()
      }
    },
    embalagem() {
      if (this.currentProduct && this.currentContact.name && this.embalagem) {
        this.cleanSettedValues()
        this.setValuesForCurrentProduct()
      }
    },
    dataVencimento(newDataVencimento, oldVencimento) {
      const inputedVencimento = newDataVencimento.toString()
      const inputedOldVencimento = oldVencimento ? oldVencimento.toString() : null
      if (inputedVencimento.length == 2 && inputedVencimento.length > inputedOldVencimento.length) {
        this.dataVencimento = newDataVencimento + "/"
      }
      if (inputedVencimento.length == 5 && inputedVencimento.length > inputedOldVencimento.length) {
        this.dataVencimento = newDataVencimento + "/"
      }
    }
  },
  computed: {
    dataDeVencimentoPdf() {
      return this.dataVencimento ? `Data de vencimento: ${this.dataVencimento}` : 'Data de vencimento: Não informado'
    },
    subContactsExists() {
      return this.subContacts.length > 0 ? true : false
    },
    getTypeOfFrete() {
      if (this.typeOfFrete === 'CIF Despacho | 131') { // IF onde bloqueamos ou desbloqueamos as Options no select de Transportadora
        return true
      }
      this.transportadora = "0"
      console.log("TRANSPORTADORA AQUI", this.transportadora)
      return false
    },
    precoFinalFormatedInput: {
      get() {
        return this.precoFinalFormated
      },
      set(newValue) {
        newValue = this.vueNumberFormat(newValue, {
          prefix: '',
          decimal: ',',
          thousand: '.',
          isInteger: true,
          precision: 6
        })
        this.precoFinalFormated = newValue
      }
    },
    cotacaoPDFIdRandom() {
        const now = new Date();
        const year = now.getFullYear().toString().substr(-2);
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const id = `${year}${month}${day}${hours}${minutes}${seconds}`;
        return parseInt(id);
      },

      reloadPage() {
      window.location.reload();
    },
    typeFretePdf() {
      const address = `${this.currentContact.custom_field.cf_Logradouro} ${this.currentProduct.zipcode ? this.currentProduct.zipcode : ' '}`
      if (this.typeOfFrete === "FOB Retira | 133") {
        this.transportadora === "0" ? this.transportadora = this.currentContact.custom_field.cf_transportadora_nao_cadastrada : this.transportadora
        return this.transportadoraRedespacho ? "Local de retirada (INTERCROMA): Rua Conde D'Eu, n° 800 - SBS/SC - CEP 89.286-691 | " + this.transportadora : this.currentContact.custom_field.cf_transportadora_nao_cadastrada
      }

      if (this.typeOfFrete === "CIF Despacho | 131") {
        return address ? 'Local de entrega (Cliente): ' + this.currentContact.custom_field.cf_endereco_cobranca + ' | ' + this.currentContact.custom_field.cf_cepfaturamento + ' | ' + this.currentContact.custom_field.cf_cidade_faturamento + ' | ' + this.currentContact.state : 'Nenhum endereço de entrega'
      }

      if (this.typeOfFrete === "CIF Redespacho | 132") {
        this.transportadora === "0" ? this.transportadora = this.currentContact.custom_field.cf_transportadora_nao_cadastrada : this.transportadora
        return this.transportadoraRedespacho ? "Local de entrega (transportadora redespacho): " + this.transportadora : this.currentContact.custom_field.cf_transportadora_nao_cadastrada
      }
    },
    productQuantityFormated: {
      get() {
        return this.productQuantity
      },
      set(newValue) {
        newValue = this.vueNumberFormat(newValue, {prefix: '', decimal: ',', thousand: '.', isInteger: true})
        this.productQuantity = newValue
      }
    },
    precoFinalComFrete() {
      const freteMaior = this.freteMaior ? this.freteMaior : 0
      const porcent = (Number(this.precoFinal) * (Number((freteMaior) / 100)))
      console.log('porcent ' + porcent)
      console.log('vueNumberFormat ' + Number((Number(this.precoFinal)) + Number(porcent)).toFixed(6).toLocaleString('pt-br', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }))
      return Number((Number(this.precoFinal)) + Number(porcent)).toFixed(6).toLocaleString('pt-br', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    },
    precoFinalComFreteFormated() {
      if (!this.precoFinalComFrete) {
        return 0
      }
      return this.vueNumberFormat(this.precoFinalComFrete, {
        prefix: '',
        decimal: ',',
        thousand: '.',
        isInteger: true,
        precision: 6
      })
    },
    precoFinalComFreteIpiFormated() {
      if (!this.precoFinalComFrete) {
        return 0
      }
      return ((Number(this.precoFinalComFrete)).toFixed(2)).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    },
    // soma do valor total
    precoTotalPDFFormated() {
      const ipiProduct = this.ipi ? this.ipi : 0
      const total = ((Number(this.precoFinalComFrete) + ((ipiProduct / 100) * Number(this.precoFinalComFrete)))) * this.vueNumberFormat(this.productQuantity, { prefix: '', decimal: ',', thousand: '', isInteger: true, precision: 0 } )
      return this.vueNumberFormat(total, { prefix: '', decimal: ',', thousand: '.', precision: 0 } )
    },
    precoUnitForDealCreation() {
      const total = (Number(this.precoFinalComFrete)).toFixed(2)
      return total
    },
    precoTotalAllPDFFormated() {
      const valorInicial = 0
      const total = this.savedProducts.reduce((total, num) => total + Number(this.vueNumberFormat(num.valorTotal, { prefix: '', decimal: '.', thousand: '' })), valorInicial)
      return total
    },
    precoTotalRSPDFFormated() {
      return (this.precoTotalAllPDFFormated * this.cotacaoPTAX)
    },

    transportadoraRedespacho() {
      if (!this.currentContact.name) {
        return null;
      }

      let transportadoraOptions;

      if (this.currentContact.custom_field.cf_transportadora_de_redespacho__new) {
        transportadoraOptions = this.currentContact.custom_field.cf_transportadora_de_redespacho__new.split(";");
      } else if (this.currentContact.custom_field.cf_transportadora_nao_cadastrada != null) {
        transportadoraOptions = this.currentContact.custom_field.cf_transportadora_nao_cadastrada.split(";");
      }

      return transportadoraOptions;
    },
    transportadoraDespacho() {
      if (!this.currentContact.name) {
        return null
      }
      // AS CHAVES ESTÃO TROCADAS DE ACORDO COM A FRESH
      return this.currentContact.custom_field.cf_transportadora_de_redespacho
    },
    multipleIcms() {
      if (this.icms > 0) {
        if (this.icms == 4) {
          return (this.precoFinalComFrete * 0.8712).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        }

        if (this.icms == 7) {
          return (this.precoFinalComFrete * 0.8440).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        }

        if (this.icms == 10) {
          return (this.precoFinalComFrete * 0.8168).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        }

        if (this.icms == 12) {
          return (this.precoFinalComFrete * 0.7986).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        }
      }

      return 0
    }
  },
  methods: {
    async uploadFirebaseStoragePDF() {
      const filename = String(this.cotacaoPDFIdRandom)
      const app = initializeApp(firebaseConfig)
      const storage = getStorage()
      const storageRef = ref(storage, filename)

      await uploadBytes(storageRef, this.blobFile).then((snapshot) => {
        console.log('Upload success')
      })

      await getDownloadURL(storageRef).then((downloadURL) => {
        this.downloadPdfUrl = downloadURL
      })
    },
    async saveFirebasePdfOnFresh() {
      if (!this.currentDeal) {
        return
      }

      await this.client.request.invokeTemplate(
          "saveFirebasePdfOnFresh",
          {
            context: {
              api_key: 'Token token=7TZV4nBzcEPnag9n8-PzTg'
            },
            "options": {
              "isOAuth": false
            },
        body: JSON.stringify({
          url: this.downloadPdfUrl,
          targetable_id: this.currentDeal.id,
          targetable_type: "Deal",
          name: this.currentDeal.name,
          is_shared: true
        })
      }).then(
          (data) => {
            console.log(data)
          },
          (error) => {
            console.error("error", error)
          }
      );
    },
    async getSelectedProductInfo() {
      await this.client.request.invokeTemplate(
          "getSelectedProductInfo",
          {
            context: {
              url: `/crm/sales/api/cpq/products/${this.selectedProduct}?include=product_pricings`,
              api_key: 'Token token=7TZV4nBzcEPnag9n8-PzTg'
            },
            "options": {
              "isOAuth": false
            }
          }).then(
          (data) => {
            data = JSON.parse(data.response)
            this.precoMin = data.product.base_currency_amount;
            this.currentProduct = data.product
            this.ipi = this.currentProduct.custom_field.cf_ipi ? this.vueNumberFormat(this.currentProduct.custom_field.cf_ipi, {
              prefix: '',
              decimal: '.',
              thousand: ',',
              isInteger: true,
              precision: 2
            }) : 0;
            this.realIpi = this.currentProduct.custom_field.cf_ipi ? this.vueNumberFormat(this.currentProduct.custom_field.cf_ipi, {
              prefix: '',
              decimal: ',',
              thousand: '.',
              isInteger: true,
              precision: 2
            }) : 0;
          },
          (error) => {
            console.error("error on SelectedProductInfo", error)
          }
      );
    },
    async createPipelineDeal() {
      const deal_pipeline_id = 17000062290 // Id vindo da fresh, valor para pipeline de cotacao
      const deal_stage_id = 17000436629 // Id vindo da fresh, valor para pipeline de cotacao]
      const deal_payment_status_id = 17000039587
      console.log(this.currentContact)
      await this.client.request.invokeTemplate(
          "createPipelineDeal",
          {
            context: {
              api_key: 'Token token=7TZV4nBzcEPnag9n8-PzTg'
            },
            "options": {
              "isOAuth": false
            },
        body: JSON.stringify({
          deal: {
            name: this.cotacaoPDFIdRandom,
            products: this.productsIdForDeal,
            custom_field: {
              cf_centro_de_custo: this.currentContact.custom_field.cf_centro_de_custo ? this.currentContact.custom_field.cf_centro_de_custo : null,
              cf_transportadora: this.transportadora ? this.transportadora : null, // Tem que enviar exatamente a mesma string da opção no front da fresh na criação do deal
              cf_razao_social_redespacho: this.transportadora ? this.transportadora : this.currentContact.custom_field.cf_transportadora_nao_cadastrada,
              cf_cnpj_redespacho: (() => {
                if (this.typeOfFrete.includes('132')) {
                  const splitResult = this.transportadora.split(/(?<=\| )(.*)/);
                  if (splitResult.length > 1) {
                    return splitResult[1];
                  }
                }
                return '-';
              })(),
              cf_cnpj_transportadora: (() => {
                if (this.typeOfFrete.includes('133')) {
                  const splitResult = this.transportadora.split(/(?<=\| )(.*)/);
                  if (splitResult.length > 1) {
                    return splitResult[1];
                  }
                }
                return '-';
              })(),
              cf_unidade_de_negocio: this.currentContact.custom_field.cf_unidade_de_negocio_f ? this.currentContact.custom_field.cf_unidade_de_negocio_f : null,
              cf_frete_escolhido: this.typeOfFrete ? this.typeOfFrete : null,
              cf_deseja_realmente_mudar_a_deal_para_aguardando_aprovao_do_cliente: "Não",
              cf_id_erp: this.currentContact.custom_field.cf_id_erp ? this.currentContact.custom_field.cf_id_erp : null,
              cf_regras_do_cliente_para_recebimentos_de_mercadoria: this.currentContact.custom_field.cf_regras_do_cliente_para_recebimentos_de_mercadoria ? this.currentContact.custom_field.cf_regras_do_cliente_para_recebimentos_de_mercadoria : null,
              cf_forma_de_pagamento: this.currentContact.custom_field.cf_formas_de_pagamento ? this.currentContact.custom_field.cf_formas_de_pagamento : null,
              cf_prazo_de_pagamento_string: this.currentContact.custom_field.cf_prazo_de_pagamento ? this.currentContact.custom_field.cf_prazo_de_pagamento : null,
              cf_territorio_string: this.currentContact.state ? this.currentContact.state : null,
              cf_link: this.downloadPdfUrl ? this.downloadPdfUrl : null,
              cf_cnpj_de_entrega: this.currentContact.custom_field.cf_cnpj_entrega,
              cf_cliente_possui_empilhadeira: this.currentContact.custom_field.cf_cliente_possui_empilhadeira_ ? this.currentContact.custom_field.cf_cliente_possui_empilhadeira_ : null,
              cf_menssagem_interna_e_obs: this.observacoes ? this.observacoes : null,
              cf_produto_1_nome: this.savedProducts[0] ? this.savedProducts[0].name : null,
              cf_produto_2_nome: this.savedProducts[1] ? this.savedProducts[1].name : null,
              cf_produto_3_nome: this.savedProducts[2] ? this.savedProducts[2].name : null,
              cf_produto_4_nome: this.savedProducts[3] ? this.savedProducts[3].name : null,
              cf_produto_5_nome: this.savedProducts[4] ? this.savedProducts[4].name : null,
              cf_pintura: this.savedProducts[0] ? this.savedProducts[0].embalagem : null,
              cf_embalagem_pintura_produto_2: this.savedProducts[1] ? this.savedProducts[1].embalagem : null,
              cf_embalagem_pintura_produto_3: this.savedProducts[2] ? this.savedProducts[2].embalagem : null,
              cf_embalagem_pintura_produto_4: this.savedProducts[3] ? this.savedProducts[3].embalagem : null,
              cf_embalagem_pintura_produto_5: this.savedProducts[4] ? this.savedProducts[4].embalagem : null,
            },
            deal_payment_status_id,
            contact_ids: [this.subContact.id],
            owner_id: this.vendedor.id,
            sales_account_id: this.currentContact.id,
            deal_pipeline_id,
            deal_stage_id
          }
        })
      })
          .then(
              (data) => {
                data = JSON.parse(data.response);
                this.currentDeal = data.deal

            if (this.precoFinalComFrete < Number(this.precoMinimo)) {
              this.createTask()
            }
          },
          (error) => {
            console.error("error creating deal", error)
            this.showModal = true
            this.alertMessage = "Não foi possível criar uma oportunidade com o(s) produto(s) escolhido(s), por favor verifique o(s) produto(s) no módulo de negociação"
          }
        )
        window.location.reload();
    },
    async createTask() {
      const title = "Aprovação de Preço"
      const description = `Aprovação de Preço https://intercroma.myfreshworks.com/crm/sales/deals/${this.currentDeal.id}?tab=recent-activities.tasks`
      const due_date = new Date(new Date().setHours(18))
      const owner_id = 17000025996
      const task_type_id = 17000215474
      const targetable_id = this.currentDeal.id
      const targetable_type = "Deal"
      const status = 0

      await this.client.request.invokeTemplate(
          "createTask",
          {
            context: {
              api_key: 'Token token=7TZV4nBzcEPnag9n8-PzTg'
            },
            "options": {
              "isOAuth": false
            },
        body: JSON.stringify({
          title,
          description,
          due_date,
          owner_id,
          task_type_id,
          targetable_id,
          targetable_type,
          status
        })
      }).then(
          (data) => {
          },
          (error) => {
            console.error(error)
          }
      )
    },
    async getSearchContact() {
      this.loadingContacts = true
      const searchedWord = this.searchedWord.toLowerCase().replace(" ", "+")
      if (searchedWord) {
        await this.client.request.invokeTemplate(
            "getSearchContact",
            {
              context: {
                searchedWord: searchedWord,
                api_key: 'Token token=7TZV4nBzcEPnag9n8-PzTg'
              },
              "options": {}
            }).then(
            (data) => {
              data = JSON.parse(data.response)
              this.filteredResult = data
              this.loadingContacts = false
            },
            (error) => {
              console.error("error on search word requisition", error);
            }
        );
      }
    },
    // checkForSelectedTransportadora {
    //   if (this.typeOfFrete === 'CIF Redespacho' && (!this.transportadora || this.transportadora == "0")) {
    //     this.showModal = true
    //     this.alertMessage = "Por favor selecione uma trasportadora."
    //     return false
    //   }
    //   return true
    // },

    addProduct() {
      const requiredFields = ['embalagem','productQuantityFormated', 'subContact', 'typeOfFrete', 'precoFinalFormatedInput', 'dataVencimento', 'vendedor'];

      if (this.typeOfFrete !== 'CIF Despacho | 131') {
        requiredFields.push('transportadora');
      }
      const missingField = requiredFields.find(field => {
        const value = this[field];
        return value === null || value === undefined || String(value).trim() === '' || value === 0;
      });




  if (missingField) {
    const fieldLabel = this.getFieldLabel(missingField);
    this.showModal = true;
    this.alertMessage = `O campo '${fieldLabel}' é obrigatório.`;
    return;
  } else if (this.precoFinalFormatedInput === 0 || this.precoFinalFormatedInput === '0.000000') {
    this.showModal = true;
    this.alertMessage = `O campo 'Preço Final de Cotação' não pode ser igual a zero.`;
    return;
  } else if ((this.typeOfFrete === "FOB Retira | 133" || this.typeOfFrete === "CIF Redespacho | 132") && this.transportadora === "0") {
    const fieldLabel = this.getFieldLabel('transportadora');
    this.showModal = true;
    this.alertMessage = `O campo '${fieldLabel}' é obrigatório para o tipo de frete selecionado.`;
    return;
  } else {

    const newProduct = {
          id: this.savedProducts.length + 1, name: `${this.currentProduct.description} (${this.currentProduct.name})`, embalagem: this.embalagem, precoNet: this.multipleIcms, pisAndCofins: '9,25', icms: this.icms ? this.icms : 0, precoComImposto: this.vueNumberFormat(this.precoFinalComFreteIpiFormated, { prefix: '', decimal: ',', thousand: '.', }), ipi: this.ipi, frete: this.typeOfFrete, quantidade: this.productQuantityFormated, valorTotal: this.precoTotalPDFFormated
        };
        const productIdDealCreation = {
          id: this.currentProduct.id, unit_price: this.precoUnitForDealCreation, quantity: this.vueNumberFormat(this.productQuantity, { prefix: '', decimal: ',', thousand: '' }), discount: 0
        };

        this.savedProducts.push(newProduct);
        this.productsIdForDeal.push(productIdDealCreation);
        console.log(newProduct);
      }
    },

getFieldLabel(fieldName) {
  const fieldLabels = {
    embalagem: 'Embalagem',
    productQuantityFormated: 'Quantidade',
    subContact: 'Contato',
    typeOfFrete: 'Tipo de Frete',
    precoFinalFormatedInput: 'Preço Final de Cotação',
    dataVencimento: 'Data Vencimento',
    vendedor: 'Vendedor',
    transportadora: 'Transportadora'
  };

      return fieldLabels[fieldName] || '';
    },

    deleteLast() {
      this.savedProducts.pop()
      this.productsIdForDeal.pop()
    },
    setSelectedContact(contact) {
      this.getSelectedContact(contact)
      this.filteredResult = []
      this.searchedWord = contact.name
      this.getListaPrecoCurrentProduct()
    },
    async getSelectedContact(contact) {
      await this.client.request.invokeTemplate(
          "getSelectedContact",
          {
            context: {
              url: `/crm/sales/api/sales_accounts/${contact.id}`,
              api_key: 'Token token=7TZV4nBzcEPnag9n8-PzTg'
            },
            "options": {
              "isOAuth": false
            }
          }).then(
          async (data) => {
            data = JSON.parse(data.response)
            this.subContacts = []
            this.subContact = ''
            this.currentContact = data.sales_account
            console.log("Dados do contato" + this.currentContact)
            await this.getSelectedSubContact(contact)
            this.condicaoPagamento = this.currentContact.custom_field.cf_prazo_de_pagamento ? this.currentContact.custom_field.cf_prazo_de_pagamento : 'Prazo não definido'
          },
          (error) => {
            console.error("errorr getting contact info", error);
          }
      );
    },

    async getSelectedSubContact(contact) {
      await this.client.request.invokeTemplate(
          "getSelectedSubContact",
          {
            context: {
              url: `/crm/sales/sales_accounts/${contact.id}/lookup_sections/ContactForm/contacts?default_lookup=true&page=1&per_page=25&sort=created_at&sort_type=desc&include=owner,sales_accounts,creater,source,updater,campaign,contact_status,lead_score_information,territory,emails,lookup_information,lists,lifecycle_stage,lost_reason`,
              api_key: 'Token token=7TZV4nBzcEPnag9n8-PzTg'
            },
            "options": {
              "isOAuth": false
            }
          }).then(
          async (data) => {
            data = JSON.parse(data.response)
            this.subContacts = data.data
            console.log(this.subContacts)
          },
          (error) => {
            console.error("errorr getting contact info", error);
          }
      )
    },
    async getListaPrecoCurrentProduct() {
      await this.client.request.invokeTemplate(
          "getListaPrecoCurrentProduct",
          {
            context: {
              currentPage_listaPreco: this.currentPage.listaPreco,
              api_key: 'Token token=7TZV4nBzcEPnag9n8-PzTg'
            },
            "options": {
              "isOAuth": false
            }
          }).then(
          async (data) => {
            console.log("LIMITE API",data.response)
            data = JSON.parse(data.response);
            let listaDePreco = data.cm_tabela_de_preos
            while (this.currentPage.listaPreco < data.meta.total_pages){
              this.currentPage.listaPreco = this.currentPage.listaPreco + 1
              await this.client.request.invokeTemplate(
                  "getListaPrecoCurrentProduct",
                  {
                    context: {
                      currentPage_listaPreco: this.currentPage.listaPreco,
                      api_key: 'Token token=7TZV4nBzcEPnag9n8-PzTg'
                    },
                    "options": {
                      "isOAuth": false
                    }
                  }).then(
                  async (data) => {
                    data = JSON.parse(data.response);
                    listaDePreco.push.apply(listaDePreco, data.cm_tabela_de_preos)
                  }
              );
            }

            this.allListaPreco = []
            listaDePreco.map((product) => { this.allListaPreco.push(product) });
            this.metaAllListPreco = data.meta;

            if (this.metaAllListPreco.total_pages > 1) {
              for (this.currentPage.listaPreco; this.currentPage.listaPreco < this.metaAllListPreco.total_pages;) {
                this.currentPage.listaPreco++
                await this.getListaPrecoCurrentProduct();
              }
            }
          },
          (error) => {
            console.error("errorr", error);
          }
      );
    },
    setValuesForCurrentProduct() {
      const checkProductInListaPreco = this.allListaPreco.filter(product => this.currentProduct.name === product.name && this.embalagem === product.custom_field.cf_embalagem)
      console.log("PRODUTO AQUI =>",checkProductInListaPreco)
      if (!checkProductInListaPreco.length) {
        this.showModal = true
        this.alertMessage = "Não existe registro para esse Produto/Embalagem na Lista de Preços."
      }


      this.allListaPreco.map(product => {
        if (this.currentProduct.name === product.name && this.embalagem === product.custom_field.cf_embalagem) {
          this.setIcmsForCurrentProduct()
          this.embalagem = product.custom_field.cf_embalagem
          this.quantidadeDesconto = product.custom_field.cf_qtde_para_desconto

          this.matchedFields = Object.keys(product.custom_field).filter(field => {
            if (field.includes('cf_preco_')) {
              if (this.currentContact.state.toLowerCase() === "sc") {
                return field.toLowerCase().includes('_sc');
              } else if (["mg", "pr", "rj", "rs", "sp"].includes(this.currentContact.state.toLowerCase())) {
                return field.toLowerCase().includes('mg_pr_rj_rs_sp');
              } else {
                return field.toLowerCase().includes('outras_uf');
              }
            }
          })

          if (this.matchedFields.length === 0) {
            this.matchedFields = Object.keys(product.custom_field).filter(field => {
              if (field.includes('cf_preco_')) {
                return field.includes('outras')
              }
            })
          }
          console.log(product.custom_field + "product.custom_field")
          this.matchedFields.map(element => {
            if (element.includes('cf_preco_lista')) {
              this.precoLista = product.custom_field[element]
              console.log(this.precoLista + "ListaIF")
            }

            if (element.includes('cf_preco_minimo')) {
              this.precoMinimo = product.custom_field[element]
              console.log(this.precoMinimo + "minimoIF")
            }

            if (element.includes('cf_preco_com_desconto')) {
              this.precoComDesconto = product.custom_field[element]
              console.log(this.precoComDesconto + "ComDescontoIF")
            }
          })

          if (!this.precoLista || !this.precoMinimo || !this.precoComDesconto) {
            this.showModal = true
            this.alertMessage = "Não existe entrada referente ao Estado do contato selecionado na Lista de preços"
          }
        }
      })
    },

    setIcmsForCurrentProduct() {
      const idClassIcms = this.allIcms.filter(icms => icms.custom_field.cf_id_poltica_icms == this.currentProduct.custom_field.cf_politica_de_icms_aplicavel)
      idClassIcms.map(icms => {
        this.matchedFields = Object.keys(icms.custom_field).filter(field => {
          if (field.includes('cf_icms_n')) {
            if (this.currentContact.state.toLowerCase() != "sc") {
              return field.toLowerCase().includes(this.currentContact.state.toLowerCase())
            } else {
              return field.toLowerCase().includes('_sc')
            }
          }
        })

        if (this.matchedFields.length === 0) {
          this.matchedFields = Object.keys(icms.custom_field).filter(field => {
            if (field.includes('cf_icms_n')) {
              return field.includes('outras')
            }
          })
        }

        this.matchedFields.map(element => {
          if (element.includes('cf_icms_n')) {
            this.icms = icms.custom_field[element]
            console.log("IDCMSAQUI",element)
            console.log("IDCMSAQUI",this.icms)
          }
        })
      })
    },
    cleanInputValues() {
      this.precoFinal = 0
      this.precoFinalFormated = 0
      this.productQuantity = 0
      this.typeOfFrete = 0
      this.transportadora = null
      this.cleanSettedValues()
      this.selectedProduct = 1
      this.embalagem = null
      this.freteMaior = ""

    },
    cleanSettedValues() {
      this.icms = null
      this.quantidadeDesconto = null
      this.precoLista = null
      this.precoMinimo = null
      this.precoComDesconto = null
    },
    async generatePdf() {
      // if (!this.checkForSelectedTransportadora()) {
      //   return
      // }

      const productPdfArr = this.savedProducts
      var productsArray = productPdfArr.map((product) => {
        product.valorTotal = this.vueNumberFormat(product.valorTotal, {prefix: '', decimal: ',', thousand: '.'})

        return Object.values(product)
      })

      const propsObject = {
        outputType: "blob",
        returnJsPDFDocObject: true,
        orientationLandscape: true,
        compress: true,
        logo: {
          src: "icon.png",
          width: 60.32,
          height: 26.66,
          margin: {
            top: 0,
            left: 0,
          },
        },
        business: {
          name: "Intercroma S/A",
          address:
              "Rua Conde D'Eu, nº 800 - São Bento do Sul(SC) CEP 89.286-691",
          phone: "+55 41 3156-8500",
          email: "CNPJ: 00.557.713/0001-50 / Inscrição estadual: 253.046.173",
          email_1: "atendimento@intercroma.com",
          website: "www.intercroma.com",
          style: {
            marginTop: 20
          },
        },
        contact: {
          name: this.currentContact.name,
          address: `CNPJ: ${this.currentContact.custom_field.cf_cnpj}`,
          phone: !this.subContact ? '' : this.subContact.display_name,
          email: !this.subContact ? '' : this.subContact.email,
          otherInfo: this.typeFretePdf,
          style: {
            fontSize: 20
          }
        },
        invoice: {
          label: "Cotação #: ",
          num: this.cotacaoPDFIdRandom,
          invDate: "Moeda: USD",
          invGenDate: `Taxa da moeda: R$ ${this.cotacaoPTAX.toLocaleString('pt-br', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}`,
          headerBorder: true,
          tableBodyBorder: true,
          header: [
            {
              title: "ITEM",
              style: {
                width: 12,
              },
            },
            {
              title: "PRODUTO",
              style: {
                width: 20,
              },
            },
            {
              title: "EMBALAGEM",
              style: {
                width: 24,
              },
            },
            {
              title: "PREÇO NET(USD/KG)",
              style: {
                width: 40,
              },
            },
            {
              title: "PIS/COFINS(%)",
              style: {
                width: 27,
              },
            },
            {
              title: "ICMS (%)",
              style: {
                width: 17,
              },
            },
            {
              title: "PREÇO C/ IMP(USD/KG)",
              style: {
                width: 43,
              },
            },
            {
              title: "IPI (%)",
              style: {
                width: 13,
              },
            },
            {
              title: "TIPO DE FRETE",
              style: {
                width: 29,
              },
            },
            {
              title: "QUANTIDADE(KG)",
              style: {
                width: 32
              }
            },
            {
              title: "V/TOTAL/(USD)",
              style: {
                width: 27
              }
            },
          ],
          table: productsArray,
          invTotalLabel: "Total (com impostos e IPI) - USD:",
          invTotal: this.precoTotalAllPDFFormated.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
          row1: {
            col1: "Total NF (com impostos e IPI) - R$:",
            col2: this.precoTotalRSPDFFormated.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            style: {
              fontSize: 10,
            },
          },
          invDescLabel: "Considerações:",
          invDesc: `- Cotações em moedas estrangeiras serão convertidas pelo PTAX BCB do dia anterior ao faturamento.      - Disponibilidade sujeita a confirmação no ato do pedido.                                                                              - Preço(s) com impostos não estão incluídos IPI e ST.                                                                   ${this.observacoes ? "Observações:" : ""} ${this.observacoes}`,
        },
        footer: {
          text: "Intercroma S/A - 00.557.713/0001-50 - Todos os direitos reservados",
        },
        pageEnable: true,
        pageLabel: "Página ",
      };

      var cabecalhoTermo = "Termos Gerais de Cotação e Venda INTERCROMA:";
      var textoTermo =
          "\n\n• A Cotação é válida apenas pelo prazo de “Validade” indicado." +
          "\n\n• As condições comerciais estão sujeitas à confirmação quando do recebimento do pedido de compra do Cliente." +
          "\n\n• O Cliente é o único responsável por verificar se a especificação técnica dos produtos atende às suas necessidades produtivas e checar as condições de qualidade e especificação antes de seu uso em produção." +
          "\n\n• Aprovando esta cotação e pedido o Cliente valida que as respectivas especificações técnicas apresentadas atendem sua necessidade." +
          "\n\n• Em caso de importação, fabricação e/ou especificação técnica customizada para atendimento exclusivo do Cliente, este ficará obrigado a pagar pela integralidade do volume de produto dedicado, não sendo possível negociar o cancelamento do pedido." +
          "\n\n• Eventual solicitação de cancelamento do pedido por parte do cliente (de “produtos de linha”), será avaliada caso a caso pelo time INTERCROMA para aceite ou não." +
          "\n\n• Pelo caráter de distribuição, a única garantia dada é a de que os produtos serão entregues conforme as especificações técnicas indicadas pelo fabricante e/ou acordadas com a INTERCROMA. Nenhuma outra garantia (de performance, de comerciabilidade, de não infração, de adequação a uma finalidade específica, etc.) é concedida." +
          "\n\n• O Cliente deve conferir os produtos no momento da entrega e levantar qualquer reclamação imediatamente, sob pena de preclusão. E, em caso de recusa da entrega/nota fiscal, o Cliente deverá comunicar imediatamente seu contato comercial." +
          "\n\n• A INTERCROMA poderá, a seu critério exclusivo, substituir o produto, conceder crédito ao cliente no valor do preço pago ou devolver o valor nos casos em que o produto não atenda a especificação técnica acordada; porém toda e qualquer decisão tomada relativa a questões técnicas e de qualidade só serão deliberadas após investigação realizada pela INTERCROMA com apoio do fabricante do produto." +
          "\n\n• A propriedade, responsabilidade e o risco do produto (manuseio, uso, armazenamento, etc.) passarão ao Cliente no momento da entrega no local indicado e acordado entre as Partes, seja direto no depósito do Cliente ou na transportadora de redespacho indicada." +
          "\n\n• Nos casos de transporte redespacho o Cliente valida que os produtos aqui adquiridos sejam entregues e depositados na transportadora de redespacho indicada ao longo dessa cotação. Responsabilizando-se pela comunicação com o terceiro e isentando a INTERCROMA de qualquer custo relacionado a alterações a posteriori de local de entrega." +
          "\n\n• Caso o transporte seja responsabilidade do Cliente, também o será por qualquer fato daí decorrente, como acidentes, remediação ambiental, composição de carga, redespacho, autuações, etc. Ficando também responsável por indicar os dados da transportadora e motorista que farão a coleta no depósito da INTERCROMA." +
          "\n\n• O Cliente deverá apresentar à INTERCROMA, como condição de fornecimento, todas as licenças, autorizações e certificados atualizados exigidos pela legislação aplicável e necessários para a aquisição dos Produtos, especialmente em se tratando de produtos controlados e/ou perigosos. Inclusive referente a transportadora contratada." +
          "\n\n• O Cliente é responsável pelo descarte ambientalmente adequado das embalagens adquiridas." +
          "\n\n• Em caso de atraso no pagamento incidirão correção monetária, juros de mora e multa de xx% sobre o valor total em atraso, bem como custas de cartório e honorários advocatícios em caso de cobrança extrajudicial. O protesto em cartório ocorrerá após x (xxx) dias de atraso." +
          "\n\n• As Partes não serão responsabilizadas, em nenhuma circunstância, por danos indiretos (consequenciais, incidentais, perdas e danos, lucros cessantes, etc.)." +
          "\n\n• Ao aceitar a cotação e pedido, o Cliente automaticamente aceita os termos acima." +
          "\n\n• Fica definida a comarca de São Bento do Sul (Santa Catarina) para resolução de eventual litígio." +
          `\n\n  Muito obrigado(a), estamos à disposição.
         \n\n  Atenciosamente ${!this.vendedor ? '' : `, ` + this.vendedor.display_name}`
      var textObjects = {
        maxWidth: 270,
        align: "left",
      };

      var pdfCreated = jsPDFInvoiceTemplate.default(propsObject);
      pdfCreated.jsPDFDocObject.setPage(1)
      pdfCreated.jsPDFDocObject.setFontSize(8);
      pdfCreated.jsPDFDocObject.text(`Prazo de pagamento: ${this.condicaoPagamento}`, this.condicaoPagamento === 'Prazo não definido' ? 232 : Number(Number(270) - Number(Number(20) + this.condicaoPagamento.length)), 60, textObjects);
      pdfCreated.jsPDFDocObject.text(`Data de emissão: ${new Date().toLocaleDateString('pt-BR')}`, 250, 63, textObjects);
      pdfCreated.jsPDFDocObject.text(this.dataDeVencimentoPdf, !this.dataVencimento ? 239 : 246, 66, textObjects);
      pdfCreated.jsPDFDocObject.addPage();
      pdfCreated.jsPDFDocObject.setFontSize(9);
      pdfCreated.jsPDFDocObject.text(cabecalhoTermo, 10, 10, textObjects);
      pdfCreated.jsPDFDocObject.text(textoTermo, 10, 10, textObjects);
      pdfCreated.jsPDFDocObject.save(`${this.cotacaoPDFIdRandom}.pdf`);

      this.blobFile = pdfCreated.jsPDFDocObject.output('blob')

      await this.uploadFirebaseStoragePDF()
      await this.createPipelineDeal()
      await this.saveFirebasePdfOnFresh()
    }
  }
};
</script>

<style scoped>
.container {
  min-height: 25vmax;
}
</style>
