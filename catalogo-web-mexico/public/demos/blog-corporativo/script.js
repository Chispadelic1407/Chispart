// Sample blog posts data
const blogPosts = [
    {
        id: 1,
        title: 'El Futuro del Desarrollo Web en 2024',
        category: 'tecnologia',
        excerpt: 'Exploramos las tendencias más importantes que están moldeando el futuro del desarrollo web y cómo prepararse para ellas.',
        content: 'El desarrollo web está evolucionando rápidamente. Las nuevas tecnologías como WebAssembly, Progressive Web Apps, y frameworks modernos están cambiando la forma en que construimos aplicaciones web. En este artículo, exploramos las tendencias más importantes y cómo pueden beneficiar a tu negocio.',
        author: 'María García',
        date: '2024-01-15',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
        views: 1234,
        comments: 23
    },
    {
        id: 2,
        title: 'Estrategias de Marketing Digital para PyMEs',
        category: 'marketing',
        excerpt: 'Descubre cómo las pequeñas y medianas empresas pueden competir en el mundo digital con estrategias efectivas y de bajo costo.',
        content: 'El marketing digital no tiene que ser costoso. Con las estrategias correctas, las PyMEs pueden alcanzar a su audiencia objetivo de manera efectiva. Desde SEO hasta redes sociales, exploramos las tácticas que realmente funcionan.',
        author: 'Carlos Ruiz',
        date: '2024-01-12',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
        views: 987,
        comments: 15
    },
    {
        id: 3,
        title: 'Inteligencia Artificial en los Negocios',
        category: 'tecnologia',
        excerpt: 'Cómo la IA está transformando la forma en que las empresas operan y toman decisiones estratégicas.',
        content: 'La inteligencia artificial ya no es ciencia ficción. Empresas de todos los tamaños están implementando soluciones de IA para mejorar la eficiencia, personalizar experiencias de cliente y tomar decisiones basadas en datos.',
        author: 'Ana Martínez',
        date: '2024-01-10',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
        views: 2156,
        comments: 34
    },
    {
        id: 4,
        title: 'Optimización de E-commerce para Conversiones',
        category: 'negocios',
        excerpt: 'Técnicas probadas para aumentar las tasas de conversión en tu tienda online y maximizar las ventas.',
        content: 'Aumentar las conversiones en e-commerce requiere una combinación de diseño UX, copywriting persuasivo y optimización técnica. Compartimos las mejores prácticas que han demostrado aumentar las ventas.',
        author: 'Luis Hernández',
        date: '2024-01-08',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
        views: 1543,
        comments: 28
    },
    {
        id: 5,
        title: 'Diseño UX/UI: Principios Fundamentales',
        category: 'diseño',
        excerpt: 'Los principios esenciales del diseño de experiencia de usuario que todo diseñador debe conocer.',
        content: 'Un buen diseño UX/UI es invisible. Los usuarios no deberían pensar en cómo usar tu producto. Exploramos los principios fundamentales que hacen que las interfaces sean intuitivas y agradables de usar.',
        author: 'Sofia López',
        date: '2024-01-05',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
        views: 1876,
        comments: 19
    },
    {
        id: 6,
        title: 'SEO en 2024: Lo que Realmente Importa',
        category: 'marketing',
        excerpt: 'Las estrategias de SEO que están funcionando ahora y cómo adaptarse a los cambios de algoritmo.',
        content: 'El SEO continúa evolucionando. Google prioriza cada vez más la experiencia del usuario, el contenido de calidad y la autoridad del dominio. Descubre qué tácticas funcionan en 2024.',
        author: 'Roberto Sánchez',
        date: '2024-01-03',
        image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&h=400&fit=crop',
        views: 2341,
        comments: 42
    },
    {
        id: 7,
        title: 'Ciberseguridad para Empresas',
        category: 'tecnologia',
        excerpt: 'Protege tu negocio de amenazas cibernéticas con estas mejores prácticas de seguridad.',
        content: 'La ciberseguridad es crítica para cualquier negocio moderno. Desde ataques de phishing hasta ransomware, las amenazas son reales. Aprende cómo proteger tu empresa y tus datos.',
        author: 'Patricia Gómez',
        date: '2024-01-01',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop',
        views: 1654,
        comments: 31
    },
    {
        id: 8,
        title: 'Transformación Digital: Guía Completa',
        category: 'negocios',
        excerpt: 'Cómo llevar tu empresa a la era digital con una estrategia efectiva de transformación.',
        content: 'La transformación digital no es solo adoptar nuevas tecnologías. Es un cambio cultural que requiere planificación estratégica, capacitación y un enfoque centrado en el cliente.',
        author: 'Miguel Torres',
        date: '2023-12-28',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
        views: 1987,
        comments: 25
    }
];

let currentView = 'grid';
let currentCategory = 'all';
let currentPostId = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderPosts();
    loadComments();
});

// Render posts
function renderPosts() {
    const postsGrid = document.getElementById('postsGrid');
    let filteredPosts = blogPosts;

    // Filter by category
    if (currentCategory !== 'all') {
        filteredPosts = blogPosts.filter(post => post.category === currentCategory);
    }

    // Filter by search
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (searchTerm) {
        filteredPosts = filteredPosts.filter(post =>
            post.title.toLowerCase().includes(searchTerm) ||
            post.excerpt.toLowerCase().includes(searchTerm)
        );
    }

    postsGrid.innerHTML = filteredPosts.map(post => `
        <div class="post-card" onclick="showPostDetail(${post.id})">
            <img src="${post.image}" alt="${post.title}" class="post-image">
            <div class="post-content">
                <div class="post-meta">
                    <span class="post-category">${getCategoryName(post.category)}</span>
                    <span>📅 ${formatDate(post.date)}</span>
                </div>
                <h3 class="post-title">${post.title}</h3>
                <p class="post-excerpt">${post.excerpt}</p>
                <div class="post-footer">
                    <div class="post-author">
                        <div class="author-avatar">${post.author.charAt(0)}</div>
                        <span class="author-name">${post.author}</span>
                    </div>
                    <div class="post-stats">
                        <span>👁️ ${post.views}</span>
                        <span>💬 ${post.comments}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function getCategoryName(category) {
    const names = {
        'tecnologia': 'Tecnología',
        'negocios': 'Negocios',
        'marketing': 'Marketing',
        'diseño': 'Diseño'
    };
    return names[category] || category;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Filter functions
function filterByCategory(category) {
    currentCategory = category;
    
    // Update active category
    document.querySelectorAll('.category-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.category === category) {
            item.classList.add('active');
        }
    });
    
    renderPosts();
}

function filterPosts() {
    renderPosts();
}

// View toggle
function setView(view) {
    currentView = view;
    const postsGrid = document.getElementById('postsGrid');
    
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.closest('.view-btn').classList.add('active');
    
    if (view === 'list') {
        postsGrid.classList.add('list-view');
    } else {
        postsGrid.classList.remove('list-view');
    }
}

// Post detail
function showPostDetail(postId) {
    currentPostId = postId;
    const post = blogPosts.find(p => p.id === postId);
    if (!post) return;

    const postDetail = document.getElementById('postDetail');
    postDetail.innerHTML = `
        <img src="${post.image}" alt="${post.title}">
        <div class="post-meta">
            <span class="post-category">${getCategoryName(post.category)}</span>
            <span>📅 ${formatDate(post.date)}</span>
            <span>👁️ ${post.views} vistas</span>
        </div>
        <h1>${post.title}</h1>
        <div class="post-author" style="margin-bottom: 25px;">
            <div class="author-avatar">${post.author.charAt(0)}</div>
            <span class="author-name">${post.author}</span>
        </div>
        <div class="post-body">
            <p>${post.content}</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
    `;

    loadComments();
    document.getElementById('postModal').classList.add('active');
}

function closePostModal() {
    document.getElementById('postModal').classList.remove('active');
    currentPostId = null;
}

// Comments
function loadComments() {
    if (!currentPostId) return;
    
    const comments = JSON.parse(localStorage.getItem(`comments_${currentPostId}`) || '[]');
    const commentsList = document.getElementById('commentsList');
    const commentCount = document.getElementById('commentCount');
    
    commentCount.textContent = comments.length;
    
    if (comments.length === 0) {
        commentsList.innerHTML = '<p style="text-align: center; color: #64748b;">No hay comentarios aún. ¡Sé el primero en comentar!</p>';
        return;
    }
    
    commentsList.innerHTML = comments.map(comment => `
        <div class="comment">
            <div class="comment-header">
                <span class="comment-author">${comment.author}</span>
                <span class="comment-date">${formatDate(comment.date)}</span>
            </div>
            <p class="comment-text">${comment.text}</p>
        </div>
    `).join('');
}

function addComment() {
    if (!currentPostId) return;
    
    const commentText = document.getElementById('commentText').value.trim();
    if (!commentText) {
        alert('Por favor escribe un comentario');
        return;
    }
    
    const comments = JSON.parse(localStorage.getItem(`comments_${currentPostId}`) || '[]');
    const newComment = {
        id: Date.now(),
        author: 'Usuario Anónimo',
        text: commentText,
        date: new Date().toISOString()
    };
    
    comments.push(newComment);
    localStorage.setItem(`comments_${currentPostId}`, JSON.stringify(comments));
    
    document.getElementById('commentText').value = '';
    loadComments();
    
    // Update comment count in post
    const post = blogPosts.find(p => p.id === currentPostId);
    if (post) {
        post.comments++;
        renderPosts();
    }
}

// Newsletter
function subscribeNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    
    // Save to localStorage
    const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
    if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
        alert('¡Gracias por suscribirte! Recibirás nuestras actualizaciones.');
        event.target.reset();
    } else {
        alert('Este email ya está suscrito.');
    }
}

// CMS Editor
function showCMSEditor() {
    document.getElementById('cmsModal').classList.add('active');
}

function closeCMSEditor() {
    document.getElementById('cmsModal').classList.remove('active');
}

// New Post
function showNewPostModal() {
    document.getElementById('newPostModal').classList.add('active');
}

function closeNewPostModal() {
    document.getElementById('newPostModal').classList.remove('active');
}

function createNewPost(event) {
    event.preventDefault();
    
    const title = document.getElementById('postTitle').value;
    const category = document.getElementById('postCategory').value;
    const excerpt = document.getElementById('postExcerpt').value;
    const content = document.getElementById('postContent').value;
    
    const newPost = {
        id: blogPosts.length + 1,
        title,
        category,
        excerpt,
        content,
        author: 'Tú',
        date: new Date().toISOString().split('T')[0],
        image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop',
        views: 0,
        comments: 0
    };
    
    blogPosts.unshift(newPost);
    renderPosts();
    closeNewPostModal();
    event.target.reset();
    
    alert('¡Post creado exitosamente!');
}

// Close modals on outside click
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});
