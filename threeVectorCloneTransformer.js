"use strict";
/*
 * This file is licensed under the MIT License.
 * Copyright 2020 twinkfrag
 * Repository: https://github.com/twinkfrag/three-vector-auto-clone
 */
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var ts = require("typescript");
// "import(*)"を除いたTypeName
var regex_typename = new RegExp(/^(?:import\(.*?\)\.)?(.*)$/);
// エントリーポイントより外側(node_modules等)を除外
var regex_filename = new RegExp(/^(?!\.{2}).*/);
var requireCloneClasses = [
    "THREE.Vector2",
    "THREE.Vector3",
    "THREE.Vector4",
];
// setXXを除いた，thisを返すメンバを指定
var requireCloneMembers = [
    "add",
    "addScalar",
    "addScaledVector",
    "addVectors",
    "sub",
    "subScalar",
    "subVectors",
    "multiply",
    "multiplyScalar",
    "multiplyVectors",
    "divide",
    "divideScalar",
    "applyEuler",
    "applyAxisAngle",
    "applyMatrix3",
    "applyNormalMatrix",
    "applyMatrix4",
    "applyQuaternion",
    "project",
    "unproject",
    "transformDirection",
    "min",
    "max",
    "clamp",
    "clampScalar",
    "clampLength",
    "floor",
    "ceil",
    "round",
    "roundToZero",
    "negate",
    "normalize",
    "lerp",
    "lerpVectors",
    "rotateAround",
    "cross",
    "crossVectors",
    "projectOnVector",
    "projectOnPlane",
    "reflect",
];
var transformerFactory = function (program) {
    return function (context) {
        var checker = program.getTypeChecker();
        var visitor = function (node) {
            // 現在処理中のsourceFileを取るがundefinedなことがある
            var sourceFile = node.getSourceFile();
            if (sourceFile && regex_filename.test(path.relative(program.getCurrentDirectory(), sourceFile.fileName))) {
                if (ts.isPropertyAccessExpression(node)) {
                    var exp = node;
                    var type = checker.getTypeAtLocation(exp.expression);
                    var typeNameMatch = regex_typename.exec(checker.typeToString(type, undefined, ts.TypeFormatFlags.UseFullyQualifiedType));
                    //
                    // Check if the regex matched and the class is in our list
                    //
                    if (typeNameMatch && requireCloneClasses.includes(typeNameMatch[1])) {
                        if (requireCloneMembers.includes(exp.name.text)) {
                            //
                            // Replace `vector.add(...)` with `vector.clone().add(...)`
                            // Use `ts.factory` for creating AST nodes
                            //
                            return ts.factory.createPropertyAccessExpression(ts.factory.createCallExpression(ts.factory.createPropertyAccessExpression(exp.expression, ts.factory.createIdentifier("clone")), undefined, []), exp.name);
                        }
                    }
                }
            }
            // `context`がこのスコープで利用可能になった
            return ts.visitEachChild(node, visitor, context);
        };
        // Transformer<SourceFile>が期待する (sourceFile: SourceFile) => SourceFile という型に合わせる
        return function (sourceFile) { return ts.visitNode(sourceFile, visitor); };
    };
};
exports.default = transformerFactory;
