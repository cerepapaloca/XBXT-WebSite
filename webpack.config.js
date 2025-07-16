module.exports = {
    module: {
        rules: [
            {
                test: /\.(jpg|jpeg|png|gif|webp)$/i, // AÑADE webp
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]'
                }
            },
        ],
    },
};