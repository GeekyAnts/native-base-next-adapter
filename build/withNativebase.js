"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
function withNativebase(_a) {
    var _b = _a.plugin, plugin = _b === void 0 ? [] : _b, _c = _a.nextConfig, nextConfig = _c === void 0 ? {} : _c, _d = _a.phase, phase = _d === void 0 ? [] : _d;
    // const { webpack, ...config } = nextConfig;
    var dependencies = [
        "native-base",
        "react-native-svg",
        "react-native-web",
        "react-native-safe-area-context",
        "@react-aria/visually-hidden",
        "@react-native-aria/button",
        "@react-native-aria/checkbox",
        "@react-native-aria/combobox",
        "@react-native-aria/focus",
        "@react-native-aria/interactions",
        "@react-native-aria/listbox",
        "@react-native-aria/overlays",
        "@react-native-aria/radio",
        "@react-native-aria/slider",
        "@react-native-aria/tabs",
        "@react-native-aria/utils",
        "@react-stately/combobox",
        "@react-stately/radio",
        "@native-base/next-adapter",
    ];
    if (plugin[0] !== undefined) {
        dependencies = __spreadArray(__spreadArray([], dependencies, true), plugin[0], true);
    }
    var withPlugins = require("next-compose-plugins");
    var withFonts = require("next-fonts");
    var withTM = require("next-transpile-modules")(dependencies);
    return withPlugins(__spreadArray([
        withTM,
        [withFonts, { projectRoot: __dirname }]
    ], plugin, true), __assign({ webpack: function (config, options) {
            config.resolve.alias = __assign(__assign({}, (config.resolve.alias || {})), { 
                // Transform all direct `react-native` imports to `react-native-web`
                "react-native$": "react-native-web" });
            config.resolve.extensions = __spreadArray([
                ".web.js",
                ".web.ts",
                ".web.tsx"
            ], config.resolve.extensions, true);
            return config;
        } }, nextConfig), __spreadArray([], phase, true));
}
exports["default"] = withNativebase;
//# sourceMappingURL=withNativebase.js.map