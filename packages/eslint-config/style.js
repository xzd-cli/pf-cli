module.exports = {
	extends: [
			'stylelint-config-standard',
			'stylelint-config-rational-order',
			'stylelint-config-prettier',
	],
	plugins: [
			'stylelint-scss',
			'stylelint-order',
			'stylelint-declaration-block-no-ignored-properties',
	],
	rules: {
			'at-rule-no-unknown': [true, {
					ignoreAtRules: ['extend', 'at-root', 'debug', 'warn', 'error', 'if', 'else', 'for', 'each', 'while', 'mixin', 'include', 'content', 'return', 'function']
			}],
			'color-hex-case': null,
			//https://github.com/stylelint/stylelint/issues/4114
			'function-calc-no-invalid': null,
			'font-family-no-missing-generic-family-keyword': null, // iconfont
			'property-no-unknown': [true, {
					'ignoreProperties': [
							'composes',
					],
			}],
			'plugin/declaration-block-no-ignored-properties': true,
			'selector-pseudo-class-no-unknown': [true, {
					'ignorePseudoClasses': [
							'export',
							'import',
							'global',
							'local',
					],
			}],
	},
	ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
};
