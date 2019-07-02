module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        // 禁止使用console
        'no-console': 0,
        // 使用 === 替代 ==
        "eqeqeq": [2, "allow-null"],
        //引号类型 `` "" ''
        "quotes": [2, "single"],
        //语句强制分号结尾
        "semi": [2, "always"],
    }
};