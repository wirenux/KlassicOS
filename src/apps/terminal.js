const VFS = {
    'README.md': 'Nox Development Environment\n-----------------------------\n',
    'todo.txt': '[ ] Win a prize at Stardust\n[ ] Get my stickers !',
    'kernel_panic.log': '0x0000003B: SYSTEM_SERVICE_EXCEPTION\nCR2: 0x00007FFF8A3C2004\nKernel pipeline flushed. Status: Out of popcorn.'
}

export const TerminalApp = {
    title: 'Konsole', 
    contentBgColor: '#000000',

    render() {
        return `
            <div class="terminal-wrapper">
                <div class="terminal-output">Welcome to Konsole v0.X.X-UNSTABLE\nType 'help' to get the list of avaible commands.\n\n</div>
                <div class="terminal-input-line">
                    <span class="terminal-prompt">wirenux@nox:~$ </span>
                    <input class="terminal-input" type="text" autocomplete="off" spellcheck="false" autofocus />
                </div>
            </div>
        `;
    },

    init(windowEl) {
        const wrapper = windowEl.querySelector('.terminal-wrapper');
        const output = windowEl.querySelector('.terminal-output');
        const input = windowEl.querySelector('.terminal-input');

        wrapper.addEventListener('click', () => input.focus());
        input.focus();

        function executeCommand(rawline) {
            
        }
    }
}