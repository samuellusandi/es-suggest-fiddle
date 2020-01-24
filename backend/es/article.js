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
                        },
                        filter: {
                            shingle: {
                                type: 'shingle',
                                min_shingle_size: 2,
                                max_shingle_size: 3,
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
                    type: 'search_as_you_type',
                },
                createdAt: { type: 'date' },
                updatedAt: { type: 'date' },
            },
        },
    },
}
