//Draggable Slider
(() => {
  let swiperHome = new Swiper('.certification-slider', {
    loop: true,
    grabCursor: true,
    slidesPerView: 'auto',
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      330: {
        centeredSlides: false,
        spaceBetween: 10,
      },
      575: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      1100: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
})();

//Comments Form
((d) => {
  const $form = d.querySelector('.comments-form'),
    $loader = d.querySelector('.comments-form-loader'),
    $response = d.querySelector('.response');

  $form.addEventListener('submit', (e) => {
    e.preventDefault();
    $loader.style.display = 'block';
    fetch('https://formsubmit.co/ajax/michaelvega46@gmail.com', {
      method: 'POST',
      body: new FormData(e.target),
    })
      .then((response) =>
        response.ok ? response.json : Promise.reject(response)
      )
      .then((json) => {
        //console.log(json);
        $response.classList.remove('none');
        $form.reset();
      })
      .catch((error) => {
        console.log(error);
        let message =
          error.statusText || 'Error al enviar, intenta nuevamente...';
        $response.querySelector(
          'h3'
        ).innerHTML = `Error ${error.status}: ${message}`;
        $response.classList.remove('none');
      })
      .finally(() => {
        $loader.style.display = 'none';
        setTimeout(() => {
          $response.classList.add('none');
        }, 3000);
      });
  });
})(document);

//ScrollTrigger Sections Animation with GSAP
(() => {
  gsap.registerPlugin(ScrollTrigger);
  let panels = gsap.utils.toArray('.section');

  panels.forEach((panel, i) => {
    ScrollTrigger.create({
      trigger: panel,
      start: () =>
        panel.offsetHeight < window.innerHeight ? 'top top' : 'bottom bottom', // if it's shorter than the viewport, we prefer to pin it at the top
      pin: true,
      pinSpacing: false,
    });
  });
})();

//Text Effect Animation
((d) => {
  let textAnimation = d.querySelectorAll('.text-animation');

  textAnimation.forEach((text) => {
    gsap.to(text, {
      y: 0,
      //stagger: 0.05,
      delay: 0.2,
      duration: 0.5,
      opacity: 1,
      scrollTrigger: {
        trigger: text,
      },
    });
  });
})(document);

//About & Certifications Sections Titles - Scroll Effect
((d) => {
  const subtitleEffects = d.querySelectorAll('.subtitle-effect');

  subtitleEffects.forEach((subtitle) => {
    gsap.to(subtitle, {
      backgroundSize: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: subtitle,
        start: 'center 80%',
        end: 'center 20%',
        scrub: true,
      },
    });
  });
})(document);

//Social Icons Animation
(() => {
  gsap.from('.social-icon', {
    duration: 0.3,
    y: -200,
    scale: 0,
    stagger: 0.5,
    delay: 1,
    scrollTrigger: {
      trigger: '.social-icon',
    },
  });
})();

//changeLanguaje funtionality

const textsToChange = document.querySelectorAll('[data-section]');

const changeLanguage = async (language) => {
  const resp = await fetch(`./languages/${language}.json`);
  const texts = await resp.json();
  for (const textToChange of textsToChange) {
    let $section = textToChange.dataset.section;
    let $value = textToChange.dataset.value;
    textToChange.innerHTML = texts[$section][$value];
  }
  localStorage.setItem('lang', language);
};

const loadLanguage = () => {
  let loadedLanguaje = localStorage.getItem('lang');
  console.log(loadedLanguaje);

  if (loadedLanguaje) {
    changeLanguage(loadedLanguaje);
  } else {
    changeLanguage('default');
  }
};

loadLanguage();
