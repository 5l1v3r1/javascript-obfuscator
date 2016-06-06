"use strict";
const esprima = require('esprima');
const JavaScriptObfuscator_1 = require('../../JavaScriptObfuscator');
const AppendState_1 = require("../../enums/AppendState");
const JSFuck_1 = require("../../enums/JSFuck");
const NoCustomNodesPreset_1 = require("../../preset-options/NoCustomNodesPreset");
const Node_1 = require('../Node');
const NodeUtils_1 = require("../../NodeUtils");
const Utils_1 = require("../../Utils");
class UnicodeArrayDecodeNode extends Node_1.Node {
    constructor(unicodeArrayName, unicodeArray, options = {}) {
        super(options);
        this.appendState = AppendState_1.AppendState.AfterObfuscation;
        this.unicodeArrayName = unicodeArrayName;
        this.unicodeArray = unicodeArray;
        this.node = this.getNodeStructure();
    }
    appendNode(blockScopeNode) {
        NodeUtils_1.NodeUtils.insertNodeAtIndex(blockScopeNode.body, this.getNode(), 1);
    }
    getNode() {
        if (!this.unicodeArray.length) {
            return;
        }
        this.updateNode();
        return super.getNode();
    }
    getNodeStructure() {
        const environmentName = Utils_1.Utils.getRandomVariableName(), forLoopFunctionName = Utils_1.Utils.getRandomVariableName(), indexVariableName = Utils_1.Utils.getRandomVariableName(), tempArrayName = Utils_1.Utils.getRandomVariableName();
        let code = '', node;
        if (this.options['selfDefending']) {
            code = `
                var ${environmentName} = function(){return ${Utils_1.Utils.stringToUnicode('dev')};};
                   
                Function(${Utils_1.Utils.stringToUnicode(`return/\\w+ *\\(\\) *{\\w+ *['|"].+['|"];? *}/`)})()[${Utils_1.Utils.stringToUnicode('test')}](${environmentName}[${Utils_1.Utils.stringToUnicode('toString')}]()) !== ${JSFuck_1.JSFuck.True} && !${this.unicodeArrayName}++ ? []['filter']['constructor'](${Utils_1.Utils.stringToJSFuck('while')} + '(${JSFuck_1.JSFuck.True}){}')() : Function(${Utils_1.Utils.stringToUnicode('a')}, atob(${Utils_1.Utils.stringToUnicode(Utils_1.Utils.btoa('a()'))}))(${forLoopFunctionName}) ? []['filter']['constructor'](${Utils_1.Utils.stringToJSFuck('while')} + '(${JSFuck_1.JSFuck.False}){}')() : []['filter']['constructor'](${Utils_1.Utils.stringToJSFuck('while')} + '(${JSFuck_1.JSFuck.False}){}')();
            `;
        }
        else {
            code = `${forLoopFunctionName}();`;
        }
        node = esprima.parse(`
            (function () {
                ${JavaScriptObfuscator_1.JavaScriptObfuscator.obfuscate(`
                    (function () {
                        var object = []['filter']['constructor']('return this')();
                        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            
                        object.atob || (
                            object.atob = function(input) {
                                var str = String(input).replace(/=+$/, '');
                                for (
                                    var bc = 0, bs, buffer, idx = 0, output = '';
                                    buffer = str.charAt(idx++);
                                    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
                                        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
                                ) {
                                    buffer = chars.indexOf(buffer);
                                }
                            return output;
                        });
                    })();
                `, NoCustomNodesPreset_1.NO_CUSTOM_NODES_PRESET)}
              
                var ${forLoopFunctionName} = function () {
                    var ${tempArrayName} = [];
                    
                    for (var ${indexVariableName} in ${this.unicodeArrayName}) {
                        ${tempArrayName}[${Utils_1.Utils.stringToUnicode('push')}](decodeURI(atob(${this.unicodeArrayName}[${indexVariableName}])));
                    }
                    
                    ${this.unicodeArrayName} = ${tempArrayName};
                };
                
                ${code}
            })();
        `);
        NodeUtils_1.NodeUtils.addXVerbatimPropertyToLiterals(node);
        return NodeUtils_1.NodeUtils.getBlockScopeNodeByIndex(node);
    }
}
exports.UnicodeArrayDecodeNode = UnicodeArrayDecodeNode;