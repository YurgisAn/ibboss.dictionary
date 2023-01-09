const createRemoteFederationConfig = require('@vtb-ermo/webpack-config').createRemoteFederationConfig;
const path = require('path');
const merge = require('webpack-merge').merge;

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const ContextReplacementPlugin = require('webpack').ContextReplacementPlugin;
const DefinePlugin = require('webpack').DefinePlugin;
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

const remoteAppConfig = require('./remote.config.json');
const supportedLocales = ['en-US', 'ru'];

const isBundleAnalyser = process.env.BUNDLE_ANALYSER;
const isDevMode = process.env.NODE_ENV === 'development';
const hostAppConfig = isDevMode ? require('./host.local.config.json') : require('./host.config.json');

const cicdContour = hostAppConfig.cicd_contour || 'local';
const publicPath = hostAppConfig.public_path || '';
const apiPath = hostAppConfig.api_path;


/* Basic configuration */
const config = {
    target: ['web', 'es5'],
    mode: isDevMode ? 'development' : 'production',
    entry: [
        'core-js/stable',
        './src/index.tsx',
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle-[hash].js',
        publicPath: `${publicPath}/`,
        globalObject: 'this'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
            '~': path.resolve(__dirname, 'src'),
        },
    },
    optimization: {
        usedExports: true,
    },
    devServer: {
        port: 3001,
        hot: true,
        transportMode: 'ws',
        historyApiFallback: true,
    },
    devtool: isDevMode ? 'source-map' : false,
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    targets: { ie: 11 },
                                },
                            ],
                            '@babel/preset-react',
                            '@babel/preset-typescript',
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-transform-classes',
                            '@babel/plugin-transform-runtime',
                        ],
                    },
                },
                include: [
                    path.resolve('src'),
                ],
            },
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '/',
                        },
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(svg)$/,
                use: ['@svgr/webpack', 'url-loader'],
            },
            {
                test: /\.(png|gif|jpg)$/,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        isBundleAnalyser ? new BundleAnalyzerPlugin() : false,
        new MiniCssExtractPlugin({
            filename: 'style-[hash].css',
        }),
        new ContextReplacementPlugin(
            /date\-fns[\/\\]/,
            new RegExp(`[/\\\\\](${supportedLocales.join('|')})[/\\\\\]index\.js$`),
        ),
        new DefinePlugin({
            PUBLIC_PATH: `'${publicPath}'`,
            API_PATH: `'${apiPath}'`,
            CICD_CONTOUR: `'${cicdContour}'`,
            'process.env.CICD_CONTOUR': JSON.stringify(cicdContour),
            REDIRECT_CONFIG: `'${JSON.stringify(hostAppConfig.redirect)}'`,
        }),
        new HTMLWebpackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.ico',
        }),
        new CleanWebpackPlugin(),
        new NodePolyfillPlugin(),
    ].filter(Boolean),
};

/* Module federation configuration */
const federationConfig = !isDevMode ? createRemoteFederationConfig(remoteAppConfig) : [];

module.exports = merge([config, federationConfig]);
