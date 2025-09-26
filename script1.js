// Set year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
toggle && toggle.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
});

// Enhanced reveal on scroll with staggered animations
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('show');
      
      // Add staggered animation to child elements
      const children = entry.target.querySelectorAll('.project, .skill');
      children.forEach((child, index) => {
        setTimeout(() => {
          child.style.animation = `fadeInUp 0.6s ease-out both`;
        }, index * 100);
      });
      
      revealObserver.unobserve(entry.target);
    }
  })
}, {threshold: 0.12});
reveals.forEach(r => revealObserver.observe(r));

// Highlight current nav link on scroll
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('nav a');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const link = document.querySelector('nav a[href="#'+id+'"]');
    if(entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active')); 
      if(link) link.classList.add('active');
    }
  })
}, {rootMargin: '-40% 0px -40% 0px'});
sections.forEach(s => sectionObserver.observe(s));

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  const profileCard = document.querySelector('.profile-card');
  
  if (hero && profileCard) {
    const rate = scrolled * -0.5;
    profileCard.style.transform = `translateY(${rate}px)`;
  }
});

// Typing animation for the main heading
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
  const heading = document.querySelector('.intro h1');
  if (heading) {
    const originalText = heading.textContent;
    setTimeout(() => {
      typeWriter(heading, originalText, 80);
    }, 1000);
  }
});

// Mouse follow effect for cards
document.querySelectorAll('.card, .project').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
  });
});

// Smooth scroll with easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add ripple effect to buttons
function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;
  
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add('ripple');
  
  const ripple = button.getElementsByClassName('ripple')[0];
  if (ripple) {
    ripple.remove();
  }
  
  button.appendChild(circle);
}

// Add ripple styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// Apply ripple effect to all buttons
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', createRipple);
});

// Animate skills on hover with random colors
const skillColors = ['#06b6d4', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#10b981'];
document.querySelectorAll('.skill').forEach((skill, index) => {
  skill.addEventListener('mouseenter', () => {
    const randomColor = skillColors[Math.floor(Math.random() * skillColors.length)];
    skill.style.setProperty('--accent', randomColor);
  });
  
  skill.addEventListener('mouseleave', () => {
    skill.style.setProperty('--accent', '#06b6d4');
  });
});

// Simple contact handler (demo only)
function handleSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  // Add loading animation to submit button
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.style.opacity = '0.7';
  
  // Create mailto link
  const mailto = `mailto:majorilhamraza@gmail.com?subject=${encodeURIComponent('Portfolio Contact from ' + name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' <' + email + '>')}`;
  window.location.href = mailto;
  
  // Reset button after a delay
  setTimeout(() => {
    submitBtn.textContent = originalText;
    submitBtn.style.opacity = '1';
  }, 2000);
}

// Smooth mobile nav close after click
document.querySelectorAll('nav a').forEach(a => a.addEventListener('click', () => {
  if(window.matchMedia('(max-width:980px)').matches) {
    document.querySelector('nav').style.display = 'none';
    document.querySelector('.menu-toggle').setAttribute('aria-expanded', 'false');
  }
}
)
)