"use strict";
const root = require('./helpers.js').root;
const ip = require('ip');
const webpack = require('webpack');

exports.HOST = ip.address();
exports.DEV_PORT = 3000;
exports.E2E_PORT = 4201;
exports.PROD_PORT = 8088;

/**
 * These constants set whether or not you will use proxy for Webpack DevServer
 * For advanced configuration details, go to:
 * https://webpack.github.io/docs/webpack-dev-server.html#proxy
 */
exports.USE_DEV_SERVER_PROXY = false;
exports.DEV_SERVER_PROXY_CONFIG = {
	'**': 'http://localhost:8089'
}

/**
 * These constants set the source maps that will be used on build.
 * For info on source map options, go to:
 * https://webpack.github.io/docs/configuration.html#devtool
 */
exports.DEV_SOURCE_MAPS = 'eval';
exports.PROD_SOURCE_MAPS = 'source-map';

/**
 * Set watch options for Dev Server. For better HMR performance, you can
 * try setting poll to 1000 or as low as 300 and set aggregateTimeout to as low as 0.
 * These settings will effect CPU usage, so optimal setting will depend on your dev environment.
 * https://github.com/webpack/docs/wiki/webpack-dev-middleware#watchoptionsaggregatetimeout
 */
exports.DEV_SERVER_WATCH_OPTIONS = {
	poll: 1000,
	aggregateTimeout: 1000,
	ignored: /node_modules/
}

/**
 * specifies which @ngrx dev tools will be available when you build and load
 * your app in dev mode. Options are: monitor | logger | both | none
 */
exports.STORE_DEV_TOOLS = 'monitor'

exports.EXCLUDE_SOURCE_MAPS = [
	// these packages have problems with their sourcemaps
	root('node_modules/@angular'),
	root('node_modules/rxjs')
]

exports.MY_COPY_FOLDERS = [
	// use this for folders you want to be copied in to Client dist
	// src/assets and index.html are already copied by default.
	// format is { from: 'folder_name', to: 'folder_name' }
	//   {from: 'build/contracts', to: 'assets/contracts'}
]

exports.MY_POLYFILL_DLLS = [
	// list polyfills that you want to be included in your dlls files
	// this will speed up initial dev server build and incremental builds.
	// Be sure to run `npm run build:dll` if you make changes to this array.
]

exports.MY_VENDOR_DLLS = [
	// list vendors that you want to be included in your dlls files
	// this will speed up initial dev server build and incremental builds.
	// Be sure to run `npm run build:dll` if you make changes to this array.
	'ngx-file-drop'
]

exports.MY_CLIENT_PLUGINS = [
	// use this to import your own webpack config Client plugins.

	new webpack.ProvidePlugin({
		$: "jquery",
		jQuery: "jquery"
	})
]

exports.MY_CLIENT_PRODUCTION_PLUGINS = [
	// use this to import your own webpack config plugins for production use.
]

exports.MY_CLIENT_RULES = [
	// use this to import your own rules for Client webpack config.
]

exports.MY_TEST_RULES = [
	// use this to import your own rules for Test webpack config.
]

exports.MY_TEST_PLUGINS = [
	// use this to import your own Test webpack config plugins.
]


exports.DEV_ENVIRONMENT = {
	'networkId': 488413,
	'tokenAddress': '0xa724a61f4b46d549fd67f5e5d4c441d950b85c43',
	'rpcProviderUrl': 'https://rpcprovider.staging.bankex.team:8635',
	'websocketProviderUrl': 'wss://wsprovider.staging.bankex.team:8636',
	'apiUrl': 'https://opencharity.staging.bankex.team/api/',
	'organizations': [
		'0x0Edd482B0D1177a197EfEd715428e54852453219',
		'0xe86Ec436401C9d853aB260C6a25273d4537645aD',
		'0x4c35a12eE22b428C3D45249b461Caf323680B949'

	]
};

exports.STAGING_ENVIRONMENT = {
	'networkId': 488413,
	'tokenAddress': '0xa724a61f4b46d549fd67f5e5d4c441d950b85c43',
	'rpcProviderUrl': 'https://rpcprovider.staging.bankex.team:8635',
	'websocketProviderUrl': 'wss://wsprovider.staging.bankex.team:8636',
	'apiUrl': 'https://opencharity.staging.bankex.team/api/',
	'organizations': [
		'0x0Edd482B0D1177a197EfEd715428e54852453219',
		'0xe86Ec436401C9d853aB260C6a25273d4537645aD',
		'0x4c35a12eE22b428C3D45249b461Caf323680B949'
	]
};

exports.PROD_ENVIRONMENT = {
	'networkId': 488423,
	'tokenAddress': '0x7487a0251a0701a89cade302679b1d01c3d8a44f',
	'rpcProviderUrl': 'https://rpcprovider.opencharity.bankex.team:8635',
	'websocketProviderUrl': 'wss://wsprovider.opencharity.bankex.team:8636',
	'apiUrl': 'https://opencharity.bankex.team/api/',
	'organizations': [
		'0x3efbEe62f4132073382cF273D78D77DFea317c2b',
		'0x9d53eB998289631F9663fe1BC3F0307589903C09',
		'0x1A6Cc32EDB9230D0aC1c842D8baF69c97F00a1AC'
	]
};
