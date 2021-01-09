const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const IS_PROD = process.env.NODE_ENV === 'production'
const IS_DEV = !IS_PROD

const createFilename = (ext) => (IS_DEV ? `bundle.${ext}` : `bundle.[hash].${ext}`)

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    target: 'web',
    entry: ['@babel/polyfill', './index.ts'],
    output: {
        filename: createFilename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.ts', 'json', '.js', '.css', '.scss'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'core')
        }
    },
    devtool: IS_DEV ? 'source-map' : false,
    devServer: {
        contentBase: path.join(__dirname, 'src/'),
        port: 3000,
        hot: IS_DEV
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: '../public/index.html',
            minify: {
                removeComments: IS_PROD,
                collapseWhitespace: IS_PROD
            }
        }),
        new MiniCssExtractPlugin({
            filename: createFilename('css')
        }),
        // TODO disabled for dev
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets'),
                    to: path.resolve(__dirname, 'dist/assets')
                }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: ''
                        }
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                // type: 'asset/resource'
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.m?js$|\.m?ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-typescript', '@babel/preset-env'],
                            plugins: [
                                [
                                    '@babel/plugin-transform-typescript', // TODO
                                    {
                                        strictMode: true
                                    }
                                ],
                                '@babel/plugin-proposal-class-properties'
                            ]
                        }
                    },
                    'eslint-loader'
                ]
            }
        ]
    }
}
