import '../netscape.css'

export const BrowserApp = {
    title: 'Netscape - [Version X.0-XXXXX]', 
    contentBgColor: '#C8C8C8',

    render() {
        return `
            <div id="option-bar">
                <button class="option-bar-btn">File</button>
                <button class="option-bar-btn">Edit</button>
                <button class="option-bar-btn">View</button>
                <button class="option-bar-btn">Go</button>
                <button class="option-bar-btn">Bookmarks</button>
                <button class="option-bar-btn">Options</button>
                <button class="option-bar-btn">Directory</button>
                <button class="option-bar-btn">Window</button>
                <button class="option-bar-btn">Help</button>
            </div>

            <hr />

            <div class="toolbar-wrapper">
                <div class="toolbar-left-column">
                    <div id="control-bar">
                        <button class="control-btn"><span class="icon control-back-arrow"></span></button>
                        <button class="control-btn"><span class="icon control-front-arrow"></span></button>
                        <button class="control-btn"><span class="icon control-home"></span></button>
                        <button class="control-btn"><span class="icon control-refresh"></span></button>
                        <button class="control-btn"><span class="icon control-print"></span></button>
                        <button class="control-btn"><span class="icon control-search"></span></button>
                    </div>
                    <hr class="toolbar-divider" />
                    <div id="address-bar">
                        <p>Location:</p>
                        <div class="address-input-container">
                            <input class="address-input" />
                            <button class="address-drop-btn"></button>
                        </div>
                    </div>
                </div>
                
                <div class="toolbar-right-column">
                    <button class="netscape-throbber"></button>
                </div>
            </div>

            <div id="address-btn-bar">
                <button class="address-btn">What's New ?</button>
                <button class="address-btn">What's Cool ?</button>
                <button class="address-btn">Destination</button>
                <button class="address-btn">Net Search</button>
                <button class="address-btn">People</button>
                <button class="address-btn">Software</button>
            </div>

            <div class="browser-viewport">
                <iframe src="about:blank" class="browser-iframe"></iframe>
            </div>
        `;
    },

    init(windowEl) {
        const addressInput = windowEl.querySelector('.address-input');
        const iframe = windowEl.querySelector('.browser-iframe');
        const homeBtn = windowEl.querySelector('.control-home');
        const refreshBtn = windowEl.querySelector('.control-refresh');

        function navigateTo(url) {
            if (!url.trim()) {
                return;
            }

            let targetUrl = url.trim();
            if (!/^https?:\/\//i.test(targetUrl)) {
                targetUrl = 'https://' + targetUrl;
            }

            const iframeProxy = "https://corsproxy.io/?url=";

            iframe.src = iframeProxy + encodeURIComponent(targetUrl);
            addressInput.value = targetUrl;
        }

        addressInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                navigateTo(addressInput.value);
            }
        });

        if (homeBtn) {
            homeBtn.addEventListener('click', () => {
                navigateTo('duckduckgo.com');
            })
        }

        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                iframe.src = iframe.src;
            })
        }
    }
}