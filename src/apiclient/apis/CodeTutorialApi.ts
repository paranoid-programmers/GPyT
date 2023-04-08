// TODO: better import syntax?
import {BaseAPIRequestFactory, RequiredError, COLLECTION_FORMATS} from './baseapi';
import {Configuration} from '../configuration';
import {RequestContext, HttpMethod, ResponseContext, HttpFile} from '../http/http';
import {ObjectSerializer} from '../models/ObjectSerializer';
import {ApiException} from './exception';
import {canConsumeForm, isCodeInRange} from '../util';
import {SecurityAuthentication} from '../auth/auth';


import { GiveUpRequest } from '../models/GiveUpRequest';
import { GiveUpResponse } from '../models/GiveUpResponse';
import { HTTPValidationError } from '../models/HTTPValidationError';
import { HintRequest } from '../models/HintRequest';
import { HintResponse } from '../models/HintResponse';
import { MoreQuestionsRequest } from '../models/MoreQuestionsRequest';
import { MoreQuestionsResponse } from '../models/MoreQuestionsResponse';
import { NewCodeTutorialResponse } from '../models/NewCodeTutorialResponse';
import { NewTutorialRequest } from '../models/NewTutorialRequest';
import { PositiveAffirmationRequest } from '../models/PositiveAffirmationRequest';
import { PositiveAffirmationResponse } from '../models/PositiveAffirmationResponse';
import { ReportQuestionRequest } from '../models/ReportQuestionRequest';
import { ReportQuestionResponse } from '../models/ReportQuestionResponse';

/**
 * no description
 */
export class CodeTutorialApiRequestFactory extends BaseAPIRequestFactory {

    /**
     * Affirmation
     * @param positiveAffirmationRequest 
     */
    public async affirmationApiV1CodeTutorialAffirmationPost(positiveAffirmationRequest: PositiveAffirmationRequest, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'positiveAffirmationRequest' is not null or undefined
        if (positiveAffirmationRequest === null || positiveAffirmationRequest === undefined) {
            throw new RequiredError("CodeTutorialApi", "affirmationApiV1CodeTutorialAffirmationPost", "positiveAffirmationRequest");
        }


        // Path Params
        const localVarPath = '/api/v1/code-tutorial/affirmation';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(positiveAffirmationRequest, "PositiveAffirmationRequest", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Give Up
     * @param giveUpRequest 
     */
    public async giveUpApiV1CodeTutorialGiveUpPost(giveUpRequest: GiveUpRequest, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'giveUpRequest' is not null or undefined
        if (giveUpRequest === null || giveUpRequest === undefined) {
            throw new RequiredError("CodeTutorialApi", "giveUpApiV1CodeTutorialGiveUpPost", "giveUpRequest");
        }


        // Path Params
        const localVarPath = '/api/v1/code-tutorial/give-up';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(giveUpRequest, "GiveUpRequest", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Give Up
     * @param moreQuestionsRequest 
     */
    public async giveUpApiV1CodeTutorialMoreQuestionsPost(moreQuestionsRequest: MoreQuestionsRequest, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'moreQuestionsRequest' is not null or undefined
        if (moreQuestionsRequest === null || moreQuestionsRequest === undefined) {
            throw new RequiredError("CodeTutorialApi", "giveUpApiV1CodeTutorialMoreQuestionsPost", "moreQuestionsRequest");
        }


        // Path Params
        const localVarPath = '/api/v1/code-tutorial/more-questions';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(moreQuestionsRequest, "MoreQuestionsRequest", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Give Up
     * @param reportQuestionRequest 
     */
    public async giveUpApiV1CodeTutorialReportQuestionPost(reportQuestionRequest: ReportQuestionRequest, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'reportQuestionRequest' is not null or undefined
        if (reportQuestionRequest === null || reportQuestionRequest === undefined) {
            throw new RequiredError("CodeTutorialApi", "giveUpApiV1CodeTutorialReportQuestionPost", "reportQuestionRequest");
        }


        // Path Params
        const localVarPath = '/api/v1/code-tutorial/report-question';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(reportQuestionRequest, "ReportQuestionRequest", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Hint
     * @param hintRequest 
     */
    public async hintApiV1CodeTutorialHintPost(hintRequest: HintRequest, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'hintRequest' is not null or undefined
        if (hintRequest === null || hintRequest === undefined) {
            throw new RequiredError("CodeTutorialApi", "hintApiV1CodeTutorialHintPost", "hintRequest");
        }


        // Path Params
        const localVarPath = '/api/v1/code-tutorial/hint';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(hintRequest, "HintRequest", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * New Code Tutorial
     * @param newTutorialRequest 
     */
    public async newCodeTutorialApiV1CodeTutorialNewCodeTutorialPost(newTutorialRequest: NewTutorialRequest, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'newTutorialRequest' is not null or undefined
        if (newTutorialRequest === null || newTutorialRequest === undefined) {
            throw new RequiredError("CodeTutorialApi", "newCodeTutorialApiV1CodeTutorialNewCodeTutorialPost", "newTutorialRequest");
        }


        // Path Params
        const localVarPath = '/api/v1/code-tutorial/new-code-tutorial';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(newTutorialRequest, "NewTutorialRequest", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

}

export class CodeTutorialApiResponseProcessor {

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to affirmationApiV1CodeTutorialAffirmationPost
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async affirmationApiV1CodeTutorialAffirmationPost(response: ResponseContext): Promise<PositiveAffirmationResponse > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: PositiveAffirmationResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PositiveAffirmationResponse", ""
            ) as PositiveAffirmationResponse;
            return body;
        }
        if (isCodeInRange("422", response.httpStatusCode)) {
            const body: HTTPValidationError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "HTTPValidationError", ""
            ) as HTTPValidationError;
            throw new ApiException<HTTPValidationError>(response.httpStatusCode, "Validation Error", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: PositiveAffirmationResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "PositiveAffirmationResponse", ""
            ) as PositiveAffirmationResponse;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to giveUpApiV1CodeTutorialGiveUpPost
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async giveUpApiV1CodeTutorialGiveUpPost(response: ResponseContext): Promise<GiveUpResponse > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: GiveUpResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "GiveUpResponse", ""
            ) as GiveUpResponse;
            return body;
        }
        if (isCodeInRange("422", response.httpStatusCode)) {
            const body: HTTPValidationError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "HTTPValidationError", ""
            ) as HTTPValidationError;
            throw new ApiException<HTTPValidationError>(response.httpStatusCode, "Validation Error", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: GiveUpResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "GiveUpResponse", ""
            ) as GiveUpResponse;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to giveUpApiV1CodeTutorialMoreQuestionsPost
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async giveUpApiV1CodeTutorialMoreQuestionsPost(response: ResponseContext): Promise<MoreQuestionsResponse > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: MoreQuestionsResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "MoreQuestionsResponse", ""
            ) as MoreQuestionsResponse;
            return body;
        }
        if (isCodeInRange("422", response.httpStatusCode)) {
            const body: HTTPValidationError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "HTTPValidationError", ""
            ) as HTTPValidationError;
            throw new ApiException<HTTPValidationError>(response.httpStatusCode, "Validation Error", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: MoreQuestionsResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "MoreQuestionsResponse", ""
            ) as MoreQuestionsResponse;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to giveUpApiV1CodeTutorialReportQuestionPost
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async giveUpApiV1CodeTutorialReportQuestionPost(response: ResponseContext): Promise<ReportQuestionResponse > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ReportQuestionResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ReportQuestionResponse", ""
            ) as ReportQuestionResponse;
            return body;
        }
        if (isCodeInRange("422", response.httpStatusCode)) {
            const body: HTTPValidationError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "HTTPValidationError", ""
            ) as HTTPValidationError;
            throw new ApiException<HTTPValidationError>(response.httpStatusCode, "Validation Error", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ReportQuestionResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ReportQuestionResponse", ""
            ) as ReportQuestionResponse;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to hintApiV1CodeTutorialHintPost
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async hintApiV1CodeTutorialHintPost(response: ResponseContext): Promise<HintResponse > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: HintResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "HintResponse", ""
            ) as HintResponse;
            return body;
        }
        if (isCodeInRange("422", response.httpStatusCode)) {
            const body: HTTPValidationError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "HTTPValidationError", ""
            ) as HTTPValidationError;
            throw new ApiException<HTTPValidationError>(response.httpStatusCode, "Validation Error", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: HintResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "HintResponse", ""
            ) as HintResponse;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to newCodeTutorialApiV1CodeTutorialNewCodeTutorialPost
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async newCodeTutorialApiV1CodeTutorialNewCodeTutorialPost(response: ResponseContext): Promise<NewCodeTutorialResponse > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: NewCodeTutorialResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "NewCodeTutorialResponse", ""
            ) as NewCodeTutorialResponse;
            return body;
        }
        if (isCodeInRange("422", response.httpStatusCode)) {
            const body: HTTPValidationError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "HTTPValidationError", ""
            ) as HTTPValidationError;
            throw new ApiException<HTTPValidationError>(response.httpStatusCode, "Validation Error", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: NewCodeTutorialResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "NewCodeTutorialResponse", ""
            ) as NewCodeTutorialResponse;
            return body;
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

}
