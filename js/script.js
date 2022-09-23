const sliderBlock = document.querySelector('.banner');

const getData = async () => {
       return  await fetch('https://solovey.com.ua/test/data.json')
                .then(res => res.json())
                .then(data => data)
                .catch(error => console.log(error))
    }

const createContent = async () => {
    let loader = '<div class="loader__wrapper"><div class="loader"></div></div>';
    sliderBlock.innerHTML = loader;

    let result = await getData();
    let template = '';

    if(result.sneakers.length) {
        result.sneakers.forEach(({model, price, image_url, link}) => {
            template += `<a href=${link} target="_blank" class="banner__container">
                            <div class="banner__logo">
                                <img src="./img/nike-logo.png" alt="Nike Logo">
                            </div>
                            <div class="banner__content">
                                <h2 class="banner__title">
                                    ${model}
                                </h2>
                                <div class="banner__img">
                                    <div class="banner__price flex-center">
                                        ${result.currency}${price}
                                    </div>
                                    <img src=${image_url} alt="${model.replace(/<\s?\/?\s?br\s?\/?\s?>/ig, ' ')}">
                                </div>
                                <div class="banner__button flex-center">
                                    ORDER NOW!
                                </div>
                            </div>
                        </a>`;
        })
    };
    sliderBlock.innerHTML = template;
}

const createSlider = async () => {
      await createContent();
      $(document).ready(function () {
            $(".banner").lightSlider({
                item: 1,
                loop: true,
                auto: true,
                slideMargin: 0,
                speed: 600,
                controls: false,
                pause: 5000,
           });
        });
}

createSlider();

