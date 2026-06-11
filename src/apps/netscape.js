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
        `;
    },

    init(windowEl) {
        // static app
    }
      
}