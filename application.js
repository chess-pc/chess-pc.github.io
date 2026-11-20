System.register([], function (_export, _context) {
  "use strict";

  var cc, Application;
  function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  return {
    setters: [],
    execute: function () {
      _export("Application", Application = /*#__PURE__*/function () {
        function Application() {
          _classCallCheck(this, Application);
          this.settingsPath = 'src/settings.json';
          this.showFPS = false;
        }
        _createClass(Application, [{
          key: "init",
          value: function init(engine) {
            cc = engine;
            cc.game.onPostBaseInitDelegate.add(this.onPostInitBase.bind(this));
            cc.game.onPostSubsystemInitDelegate.add(this.onPostSystemInit.bind(this));
            function onStartupSceneLaunched(scene) {
              if (scene.name === 'Login' || scene.name === 'Hall') {
                cc.director.off(cc.Director.EVENT_AFTER_SCENE_LAUNCH, onStartupSceneLaunched);
                cc.director.once(cc.Director.EVENT_AFTER_DRAW, function () {
                  document.getElementById('StartupLoading').remove();
                });
              }
            }
            cc.director.on(cc.Director.EVENT_AFTER_SCENE_LAUNCH, onStartupSceneLaunched);
          }
        }, {
          key: "onPostInitBase",
          value: function onPostInitBase() {
            cc.settings.overrideSettings('screen', 'exactFitScreen', true);
            cc.settings.overrideSettings('splashScreen', 'totalTime', 0);
          }
        }, {
          key: "onPostSystemInit",
          value: function onPostSystemInit() {
            var design = cc.view.getDesignResolutionSize();
            var designWidth = design.width;
            var designHeight = design.height;
            function adaptToWindow() {
              var size = cc.screen.windowSize;
              if (size.width > 0 && size.height > 0) {
                // 取较小缩放比例，另一方向扩展可见区域，不裁切或拉伸 UI。
                var policy = size.width * designHeight >= size.height * designWidth ? cc.ResolutionPolicy.FIXED_HEIGHT : cc.ResolutionPolicy.FIXED_WIDTH;
                cc.view.setDesignResolutionSize(designWidth, designHeight, policy);
              }
            }
            cc.screen.on('window-resize', adaptToWindow);
            cc.screen.on('fullscreen-change', adaptToWindow);
            adaptToWindow();
          }
        }, {
          key: "start",
          value: function start() {
            return cc.game.init({
              debugMode: false ? cc.DebugMode.INFO : cc.DebugMode.ERROR,
              settingsPath: this.settingsPath,
              overrideSettings: {
                profiling: {
                  showFPS: this.showFPS
                }
              }
            }).then(function () {
              return cc.game.run();
            });
          }
        }]);
        return Application;
      }());
    }
  };
});