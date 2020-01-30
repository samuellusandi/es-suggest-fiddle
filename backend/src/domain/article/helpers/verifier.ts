const MAX_AUTHOR_LENGTH = 60;
const MAX_DOCUMENT_LENGTH = 10000;
const MAX_TITLE_LENGTH = 100;

const MIN_DOCUMENT_LENGTH = 50;
const MIN_TITLE_LENGTH = 5;

export function verifyContent(title: string, author: string, document: string): boolean {
    if (title.length < MIN_TITLE_LENGTH ||
        title.length > MAX_TITLE_LENGTH) {
        return false;
    }
    if (author.length < 1 ||
        author.length > MAX_AUTHOR_LENGTH) {
        return false;
    }
    return document.length >= MIN_DOCUMENT_LENGTH
        && document.length <= MAX_DOCUMENT_LENGTH;
}
