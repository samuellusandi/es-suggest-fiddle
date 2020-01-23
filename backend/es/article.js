module.exports = {
    settings: {
        index: 'articles',
        body: {
            settings: {
                index: {
                    number_of_shards: 1,
                    analysis: {
                        analyzer: {
                            trigram: {
                                type: 'custom',
                                tokenizer: 'standard',
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
                            analyzer: 'trigram',
                        },
                        raw: {
                            type: 'keyword',
                        },
                    }
                },
                createdAt: { type: 'date' },
                updatedAt: { type: 'date' },
            },
        },
    },
}
