
// Import library
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';


const rangeSection = document.querySelector('.range')
const rangeInput = document.querySelector('#range-input');

// Set Range Slider
const rangeSlider = document.querySelector('#range-slider');
if (rangeSlider) {
    noUiSlider.create(rangeSlider, {
        start: [0],
        step: 1,
        range: {
            'min': 0,
            'max': 1
        }
    });
}

// Add Constant Event Listener
rangeInput.addEventListener('input', () => {
    rangeSlider.noUiSlider.updateOptions({
        start: (rangeInput.value),
    }, true)
});

// Main Setting Function 
export function setRange(effectId, modalWindowImg) {
    let pictureFilter = checkEffects(effectId, rangeInput.value);
    if (pictureFilter[2]['max']) {
        rangeSlider.noUiSlider.off();
        rangeSection.classList.add('active');
        rangeSlider.noUiSlider.updateOptions({
            start: pictureFilter[2]['max'],
            step: pictureFilter[2]['step'],
            range: {
                'min': pictureFilter[2]['min'],
                'max': pictureFilter[2]['max']
            }
        }, true)
        rangeSlider.noUiSlider.on('update', (value) => {
            rangeInput.value = Math.round(value * 10) / 10; // get rid of real numbers
            pictureFilter = checkEffects(effectId, rangeInput.value);
            modalWindowImg.style.filter = `${pictureFilter[0]}(${pictureFilter[1]})`;
            rangeInput.step = pictureFilter[2]['step'];
        })
    } else {
        rangeSection.classList.remove('active');
        modalWindowImg.style.filter = 'unset';
    }
}

export function checkEffects(filterId, filterValue, filters = null) {
    if (checkEffects.filters === undefined) {
        checkEffects.filters = filters;
        console.log(checkEffects.filters);
    }
    let currentFilter = checkEffects.filters[filterId - 1];
    switch (currentFilter['inner_name']) {
        case 'marvin':
            filterValue = `${filterValue}%`;
            break;
        case 'phobos':
            filterValue = `${filterValue}px`;
            break;
    }
    let filterName = currentFilter['css_filter'];
    let settings = {
        min: currentFilter['range_min'],
        max: currentFilter['range_max'],
        step: currentFilter['step'],
    };
    return [filterName, filterValue, settings];
}
