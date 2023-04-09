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

export class HintRequest {
    'tutorialUuid': string;
    'questionUuid': string;
    'userCode': CodeBlock;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "tutorialUuid",
            "baseName": "tutorial_uuid",
            "type": "string",
            "format": "uuid"
        },
        {
            "name": "questionUuid",
            "baseName": "question_uuid",
            "type": "string",
            "format": "uuid"
        },
        {
            "name": "userCode",
            "baseName": "user_code",
            "type": "CodeBlock",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return HintRequest.attributeTypeMap;
    }

    public constructor() {
    }
}
