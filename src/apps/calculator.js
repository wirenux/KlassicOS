export const CalculatorApp = {
    title: 'KCalc',
    contentBgColor: '#D6CEB9',

    render() {
        return `
            <div class="kcalc-container" style="font-family: 'W95F'; padding: 6px; width: 220px; user-select: none;">
                <div class="kcalc-screen" style="
                    background: #fff;
                    border-top: 2px solid #7b776b;
                    border-left: 2px solid #7b776b;
                    border-bottom: 2px solid #eaeaea;
                    border-right: 2px solid #eaeaea;
                    padding: 4px 8px;
                    text-align: right;
                    font-family: 'departureMono';
                    font-size: 16px;
                    font-weight: bold;
                    margin-bottom: 8px;
                    height: 22px;
                    overflow: hidden;
                ">0</div>

                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px;">
                    <button class="calc-btn btn-clear" style="grid-column: span 2; background: #C8C8C8; border: 2px solid; border-color: #fff #7b776b #7b776b #fff; padding: 4px; font-weight: bold; font-size: 12px;">C</button>
                    <button class="calc-btn" data-val="/" style="background: #C8C8C8; border: 2px solid; border-color: #fff #7b776b #7b776b #fff; padding: 4px; font-weight: bold;">/</button>
                    <button class="calc-btn" data-val="*" style="background: #C8C8C8; border: 2px solid; border-color: #fff #7b776b #7b776b #fff; padding: 4px; font-weight: bold;">*</button>

                    <button class="calc-btn" data-val="7" style="background: #C8C8C8; border: 2px solid; border-color: #fff #7b776b #7b776b #fff; padding: 4px;">7</button>
                    <button class="calc-btn" data-val="8" style="background: #C8C8C8; border: 2px solid; border-color: #fff #7b776b #7b776b #fff; padding: 4px;">8</button>
                    <button class="calc-btn" data-val="9" style="background: #C8C8C8; border: 2px solid; border-color: #fff #7b776b #7b776b #fff; padding: 4px;">9</button>
                    <button class="calc-btn" data-val="-" style="background: #C8C8C8; border: 2px solid; border-color: #fff #7b776b #7b776b #fff; padding: 4px; font-weight: bold;">-</button>

                    <button class="calc-btn" data-val="4" style="background: #C8C8C8; border: 2px solid; border-color: #fff #7b776b #7b776b #fff; padding: 4px;">4</button>
                    <button class="calc-btn" data-val="5" style="background: #C8C8C8; border: 2px solid; border-color: #fff #7b776b #7b776b #fff; padding: 4px;">5</button>
                    <button class="calc-btn" data-val="6" style="background: #C8C8C8; border: 2px solid; border-color: #fff #7b776b #7b776b #fff; padding: 4px;">6</button>
                    <button class="calc-btn" data-val="+" style="background: #C8C8C8; border: 2px solid; border-color: #fff #7b776b #7b776b #fff; padding: 4px; font-weight: bold;">+</button>

                    <button class="calc-btn" data-val="1" style="background: #C8C8C8; border: 2px solid; border-color: #fff #7b776b #7b776b #fff; padding: 4px;">1</button>
                    <button class="calc-btn" data-val="2" style="background: #C8C8C8; border: 2px solid; border-color: #fff #7b776b #7b776b #fff; padding: 4px;">2</button>
                    <button class="calc-btn" data-val="3" style="background: #C8C8C8; border: 2px solid; border-color: #fff #7b776b #7b776b #fff; padding: 4px;">3</button>
                    <button class="calc-btn btn-equals" style="grid-row: span 2; background: #C8C8C8; border: 2px solid; border-color: #fff #7b776b #7b776b #fff; padding: 4px; font-weight: bold; height: 100%;">=</button>

                    <button class="calc-btn" data-val="0" style="grid-column: span 2; background: #C8C8C8; border: 2px solid; border-color: #fff #7b776b #7b776b #fff; padding: 4px;">0</button>
                    <button class="calc-btn" data-val="." style="background: #C8C8C8; border: 2px solid; border-color: #fff #7b776b #7b776b #fff; padding: 4px; font-weight: bold;">.</button>
                </div>
            </div>
        `
    },

    init(windowEl) {
        const screen = windowEl.querySelector('.kcalc-screen');
        const buttons = windowEl.querySelectorAll('.calc-btn');

        let currentInput = '';
        let memoryExpansion = '';

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const val = btn.dataset.val;

                if (btn.classList.contains('btn-clear')) {
                    currentInput = '';
                    memoryExpansion = '';
                    screen.textContent = '0';
                    return;
                }

                if (btn.classList.contains('btn-equals')) {
                    if (!memoryExpansion && !currentInput) {
                        return;
                    }

                    try {
                        const result = new Function(`return ${memoryExpansion + currentInput}`)();
                        screen.textContent = Number(result).toString().substring(0, 14);
                        currentInput = result;
                        memoryExpansion = '';
                    } catch (err) {
                        screen.textContent = 'Error';
                        currentInput = '';
                        memoryExpansion = '';
                    }
                    return;
                }

                if (['+', '-', '*', '/'].includes(val)) {
                    memoryExpansion += currentInput + val;
                    currentInput = '';
                } else {
                    currentInput += val;
                    screen.textContent = currentInput.substring(0, 14);
                }
            })

            btn.addEventListener('mousedown', () => {
                btn.style.borderColor = '#7b776b #fff #fff #7b776b';
            });
            btn.addEventListener('mouseup', () => {
                btn.style.borderColor = '#fff #7b776b #7b776b #fff';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.borderColor = '#fff #7b776b #7b776b #fff';
            });
        });
    }
}