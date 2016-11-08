module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "node": true,
        "jquery": true
    },
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "indent": [0,4, { "SwitchCase": 1 }],
        "react/jsx-indent": [2, 4],
        "react/jsx-indent-props": [2, 4],
        "max-len": ["error", 99999],
        "jsx-a11y/aria-props": "off",
    },
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ]
};