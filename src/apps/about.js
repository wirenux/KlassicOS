import kLogo from '../assets/klogo-classic.svg';

export const AboutApp = {
    title: 'System Info', 
    contentBgColor: '#D6CEB9',

    render() {
        return `
            <div style="font-family: 'departureMono'; font-size: 13px; color: #000; padding: 4px; display: flex; flex-direction: column; gap: 12px;">
                
                <div style="display: flex; gap: 16px; align-items: center;">
                    <img 
                        src="${kLogo}" 
                        alt="KDE Logo" 
                        style="width: 48px; height: 48px; display: block; image-rendering: pixelated; image-rendering: crisp-edges; user-select: none;" 
                        draggable="false"
                    />
                    <div>
                        <h3 style="margin: 0 0 4px 0; font-size: 15px; font-weight: bold;">KlassicOS v0.1-dev</h3>
                        <p style="margin: 0 0 6px 0;">Recreated by: <strong>Louis Lesniak (wirenux)</strong></p>
                        <a href="https://github.com/wirenux/klassicos" target="_blank" rel="noopener noreferrer" style="color: #000080; text-decoration: underline; font-weight: bold;">
                            GitHub Repository
                        </a>
                    </div>
                </div>

                <div style="border-top: 2px solid #7b776b; border-bottom: 2px solid #eaeaea; height: 0; margin: 2px 0;"></div>

                <div>
                    <span style="font-weight: bold; display: block; margin-bottom: 6px; color: #000080;">System Specifications:</span>
                    <table style="font-family: 'departureMono'; font-size: 12px; border-collapse: collapse; width: 100%; line-height: 1.4;">
                        <tr>
                            <td style="padding: 2px 0; width: 90px; color: #555555; user-select: none;">Processor:</td>
                            <td style="padding: 2px 0; font-weight: bold;">Retro Matrix Core @ 4.77 MHz</td>
                        </tr>
                        <tr>
                            <td style="padding: 2px 0; color: #555555; user-select: none;">Memory:</td>
                            <td style="padding: 2px 0; font-weight: bold;">640 KB Base (Fully Optimised)</td>
                        </tr>
                        <tr>
                            <td style="padding: 2px 0; color: #555555; user-select: none;">Base System:</td>
                            <td style="padding: 2px 0; font-weight: bold;">Nox Kernel Environment v0.9-STABLE</td>
                        </tr>
                        <tr>
                            <td style="padding: 2px 0; color: #555555; user-select: none;">Windowing:</td>
                            <td style="padding: 2px 0; font-weight: bold;">KDE Suite Component Layer (Vite + JS)</td>
                        </tr>
                    </table>
                </div>

            </div>
        `;
    },

    init(windowEl) {
        // static app
    }
      
}