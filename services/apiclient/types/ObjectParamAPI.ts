import { ResponseContext, RequestContext, HttpFile } from '../http/http';
import { Configuration} from '../configuration'

import { CodeBlock } from '../models/CodeBlock';
import { CodeQuestion } from '../models/CodeQuestion';
import { CodeTutorial } from '../models/CodeTutorial';
import { GiveUpRequest } from '../models/GiveUpRequest';
import { GiveUpResponse } from '../models/GiveUpResponse';
import { HTTPValidationError } from '../models/HTTPValidationError';
import { HintRequest } from '../models/HintRequest';
import { HintResponse } from '../models/HintResponse';
import { LocationInner } from '../models/LocationInner';
import { MoreQuestionsRequest } from '../models/MoreQuestionsRequest';
import { MoreQuestionsResponse } from '../models/MoreQuestionsResponse';
import { NewCodeTutorialResponse } from '../models/NewCodeTutorialResponse';
import { NewTutorialRequest } from '../models/NewTutorialRequest';
import { PositiveAffirmationRequest } from '../models/PositiveAffirmationRequest';
import { PositiveAffirmationResponse } from '../models/PositiveAffirmationResponse';
import { ReportQuestionRequest } from '../models/ReportQuestionRequest';
import { ReportQuestionResponse } from '../models/ReportQuestionResponse';
import { TutorialContext } from '../models/TutorialContext';
import { UniqueCodeQuestion } from '../models/UniqueCodeQuestion';
import { ValidationError } from '../models/ValidationError';

import { ObservableAuthApi } from "./ObservableAPI";
import { AuthApiRequestFactory, AuthApiResponseProcessor} from "../apis/AuthApi";

export interface AuthApiLoginViaGithubApiV1AuthLoginViaGithubPostRequest {
}

export interface AuthApiProtectedApiV1AuthProtectedGetRequest {
    /**
     * 
     * @type string
     * @memberof AuthApiprotectedApiV1AuthProtectedGet
     */
    token: string
}

export class ObjectAuthApi {
    private api: ObservableAuthApi

    public constructor(configuration: Configuration, requestFactory?: AuthApiRequestFactory, responseProcessor?: AuthApiResponseProcessor) {
        this.api = new ObservableAuthApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Login Via Github
     * @param param the request object
     */
    public loginViaGithubApiV1AuthLoginViaGithubPost(param: AuthApiLoginViaGithubApiV1AuthLoginViaGithubPostRequest = {}, options?: Configuration): Promise<any> {
        return this.api.loginViaGithubApiV1AuthLoginViaGithubPost( options).toPromise();
    }

    /**
     * Protected
     * @param param the request object
     */
    public protectedApiV1AuthProtectedGet(param: AuthApiProtectedApiV1AuthProtectedGetRequest, options?: Configuration): Promise<any> {
        return this.api.protectedApiV1AuthProtectedGet(param.token,  options).toPromise();
    }

}

import { ObservableCodeTutorialApi } from "./ObservableAPI";
import { CodeTutorialApiRequestFactory, CodeTutorialApiResponseProcessor} from "../apis/CodeTutorialApi";

export interface CodeTutorialApiAffirmationApiV1CodeTutorialAffirmationPostRequest {
    /**
     * 
     * @type PositiveAffirmationRequest
     * @memberof CodeTutorialApiaffirmationApiV1CodeTutorialAffirmationPost
     */
    positiveAffirmationRequest: PositiveAffirmationRequest
}

export interface CodeTutorialApiGiveUpApiV1CodeTutorialGiveUpPostRequest {
    /**
     * 
     * @type GiveUpRequest
     * @memberof CodeTutorialApigiveUpApiV1CodeTutorialGiveUpPost
     */
    giveUpRequest: GiveUpRequest
}

export interface CodeTutorialApiGiveUpApiV1CodeTutorialMoreQuestionsPostRequest {
    /**
     * 
     * @type MoreQuestionsRequest
     * @memberof CodeTutorialApigiveUpApiV1CodeTutorialMoreQuestionsPost
     */
    moreQuestionsRequest: MoreQuestionsRequest
}

export interface CodeTutorialApiGiveUpApiV1CodeTutorialReportQuestionPostRequest {
    /**
     * 
     * @type ReportQuestionRequest
     * @memberof CodeTutorialApigiveUpApiV1CodeTutorialReportQuestionPost
     */
    reportQuestionRequest: ReportQuestionRequest
}

export interface CodeTutorialApiHintApiV1CodeTutorialHintPostRequest {
    /**
     * 
     * @type HintRequest
     * @memberof CodeTutorialApihintApiV1CodeTutorialHintPost
     */
    hintRequest: HintRequest
}

export interface CodeTutorialApiNewCodeTutorialApiV1CodeTutorialNewCodeTutorialPostRequest {
    /**
     * 
     * @type NewTutorialRequest
     * @memberof CodeTutorialApinewCodeTutorialApiV1CodeTutorialNewCodeTutorialPost
     */
    newTutorialRequest: NewTutorialRequest
}

export class ObjectCodeTutorialApi {
    private api: ObservableCodeTutorialApi

    public constructor(configuration: Configuration, requestFactory?: CodeTutorialApiRequestFactory, responseProcessor?: CodeTutorialApiResponseProcessor) {
        this.api = new ObservableCodeTutorialApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Affirmation
     * @param param the request object
     */
    public affirmationApiV1CodeTutorialAffirmationPost(param: CodeTutorialApiAffirmationApiV1CodeTutorialAffirmationPostRequest, options?: Configuration): Promise<PositiveAffirmationResponse> {
        return this.api.affirmationApiV1CodeTutorialAffirmationPost(param.positiveAffirmationRequest,  options).toPromise();
    }

    /**
     * Give Up
     * @param param the request object
     */
    public giveUpApiV1CodeTutorialGiveUpPost(param: CodeTutorialApiGiveUpApiV1CodeTutorialGiveUpPostRequest, options?: Configuration): Promise<GiveUpResponse> {
        return this.api.giveUpApiV1CodeTutorialGiveUpPost(param.giveUpRequest,  options).toPromise();
    }

    /**
     * Give Up
     * @param param the request object
     */
    public giveUpApiV1CodeTutorialMoreQuestionsPost(param: CodeTutorialApiGiveUpApiV1CodeTutorialMoreQuestionsPostRequest, options?: Configuration): Promise<MoreQuestionsResponse> {
        return this.api.giveUpApiV1CodeTutorialMoreQuestionsPost(param.moreQuestionsRequest,  options).toPromise();
    }

    /**
     * Give Up
     * @param param the request object
     */
    public giveUpApiV1CodeTutorialReportQuestionPost(param: CodeTutorialApiGiveUpApiV1CodeTutorialReportQuestionPostRequest, options?: Configuration): Promise<ReportQuestionResponse> {
        return this.api.giveUpApiV1CodeTutorialReportQuestionPost(param.reportQuestionRequest,  options).toPromise();
    }

    /**
     * Hint
     * @param param the request object
     */
    public hintApiV1CodeTutorialHintPost(param: CodeTutorialApiHintApiV1CodeTutorialHintPostRequest, options?: Configuration): Promise<HintResponse> {
        return this.api.hintApiV1CodeTutorialHintPost(param.hintRequest,  options).toPromise();
    }

    /**
     * New Code Tutorial
     * @param param the request object
     */
    public newCodeTutorialApiV1CodeTutorialNewCodeTutorialPost(param: CodeTutorialApiNewCodeTutorialApiV1CodeTutorialNewCodeTutorialPostRequest, options?: Configuration): Promise<NewCodeTutorialResponse> {
        return this.api.newCodeTutorialApiV1CodeTutorialNewCodeTutorialPost(param.newTutorialRequest,  options).toPromise();
    }

}

import { ObservableDefaultApi } from "./ObservableAPI";
import { DefaultApiRequestFactory, DefaultApiResponseProcessor} from "../apis/DefaultApi";

export interface DefaultApiAliveApiV1AliveGetRequest {
}

export class ObjectDefaultApi {
    private api: ObservableDefaultApi

    public constructor(configuration: Configuration, requestFactory?: DefaultApiRequestFactory, responseProcessor?: DefaultApiResponseProcessor) {
        this.api = new ObservableDefaultApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Check if the service is alive, always returns true
     * Alive
     * @param param the request object
     */
    public aliveApiV1AliveGet(param: DefaultApiAliveApiV1AliveGetRequest = {}, options?: Configuration): Promise<boolean> {
        return this.api.aliveApiV1AliveGet( options).toPromise();
    }

}
