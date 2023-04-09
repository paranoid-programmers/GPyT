/**
 * api
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * OpenAPI spec version: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { CodeBlock } from '../models/CodeBlock';
import { HttpFile } from '../http/http';

export class CodeQuestion {
    'title': string;
    'description': string;
    'concept': string;
    'isFlagged'?: boolean;
    'skeletonCode': CodeBlock;
    'solutionCode': CodeBlock;
    'testCases': string;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "title",
            "baseName": "title",
            "type": "string",
            "format": ""
        },
        {
            "name": "description",
            "baseName": "description",
            "type": "string",
            "format": ""
        },
        {
            "name": "concept",
            "baseName": "concept",
            "type": "string",
            "format": ""
        },
        {
            "name": "isFlagged",
            "baseName": "is_flagged",
            "type": "boolean",
            "format": ""
        },
        {
            "name": "skeletonCode",
            "baseName": "skeleton_code",
            "type": "CodeBlock",
            "format": ""
        },
        {
            "name": "solutionCode",
            "baseName": "solution_code",
            "type": "CodeBlock",
            "format": ""
        },
        {
            "name": "testCases",
            "baseName": "test_cases",
            "type": "string",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return CodeQuestion.attributeTypeMap;
    }

    public constructor() {
    }
}
