const rangeSection = document.querySelector('.range')
const rangeInput = document.querySelector('#range-input');

// Import library
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

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
export function setRange(settings, targetElement, modalWindowImg) {
    if (settings['max'] !== undefined) {
        rangeSlider.noUiSlider.off();
        rangeSection.classList.add('active');
        rangeSlider.noUiSlider.updateOptions({
            start: (settings['max']),
            step: settings['step'],
            range: {
                'min': settings['min'],
                'max': settings['max']
            }
        }, true)
        rangeSlider.noUiSlider.on('update', (value) => {
            rangeInput.value = Math.round(value * 10) / 10; // get rid of real numbers
            let pictureFilter = checkFilters(targetElement, rangeInput.value);
            modalWindowImg.style.filter = `${pictureFilter[0]}(${pictureFilter[1]})`;
            rangeInput.step = settings['step'];
        })
    } else {
        rangeSection.classList.remove('active');
        modalWindowImg.style.filter = 'unset';
    }
}

export function checkFilters(filterName, filterValue) {
    switch (filterName) {
        case 'marvin':
            filterName = 'invert';
            filterValue = `${filterValue}%`;
            break;
        case 'chrome':
            filterName = 'grayscale';
            filterValue = `${filterValue}`;
            break;
        case 'fobos':
            filterName = 'blur';
            filterValue = `${filterValue}px`;
            break;
        case 'heat':
            filterName = 'brightness';
            filterValue = `${filterValue}`;
            break;
    }
    return [filterName, filterValue];
}
