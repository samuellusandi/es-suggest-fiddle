module.exports = {
    settings: {
        index: 'articles',
        body: {
            settings: {
                index: {
                    number_of_shards: 1,
                    max_ngram_diff: 18,
                    analysis: {
                        analyzer: {
                            title_analyzer: {
                                type: 'custom',
                                tokenizer: 'standard',
                                token_chars: [
                                   'letter',
                                   'digit',
                                ],
                                filter: [
                                    'lowercase',
                                    'shingle',
                                ],
                            },
                            autocomplete: {
                                type: 'custom',
                                tokenizer: 'whitespace',
                                filter: [
                                    'lowercase',
                                    'asciifolding',
                                    'nGramFilter',
                                ],
                            },
                        },
                        filter: {
                            shingle: {
                                type: 'shingle',
                                min_shingle_size: 2,
                                max_shingle_size: 3,
                            },
                            nGramFilter: {
                                type: 'nGram',
                                min_gram: 2,
                                max_gram: 20,
                                token_chars: [
                                    'letter',
                                    'digit',
                                ],
                            },
                        },
                    },
                },
            },
        },
    },

    mappings: {
        index: 'articles',
        body: {
            properties: {
                id: { type: 'keyword' },
                author: { type: 'text' },
                document: { type: 'text' },
                title: {
                    type: 'text',
                    fields: {
                        suggest: {
                            type: 'text',
                            analyzer: 'title_analyzer',
                        },
                        raw: {
                            type: 'keyword',
                        },
                    }
                },
                titleCompletion: {
                    type: 'completion',
                    analyzer: 'autocomplete',
                },
                createdAt: { type: 'date' },
                updatedAt: { type: 'date' },
            },
        },
    },
}
