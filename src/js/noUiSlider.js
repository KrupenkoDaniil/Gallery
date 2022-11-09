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
export function setRange(settings, modalWindowImg) {
    if (settings['max'] !== undefined) {
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
            rangeInput.value = Math.round(value * 10) / 10;
            switch (settings['filter']) {
                case 'invert':
                    value[0] += '%';
                    break;
                case 'blur':
                    value[0] += 'px';
                    break;
            }
            modalWindowImg.style.filter = `${settings['filter']}(${value})`;
            rangeInput.step = settings['step'];
        })
    } else {
        rangeSection.classList.remove('active');
        modalWindowImg.style.filter = 'unset';
    }
}
