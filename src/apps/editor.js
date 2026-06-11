export const EditorApp = {
    title: 'KWrite Text Editor', 
    contentBgColor: '#ffffff',

    render() {
        return `
            <textarea style="width: 99%; height: 97%; border: none; resize: none; font-family: \'departureMono\'; outline: none;" placeholder="Type text here..."></textarea>
        `;
    },

    init(windowEl) {
        const textarea = windowEl.querySelector('textarea');
        textarea.focus();
    }
      
}