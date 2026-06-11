export const AboutApp = {
    title: 'System Info', 
    contentBgColor: '#D6CEB9',

    render() {
        return `
            <div style="font-family: \'departureMono\'; font-size: 13px; color: #000;"><h3 style="margin-top:0;">KlassicOS v?.? dev</h3><p>A retro webOS copying the KDE 1 style</p><p>Running with Vite + Vanilla JS</p></div>
        `;
    },

    init(windowEl) {
        // static app
    }
      
}