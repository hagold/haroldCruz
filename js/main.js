(function ($) {
    "use strict";
    
    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 30
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    

    // Typed Initiate
    if ($('.header h2').length == 1) {
        var typed_strings = $('.header .typed-text').text();
        var typed = new Typed('.header h2', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }
    
    
    // Skills
    $('.skills').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});
    
    
    // Porfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('filter-active');
        $(this).addClass('filter-active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
    // Certifications isotope and filter
    var certIsotope = $('.certs-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#cert-flters li').on('click', function () {
        $("#cert-flters li").removeClass('filter-active');
        $(this).addClass('filter-active');
        certIsotope.isotope({ filter: $(this).data('filter') });
    });


    // Review slider
    $('.review-slider').slick({
        autoplay: true,
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
})(jQuery);

// --- Hamburger Popout Menu in Header ---
document.addEventListener('DOMContentLoaded', function() {
  var navToggle = document.getElementById('navToggle');
  var navPopup = document.getElementById('navPopup');
  var navBackdrop = document.getElementById('navPopupBackdrop');
  var closeBtn = document.getElementById('closeNavPopup');
  if(navToggle && navPopup){
    function openMenu() {
      navPopup.classList.add('open');
      navBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      navPopup.classList.remove('open');
      navBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
    navToggle.addEventListener('click', openMenu);
    if(closeBtn) closeBtn.addEventListener('click', closeMenu);
    if(navBackdrop) navBackdrop.addEventListener('click', closeMenu);

    // Optional: Close menu on link click
    navPopup.querySelectorAll('.nav-menu a').forEach(function(link){
      link.addEventListener('click', closeMenu);
    });

    // ESC key closes menu
    window.addEventListener('keydown', function(e){
      if(e.key === 'Escape') closeMenu();
    });
  }
});

// ==== INTERACTIVE NETWORK BACKGROUND ====
// --- THEME AWARENESS FOR BACKGROUND ---
let isDayMode = false;
function updateBgTheme() {
  isDayMode = document.body.classList.contains('day-mode');
}
updateBgTheme();
const bgThemeObserver = new MutationObserver(updateBgTheme);
bgThemeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });

(function() {
  const canvas = document.getElementById('bg-network');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = window.innerWidth, height = window.innerHeight;
  let nodes = [], nodeCount = 44, maxDist = 170;
  let mouse = { x: width/2, y: height/2 };

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  resize();
  window.addEventListener('resize', resize);

  // Node definition
  function Node() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.8;
    this.vy = (Math.random() - 0.5) * 0.8;
    this.radius = 2.3 + Math.random() * 1.9;
    // Theme-aware color:
    this.color = isDayMode ? "rgba(70,130,220,0.7)" : "rgba(62,65,227,0.7)";
  }
  for (let i = 0; i < nodeCount; i++) nodes.push(new Node());

  // Cursor attraction
  document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Animate nodes
    for (let node of nodes) {
      // Attraction to cursor
      let dx = mouse.x - node.x;
      let dy = mouse.y - node.y;
      let dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 160) {
        node.vx += dx / dist * 0.02;
        node.vy += dy / dist * 0.02;
      }
      // Repulsion from edges
      if (node.x < 30 || node.x > width-30) node.vx *= -1;
      if (node.y < 30 || node.y > height-30) node.vy *= -1;
      // Speed limit
      node.vx *= 0.98; node.vy *= 0.98;
      node.x += node.vx;
      node.y += node.vy;
      // Live update color for theme
      node.color = isDayMode ? "rgba(70,130,220,0.7)" : "rgba(62,65,227,0.7)";
    }

    // Draw lines
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i+1; j < nodes.length; j++) {
        let dx = nodes[i].x - nodes[j].x;
        let dy = nodes[i].y - nodes[j].y;
        let d = Math.sqrt(dx*dx + dy*dy);
        if (d < maxDist) {
          ctx.strokeStyle = isDayMode
            ? `rgba(70,130,220,${0.16 + 0.33 * (1-d/maxDist)})`
            : `rgba(62,65,227,${0.20 + 0.45 * (1-d/maxDist)})`;
          ctx.lineWidth = 1.15;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    for (let node of nodes) {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
      ctx.fillStyle = node.color;
      ctx.shadowColor = isDayMode ? "#7e7aff" : "#3e41e3";
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // --- LIQUID BLOB SHAPE AT CURSOR ---
    const BLOB_POINTS = 12; // number of points for blob (more = smoother)
    const BLOB_BASE_RADIUS = 44;
    const BLOB_WOBBLE = 11; // how much the shape wiggles

    function drawLiquidBlob(cursorX, cursorY, time) {
      let points = [];
      for (let i = 0; i < BLOB_POINTS; i++) {
        const angle = (i / BLOB_POINTS) * Math.PI * 2;
        // Add per-point random "wobble" based on time for liquid effect
        const wobble =
          Math.sin(time / 700 + i * 0.6) * BLOB_WOBBLE +
          Math.cos(time / 520 - i * 1.3) * (BLOB_WOBBLE * 0.75);

        const r = BLOB_BASE_RADIUS + wobble;
        const x = cursorX + Math.cos(angle) * r;
        const y = cursorY + Math.sin(angle) * r;
        points.push({ x, y });
      }

      // Draw the blobby path
      ctx.save();
      ctx.beginPath();
      for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        const p2 = points[(i + 1) % points.length];
        // Calculate mid-point for smooth curve
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;
        if (i === 0) {
          ctx.moveTo(midX, midY);
        } else {
          ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);
        }
      }
      ctx.closePath();

      // Glowing fill
      ctx.globalAlpha = 0.26;
      ctx.fillStyle = isDayMode ? "#7e7aff" : "#6e82fb";
      ctx.shadowColor = isDayMode ? "#7e7aff" : "#3e41e3";
      ctx.shadowBlur = 44;
      ctx.fill();
      ctx.globalAlpha = 1.0;

      // Border
      ctx.lineWidth = 4.8;
      ctx.strokeStyle = isDayMode ? "rgba(70,130,220,0.57)" : "rgba(62,65,227,0.57)";
      ctx.shadowColor = isDayMode ? "#7e7aff" : "#6e82fb";
      ctx.shadowBlur = 18;
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.restore();
    }

    drawLiquidBlob(mouse.x, mouse.y, Date.now());

    requestAnimationFrame(animate);
  }

  animate();
})();


// CERTIFICATIONS FILTER
document.addEventListener("DOMContentLoaded", function () {
    const certFilters = document.querySelectorAll("#certifications-flters li");
    const certItems = document.querySelectorAll(".certification-item");

    certFilters.forEach(filterBtn => {
        filterBtn.addEventListener("click", function () {
            // Remove active from all, set for this one
            certFilters.forEach(btn => btn.classList.remove("filter-active"));
            this.classList.add("filter-active");

            const filter = this.getAttribute("data-filter");
            certItems.forEach(item => {
                if (filter === "*") {
                    item.style.display = "flex";
                } else {
                    if (item.classList.contains(filter.substring(1))) {
                        item.style.display = "flex";
                    } else {
                        item.style.display = "none";
                    }
                }
            });
        });
    });
});

// PORTFOLIO FILTER
document.addEventListener("DOMContentLoaded", function () {
    const portfolioFilters = document.querySelectorAll("#portfolio-flters li");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    portfolioFilters.forEach(filterBtn => {
        filterBtn.addEventListener("click", function () {
            // Remove active from all, set for this one
            portfolioFilters.forEach(btn => btn.classList.remove("filter-active"));
            this.classList.add("filter-active");

            const filter = this.getAttribute("data-filter");
            portfolioItems.forEach(item => {
                if (filter === "*") {
                    item.style.display = "flex";
                } else {
                    if (item.classList.contains(filter.substring(1))) {
                        item.style.display = "flex";
                    } else {
                        item.style.display = "none";
                    }
                }
            });
        });
    });
});

// Typed text for header (roles animation)
const roles = [
  "Computer Engineer",
  "Web Developer",
  "UI/UX Enthusiast"
];
let index = 0, char = 0, isDeleting = false;
const el = document.getElementById("typed-text");

function typeLoop() {
  if (!el) return;
  let role = roles[index];
  if (isDeleting) {
    el.textContent = role.substring(0, char--);
    if (char < 0) {
      isDeleting = false;
      index = (index + 1) % roles.length;
      setTimeout(typeLoop, 350);
    } else setTimeout(typeLoop, 24);
  } else {
    el.textContent = role.substring(0, char++);
    if (char > role.length) {
      isDeleting = true;
      setTimeout(typeLoop, 900);
    } else setTimeout(typeLoop, 43);
  }
}
typeLoop();


// =====================
//   THEME SWITCHER
// =====================
document.addEventListener("DOMContentLoaded", function() {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;
  const icon = toggleBtn.querySelector(".theme-icon i");
  // Store user preference in localStorage
  let isDay = localStorage.getItem("theme") === "day";
  function setTheme(day) {
    if(day) {
      document.body.classList.add("day-mode");
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
      toggleBtn.setAttribute("aria-label", "Switch to night mode");
      localStorage.setItem("theme","day");
    } else {
      document.body.classList.remove("day-mode");
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
      toggleBtn.setAttribute("aria-label", "Switch to day mode");
      localStorage.setItem("theme","night");
    }
    updateBgTheme(); // Let the canvas update immediately!
  }
  setTheme(isDay);

  toggleBtn.addEventListener("click", function() {
    isDay = !isDay;
    setTheme(isDay);
  });
});

// CONTACT FORM - EMAILJS INTEGRATION + MODAL NOTIF
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Gather form data
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const subject = document.getElementById('contact-subject').value;
        const message = document.getElementById('contact-message').value;

        // Send with EmailJS
        emailjs.send("service_i2z06c9","template_pogdki2", {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message
        })
        .then(function(response) {
            showModal("Your message was sent successfully!", true);
            form.reset();
        }, function(error) {
            showModal("Sorry, your message could not be sent. Please try again later.", false);
        });
    });

    // --- Modal notification ---
    function showModal(msg, success=true) {
        // Remove existing modal if present
        let oldModal = document.getElementById('contact-modal');
        if (oldModal) oldModal.remove();

        let modal = document.createElement('div');
        modal.id = 'contact-modal';
        modal.innerHTML = `
            <div style="
                position:fixed; left:0; top:0; width:100vw; height:100vh; background:rgba(30,34,80,0.26); z-index:9999; display:flex; align-items:center; justify-content:center;">
                <div style="
                    background:${success ? "#fffbe7" : "#ffeaea"};
                    border-radius:18px; padding:36px 36px 28px 36px;
                    min-width:320px; max-width:92vw;
                    box-shadow:0 6px 34px #7e7aff33;
                    color:#23243a; text-align:center; font-size:1.13rem;">
                    <div style="font-size:2.4rem; margin-bottom:16px;">
                        ${success ? "✅" : "❌"}
                    </div>
                    <div style="margin-bottom:24px;">${msg}</div>
                    <button style="
                        background:linear-gradient(90deg,#7e7aff 0%,#ffe794 100%);
                        color:#23243a; font-weight:800; border:none; border-radius:11px;
                        padding:12px 34px; font-size:1.09rem; cursor:pointer;" 
                        onclick="document.getElementById('contact-modal').remove()">
                        Close
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
});
