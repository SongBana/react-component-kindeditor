'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('./utils');

require('kindeditor/kindeditor-all-min.js');

require('kindeditor/themes/default/default.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/******************************
 * Created by lv on 2017/11/15.
 *
 * 自定义react组件
 ******************************/


var KindEditorReactComponent = function (_React$Component) {
    _inherits(KindEditorReactComponent, _React$Component);

    function KindEditorReactComponent(props) {
        _classCallCheck(this, KindEditorReactComponent);

        var _this = _possibleConstructorReturn(this, (KindEditorReactComponent.__proto__ || Object.getPrototypeOf(KindEditorReactComponent)).call(this, props));

        var value = _this.props.contents || "";

        _this.state = {
            id: (0, _utils.Guid)(),
            content: value
        };
        return _this;
    }

    _createClass(KindEditorReactComponent, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.initEditor();
            //this.setState({content: this.props.contents})
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            // 组件卸载后，清除放入库的id
            this.setState({ content: '', id: '' });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            //console.log(nextProps)
            var content = nextProps.content;

            var oldContent = this.editor.html();
            if (oldContent !== content) {
                this.setState({ content: content });
                this.editor.html(content);
            }
        }
    }, {
        key: 'getItems',
        value: function getItems() {
            var defaultItems = ['source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'code', 'cut', 'copy', 'paste', 'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript', 'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/', 'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', /*'multiimage',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     'flash', 'media', 'insertfile',*/'table', 'hr', 'emoticons', 'baidumap', 'pagebreak', 'anchor', 'link', 'unlink', '|', 'about'];
            return this.props.items || defaultItems;
        }
    }, {
        key: 'getHtmlTags',
        value: function getHtmlTags() {
            var defaultTags = {
                font: ['color', 'size', 'face', '.background-color'],
                span: ['style'],
                div: ['class', 'align', 'style'],
                table: ['class', 'border', 'cellspacing', 'cellpadding', 'width', 'height', 'align', 'style'],
                'td,th': ['class', 'align', 'valign', 'width', 'height', 'colspan', 'rowspan', 'bgcolor', 'style'],
                a: ['class', 'href', 'target', 'name', 'style'],
                embed: ['src', 'width', 'height', 'type', 'loop', 'autostart', 'quality', 'style', 'align', 'allowscriptaccess', '/'],
                img: ['src', 'width', 'height', 'border', 'alt', 'title', 'align', 'style', '/'],
                hr: ['class', '/'],
                br: ['/'],
                'p,ol,ul,li,blockquote,h1,h2,h3,h4,h5,h6': ['align', 'style'],
                'tbody,tr,strong,b,sub,sup,em,i,u,strike': []
            };
            return _extends({}, defaultTags, this.props.htmlTags);
        }
    }, {
        key: 'initEditor',
        value: function initEditor() {
            var props = this.props;
            var that = this;
            this.editor = window.KindEditor.create('#' + this.state.id, {
                width: 800,
                height: 600,
                minWidth: props.minWidth || 650,
                minHeight: props.minHeight || 100,
                items: this.getItems(),
                noDisableItems: props.noDisableItems || ['source', 'fullscreen'],
                filterMode: props.filterMode || true,
                htmlTags: this.getHtmlTags(),
                wellFormatMode: props.wellFormatMode || true,
                resizeType: props.resizeType || 2,
                themeType: props.themeType || 'default',
                langType: props.langType || 'zh-CN',
                designMode: props.designMode || true,
                fullscreenMode: props.fullscreenMode || false,
                basePath: props.basePath || '',
                themesPath: props.cssPath,
                pluginsPath: props.pluginsPath || '/static/kindeditor/plugins/',
                langPath: props.langPath || '',
                minChangeSize: props.minChangeSize || 5,
                loadStyleMode: props.loadStyleMode || true,
                urlType: props.urlType || '',
                newlineTag: props.newlineTag || 'p',
                pasteType: props.pasteType || 2,
                dialogAlignType: props.dialogAlignType || 'page',
                shadowMode: props.shadowMode || true,
                zIndex: props.zIndex || 811213,
                useContextmenu: props.useContextmenu || true,
                syncType: props.syncType || 'form',
                indentChar: props.indentChar || '\t',
                cssPath: props.cssPath,
                cssData: props.cssData,
                bodyClass: props.bodyClass || 'ke-content',
                colorTable: props.colorTable,
                afterCreate: props.afterCreate,
                afterChange: function afterChange() {
                    //  this.afterChange
                    that.props.onChange(this.html());
                },
                afterTab: props.afterTab,
                afterFocus: props.afterFocus,
                afterBlur: props.afterBlur,
                afterUpload: props.afterUpload,
                uploadJson: props.uploadJson,
                fileManagerJson: props.fileManagerJson,
                allowPreviewEmoticons: props.allowPreviewEmoticons || true,
                allowImageUpload: props.allowImageUpload || false,
                allowFlashUpload: props.allowFlashUpload || false,
                allowMediaUpload: props.allowMediaUpload || true,
                allowFileUpload: props.allowFileUpload || false,
                allowFileManager: props.allowFileManager || false,
                fontSizeTable: props.fontSizeTable || ['9px', '10px', '12px', '14px', '16px', '18px', '24px', '32px'],
                imageTabIndex: props.imageTabIndex || 0,
                formatUploadUrl: props.formatUploadUrl || true,
                fullscreenShortcut: props.fullscreenShortcut || false,
                extraFileUploadParams: props.extraFileUploadParams || [],
                filePostName: props.filePostName || 'file',
                fillDescAfterUploadImage: props.fillDescAfterUploadImage || false,
                afterSelectFile: props.afterSelectFile,
                pagebreakHtml: props.pagebreakHtml || '<hr style=”page-break-after: always;” class=”ke-pagebreak” />',
                allowImageRemote: props.allowImageRemote || false,
                autoHeightMode: props.autoHeightMode || false,
                fixToolBar: props.fixToolBar || true,
                tabIndex: props.tabIndex
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'kindeditor' },
                _react2.default.createElement('textarea', {
                    id: this.state.id,
                    name: 'content',
                    ref: 'textarea',
                    value: this.state.content
                })
            );
        }
    }]);

    return KindEditorReactComponent;
}(_react2.default.Component);

KindEditorReactComponent.propTypes = {
    contents: _propTypes2.default.string,
    onChange: _propTypes2.default.func
};

exports.default = KindEditorReactComponent;
//# sourceMappingURL=MyReactComponent.js.map
