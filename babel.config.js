module.exports = {
	plugins: [
		[
			"module-resolver",
			{
				root: ["."],
				alias: {
					"@component": "./src/component",
					"@container": "./src/container",
					"@src": "./src",
					"@store": "./src/store",
				},
				extensions: [".js", "jsx", ".ts", ".tsx",]
			}
		],
	],
	presets: ['module:@react-native/babel-preset'],
}
