const pieces = [
  { name: 'Blush Halo Hoops', type: 'Earrings', price: 58, mood: 'romantic', symbol: '✧' },
  { name: 'Pearl Kiss Choker', type: 'Necklace', price: 76, mood: 'minimal', symbol: '○' },
  { name: 'Rose Orbit Ring', type: 'Ring', price: 49, mood: 'bold', symbol: '◇' },
  { name: 'Cupid Tennis Bracelet', type: 'Bracelet', price: 92, mood: 'romantic', symbol: '♡' },
];

let cartCount = 0;
let activeMood = 'romantic';

const cartCounter = document.querySelector('#cart-count');
const moodButtons = document.querySelector('#mood-buttons');
const recommendation = document.querySelector('#recommendation');
const productGrid = document.querySelector('#product-grid');

function addToCart() {
  cartCount += 1;
  cartCounter.textContent = cartCount;
}

function renderRecommendation() {
  const match = pieces.find((piece) => piece.mood === activeMood) || pieces[0];
  recommendation.innerHTML = `
    <span>${match.symbol}</span>
    <h3>${match.name}</h3>
    <p>${match.type} · $${match.price}</p>
    <button id="add-match">♡ Add matched piece</button>
  `;
  document.querySelector('#add-match').addEventListener('click', addToCart);
}

function renderMoodButtons() {
  moodButtons.innerHTML = '';
  ['romantic', 'minimal', 'bold'].forEach((mood) => {
    const button = document.createElement('button');
    button.textContent = mood;
    button.className = mood === activeMood ? 'active' : '';
    button.addEventListener('click', () => {
      activeMood = mood;
      renderMoodButtons();
      renderRecommendation();
    });
    moodButtons.append(button);
  });
}

function renderProducts() {
  pieces.forEach((piece) => {
    const card = document.createElement('article');
    card.className = 'product';
    card.innerHTML = `
      <div class="product-art"><span>${piece.symbol}</span></div>
      <p>${piece.type}</p>
      <h3>${piece.name}</h3>
      <div><strong>$${piece.price}</strong><button>Add</button></div>
    `;
    card.querySelector('button').addEventListener('click', addToCart);
    productGrid.append(card);
  });
}

renderMoodButtons();
renderRecommendation();
renderProducts();
