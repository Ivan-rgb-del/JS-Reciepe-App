const randomMeal = document.querySelector('.random-meal');
const meals = document.querySelector('.meals');
const mealsSearch = document.querySelector('.meals-search');
const input = document.querySelector('#search-term');
const searchBtn = document.querySelector('#search');
const body = document.querySelector('body');
const divReceipe = document.querySelector('.div-receipe');
divReceipe.style.background = 'transparent';

// GET RANDOM MEAL FROM ARRAY
getRandomMeal();
async function getRandomMeal() {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const respData = await resp.json();

    const randomResp = respData.meals[0];

    showRandomMeal(randomResp);
};

function showRandomMeal(meal) {
    const randDiv = document.createElement('div');
    randDiv.classList.add('rand-div');
    randDiv.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p class="rand-p">Random Meal</p>
        <p class="food-name">Name: ${meal.strMeal}</p>
        `
        randDiv.addEventListener('click', () => {
            getReceipe(meal);
            divReceipe.style.background = 'white';
        })
        body.addEventListener('dblclick', () => {
            removeReciepeDiv();
        })
        randomMeal.appendChild(randDiv);
};

// ADD ALL MEALS FROM ARRAY TO OUR PAGE
addAllMeals();
async function addAllMeals() {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const respData = await resp.json();

    getAllMeals(respData.meals);
};

function getAllMeals(mealsFood) {
    meals.innerHTML = '';

    mealsFood.forEach(meal => {
        const div = document.createElement('div');
        div.classList.add('meal-box');
        div.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <p class="food-name">Name: ${meal.strMeal}</p>
        `
        div.addEventListener('click', () => {
            getReceipe(meal);
            divReceipe.style.background = 'white';
        })
        body.addEventListener('dblclick', () => {
            removeReciepeDiv();
        })
        meals.appendChild(div);
    })
};

// WHEN WE WANT SOME MEAL WHEN WE TYPE THAT MEAL IN INPUT THAT WILL GO ON PAGE
async function addSearchedMeals(term) {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + term);
    const respData = await resp.json();
    const meals = respData.meals;

    return meals;
};

searchBtn.addEventListener('click', async () => {
    const search = input.value;
    const searchMeal = await addSearchedMeals(search);

    if (searchMeal) {
        searchMeal.forEach(meal => {
            const div = document.createElement('div');
            div.classList.add('meal-box2');
            div.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <p class="food-name">Name: ${meal.strMeal}</p>
            `
            div.addEventListener('click', () => {
                getReceipe(meal);
                divReceipe.style.background = 'white';
            })
            body.addEventListener('dblclick', () => {
                removeReciepeDiv();
            })
            input.value = '';
            mealsSearch.appendChild(div);
            meals.innerHTML = '';
        })
    }
    else {
        alert("We don't have that meal!");
    }
});

// When we click on div add me information of that meal
function getReceipe(meal) {
    body.classList.add('overlay1');

    divReceipe.innerHTML = `
    <div class="align">
        <h1 class="food-title">${meal.strMeal}</h1>
    </div>

    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <h1 class="food-title2">Meal Info</h1>
    <p class="food-info">${meal.strInstructions}</p>
    `
    body.appendChild(divReceipe);
};

// When we click er will remove reciepeDiv
function removeReciepeDiv() {
    divReceipe.remove();
    body.classList.remove('overlay1');
};