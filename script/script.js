const pages = [];
const mealA = {}

document.addEventListener("DOMContentLoaded", ()=>{
    getIList()
})

const getIList = async () => {
    const apiURL = "https://www.themealdb.com/api/json/v1/1/filter.php?i";
    try {
        const response = await fetch(apiURL)
        const data = await response.json()
        loadData (data)
    } catch (error){
        console.log('Fetch Error', error)
    } finally{

    }
}

const loadData = (data) => {
    const datos = data.meals
    let aux = []
    for (let i = 0; i < datos.length; i++) {
        aux.push(datos[i])
        
        if (aux.length==9) {
            pages.push(aux)
            aux = []
        }
    }
    loadVue()
}

const loadMeal = (data) =>{
  mealA =data.meals[0];
}

const loadVue = () => {
    const { createApp, ref } = Vue;
    const app = createApp({
        data() {
          return {
            pagNum: 0,
            cards: [],
            plus: false,
            less: true,
            slices:[
              "./imagenes/sliders/menu-de-almuerzos-sopa-de-pollo-e1616820076724.jpg",
              "./imagenes/sliders/menu-de-almuerzos-arroz-con-mariscos-1320x987.jpg",
              "./imagenes/sliders/menu-de-almuerzos-estofado-de-pavo.jpg",
              "./imagenes/sliders/menu-de-almuerzos-crema-de-espinaca-1024x1536.jpg",
              "./imagenes/sliders/menu-de-almuerzos-macarrones-con-queso.jpg",
              "./imagenes/sliders/menu-de-almuerzos-pollo-al-ajillo-en-salsa-de-tomate.jpg"],
            icons:[
              {
                src:"./imagenes/icon/con-pollo_0.png",
                alt: "Pollo"
              },
              {
                src:"./imagenes/icon/cenas familiares 1_0.png",
                alt: "Pizzas"
              },
              {
                src:"./imagenes/icon/ensaladas 2 1_0.png",
                alt: "Ensaladas"
              },
              {
                src:"./imagenes/icon/vegetales 1_0.png",
                alt: "Vegetales"
              },
              {
                src:"./imagenes/icon/Jantar_0.png",
                alt: "Pastas"
              },
              {
                src:"./imagenes/icon/lentehs 1_0.png",
                alt: "Guisos"
              },
              {
                src:"./imagenes/icon/postres 2 1_0.png",
                alt: "Postres"
              }
            ],
            meal: {}

          };
        },
        created() {
          this.changePage(this.pagNum);
        },
        methods: {
          changePage(num) {
            if ((this.pagNum + num >= 0) && (this.pagNum + num < pages.length)) {
              this.pagNum += num;
              this.cards = pages[this.pagNum];
              this.pagNum == 0 ? this.less = true : this.less = false;
              this.pagNum == pages.length - 1 ? this.plus = true : this.plus = false;
            }
          },
          recetaData: async function (id) {
            console.log(id,'click');
            const apiURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
            try {
                const response = await fetch(apiURL);
                const data = await response.json();
                this.meal = data.meals[0];
                this.toLocalStorage(data.meals[0])
            } catch (error) {
                console.log('Fetch Error', error);
            } finally {
          
            }
          },
          toLocalStorage(meal){
            localStorage.setItem('vuetest', JSON.stringify(meal))
            document.getElementsByClassName("popup")[0].style.setProperty('visibility', 'visible')
          },
          coseMeal(){
            document.getElementsByClassName("popup")[0].style.setProperty('visibility', 'hidden')
          }
        }
      });
      app.mount('#appThemeal');
}
