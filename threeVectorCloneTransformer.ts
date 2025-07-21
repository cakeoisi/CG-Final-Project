/*
 * This file is licensed under the MIT License.
 * Copyright 2020 twinkfrag
 * Repository: https://github.com/twinkfrag/three-vector-auto-clone
 */

import * as path from "path";
import * as ts from "typescript";

// "import(*)"を除いたTypeName
const regex_typename = new RegExp(/^(?:import\(.*?\)\.)?(.*)$/);
// エントリーポイントより外側(node_modules等)を除外
const regex_filename = new RegExp(/^(?!\.{2}).*/);
const requireCloneClasses = [
    "THREE.Vector2",
    "THREE.Vector3",
    "THREE.Vector4",
];
// setXXを除いた，thisを返すメンバを指定
const requireCloneMembers = [
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

const transformerFactory = (program: ts.Program): ts.TransformerFactory<ts.SourceFile> => {
    return (context: ts.TransformationContext) => {

        const checker = program.getTypeChecker();

        const visitor = (node: ts.Node): ts.VisitResult<ts.Node> => {
            // 現在処理中のsourceFileを取るがundefinedなことがある
            const sourceFile = node.getSourceFile();
            if (sourceFile && regex_filename.test(path.relative(program.getCurrentDirectory(), sourceFile.fileName))) {

                if (ts.isPropertyAccessExpression(node)) {
                    const exp = node;

                    const type = checker.getTypeAtLocation(exp.expression);
                    const typeNameMatch = regex_typename.exec(checker.typeToString(type, undefined, ts.TypeFormatFlags.UseFullyQualifiedType));

                    //
                    // Check if the regex matched and the class is in our list
                    //
                    if (typeNameMatch && requireCloneClasses.includes(typeNameMatch[1])) {
                        if (requireCloneMembers.includes(exp.name.text)) {
                            //
                            // Replace `vector.add(...)` with `vector.clone().add(...)`
                            // Use `ts.factory` for creating AST nodes
                            //
                            return ts.factory.createPropertyAccessExpression(
                                ts.factory.createCallExpression(
                                    ts.factory.createPropertyAccessExpression(
                                        exp.expression,
                                        ts.factory.createIdentifier("clone")
                                    ),
                                    undefined,
                                    []
                                ),
                                exp.name
                            );
                        }
                    }
                }
            }
            // `context`がこのスコープで利用可能になった
            return ts.visitEachChild(node, visitor, context);
        };

        // Transformer<SourceFile>が期待する (sourceFile: SourceFile) => SourceFile という型に合わせる
        return (sourceFile: ts.SourceFile) => ts.visitNode(sourceFile, visitor) as ts.SourceFile;
    };
};

export default transformerFactory;
