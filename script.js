// Sample economics articles data
const articles = [
    {
        id: 1,
        title: "Global GDP Growth Accelerates in Q1",
        excerpt: "World economic growth surpasses expectations as emerging markets show strong recovery signals.",
        category: "macroeconomics",
        date: "2026-04-15"
    },
    {
        id: 2,
        title: "Tech Startup Valuations: A New Bubble?",
        excerpt: "Investors debate whether current tech company valuations are sustainable or correction.",
        category: "microeconomics",
        date: "2026-04-14"
    },
    {
        id: 3,
        title: "Stock Markets Rally on Fed Rate Expectations",
        excerpt: "Major indices gain ground as investors anticipate potential interest rate adjustments.",
        category: "markets",
        date: "2026-04-13"
    },
    {
        id: 4,
        title: "New Trade Agreement Signed Between Nations",
        excerpt: "Three major economies reach landmark deal to reduce tariffs and boost commerce.",
        category: "policy",
        date: "2026-04-12"
    },
    {
        id: 5,
        title: "Cryptocurrency Markets Show Volatility",
        excerpt: "Digital assets experience significant price swings amid regulatory developments.",
        category: "markets",
        date: "2026-04-11"
    },
    {
        id: 6,
        title: "Inflation Trends: What Experts Predict",
        excerpt: "Economists analyze current inflation patterns and forecast implications for consumers.",
        category: "macroeconomics",
        date: "2026-04-10"
    },
    {
        id: 7,
        title: "Small Business Trends Post-Pandemic",
        excerpt: "Data reveals changing patterns in entrepreneurship and small business growth.",
        category: "microeconomics",
        date: "2026-04-09"
    },
    {
        id: 8,
        title: "Central Bank Policy Shift Signals Change",
        excerpt: "Major central bank announces new monetary policy framework for upcoming quarters.",
        category: "policy",
        date: "2026-04-08"
    },
    {
        id: 9,
        title: "Oil Prices Surge on Supply Concerns",
        excerpt: "Energy markets react to geopolitical tensions and production uncertainties.",
        category: "markets",
        date: "2026-04-07"
    },
    {
        id: 10,
        title: "Labor Market Recovery Continues",
        excerpt: "Employment figures show steady gains as unemployment reaches multi-year lows.",
        category: "macroeconomics",
        date: "2026-04-06"
    }
];

let currentFilter = 'all';
let currentSearchTerm = '';

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderArticles();
    setupCategoryFilters();
    setupSearch();
    setupNewsletter();
});

// Render articles based on filters and search
function renderArticles() {
    const container = document.getElementById('articlesContainer');
    
    let filteredArticles = articles.filter(article => {
        const matchesCategory = currentFilter === 'all' || article.category === currentFilter;
        const matchesSearch = article.title.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
                            article.excerpt.toLowerCase().includes(currentSearchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (filteredArticles.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 40px;">No articles found. Try adjusting your filters or search terms.</p>';
        return;
    }

    container.innerHTML = filteredArticles.map(article => `
        <div class="article-card">
            <div class="article-header">
                <span class="article-category">${article.category}</span>
                <h3 class="article-title">${article.title}</h3>
            </div>
            <div class="article-content">
                <p class="article-excerpt">${article.excerpt}</p>
                <p class="article-date">${new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
        </div>
    `).join('');
}

// Setup category filter buttons
function setupCategoryFilters() {
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-category');
            currentSearchTerm = '';
            document.getElementById('searchInput').value = '';
            renderArticles();
        });
    });
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    searchBtn.addEventListener('click', function() {
        currentSearchTerm = searchInput.value.trim();
        currentFilter = 'all';
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector('[data-category="all"]').classList.add('active');
        renderArticles();
    });

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
}

// Setup newsletter signup
function setupNewsletter() {
    const form = document.getElementById('newsletterForm');
    const messageDiv = document.getElementById('newsletterMessage');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('emailInput').value.trim();

        if (isValidEmail(email)) {
            messageDiv.textContent = '✓ Thank you for subscribing!';
            messageDiv.classList.add('success');
            messageDiv.classList.remove('error');
            form.reset();
            
            setTimeout(() => {
                messageDiv.textContent = '';
                messageDiv.classList.remove('success');
            }, 4000);
        } else {
            messageDiv.textContent = '✗ Please enter a valid email address';
            messageDiv.classList.add('error');
            messageDiv.classList.remove('success');
        }
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}