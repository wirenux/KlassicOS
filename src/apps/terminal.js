import '../terminal.css'

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
            const line = rawline.trim();
            if (!line) {
                return ''; 
            }

            const args = line.split(/\s+/);
            const command = args[0].toLowerCase();

            switch (command) {
                case 'help':
                    return `Available shell utilities:\n  help      - Spits out this structural command matrix\n  clear     - Flushes the terminal output viewport buffer\n  whoami    - Returns current session user handle\n  sysinfo   - Queries system environment architecture layout\n  ls        - Lists current directory workspace files\n  cat [file]- Concenates and reads out text file node streams`;
                
                case 'clear':
                    output.innerHTML = '';
                    return null;

                case 'whoami':
                    return `wirenux`;

                case 'ls':
                    return Object.keys(VFS).join('    ');
                
                case 'cat':
                    const filename = args[1];
                    if (!filename) {
                        return `cat: error: missing file argument payload target`;
                    }

                    if (!VFS[filename]) {
                        return `cat: ${filename}: No such file or directory`;
                    }

                    return VFS[filename];

                case 'sysinfo':
                    return `
M'''''''\`YM                  
M  mmmm.  M                   
M  MMMMM  M .d8888b. dP.  .dP 
M  MMMMM  M 88'  \`88  \`8bd8\'
M  MMMMM  M 88.  .88  .d88b.
M  MMMMM  M \`88888P\' dP'  \`dP
MMMMMMMMMMM
https://github.com/wirenux/nox (˶ᵔ ᵕ ᵔ˶)

Host: Nox Kernel x86_64 v1.0
Uptime: XX minutes
Shell: bash-mimic v0.9
WM: Custom Retro KDE-Suite
CPU: Virtualized Retro Matrix Core @ 4.77 MHz
Memory: 640 KB Base (Fully Optimised)
                    `;

                default:
                    return `bash: command not found: ${command}. Type 'help' for manual context rules.`;
            }
        }

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const commandLine = input.value;

                const promptSpan = `<span class="terminal-prompt-echo">wirenux@nox:~$ </span> ${escapeHTML(commandLine)}\n`;
                output.innerHTML += promptSpan;

                const result = executeCommand(commandLine);

                if (result !== null) {
                    output.innerHTML += result + '\n';
                }

                input.value = '';

                const contentContainer = windowEl.querySelector('.kde-window-content');
                if (contentContainer) {
                    contentContainer.scrollTop = contentContainer.scrollHeight;
                }
            }
        });

        function escapeHTML(str) {
            return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
    }
}