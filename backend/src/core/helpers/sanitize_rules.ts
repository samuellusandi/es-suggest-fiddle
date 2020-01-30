export const noHtmlRule = {
    allowedTags: [],
    disallowedTagsMode: 'escape',
};

export const allowCleanTagsRule = {
    allowedAttributes: {
        a: [ 'href' ],
        img: [ 'src' ],
    },
    allowedIframeHostnames: [
        'youtube.com',
    ],
    allowedTags: [
        'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol', 'u',
        'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
        'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe' ,
    ],
    disallowedTagsMode: 'escape',
};
