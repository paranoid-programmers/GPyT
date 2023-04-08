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
import { TestCasesInner } from '../models/TestCasesInner';
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

import { ObservableCodeApi } from "./ObservableAPI";
import { CodeApiRequestFactory, CodeApiResponseProcessor} from "../apis/CodeApi";

export interface CodeApiAffirmationApiV1CodeTutorialAffirmationPostRequest {
    /**
     * 
     * @type PositiveAffirmationRequest
     * @memberof CodeApiaffirmationApiV1CodeTutorialAffirmationPost
     */
    positiveAffirmationRequest: PositiveAffirmationRequest
}

export interface CodeApiGiveUpApiV1CodeTutorialGiveUpPostRequest {
    /**
     * 
     * @type GiveUpRequest
     * @memberof CodeApigiveUpApiV1CodeTutorialGiveUpPost
     */
    giveUpRequest: GiveUpRequest
}

export interface CodeApiGiveUpApiV1CodeTutorialMoreQuestionsPostRequest {
    /**
     * 
     * @type MoreQuestionsRequest
     * @memberof CodeApigiveUpApiV1CodeTutorialMoreQuestionsPost
     */
    moreQuestionsRequest: MoreQuestionsRequest
}

export interface CodeApiGiveUpApiV1CodeTutorialReportQuestionPostRequest {
    /**
     * 
     * @type ReportQuestionRequest
     * @memberof CodeApigiveUpApiV1CodeTutorialReportQuestionPost
     */
    reportQuestionRequest: ReportQuestionRequest
}

export interface CodeApiHintApiV1CodeTutorialHintPostRequest {
    /**
     * 
     * @type HintRequest
     * @memberof CodeApihintApiV1CodeTutorialHintPost
     */
    hintRequest: HintRequest
}

export interface CodeApiNewCodeTutorialApiV1CodeTutorialNewCodeTutorialPostRequest {
    /**
     * 
     * @type NewTutorialRequest
     * @memberof CodeApinewCodeTutorialApiV1CodeTutorialNewCodeTutorialPost
     */
    newTutorialRequest: NewTutorialRequest
}

export class ObjectCodeApi {
    private api: ObservableCodeApi

    public constructor(configuration: Configuration, requestFactory?: CodeApiRequestFactory, responseProcessor?: CodeApiResponseProcessor) {
        this.api = new ObservableCodeApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Affirmation
     * @param param the request object
     */
    public affirmationApiV1CodeTutorialAffirmationPost(param: CodeApiAffirmationApiV1CodeTutorialAffirmationPostRequest, options?: Configuration): Promise<PositiveAffirmationResponse> {
        return this.api.affirmationApiV1CodeTutorialAffirmationPost(param.positiveAffirmationRequest,  options).toPromise();
    }

    /**
     * Give Up
     * @param param the request object
     */
    public giveUpApiV1CodeTutorialGiveUpPost(param: CodeApiGiveUpApiV1CodeTutorialGiveUpPostRequest, options?: Configuration): Promise<GiveUpResponse> {
        return this.api.giveUpApiV1CodeTutorialGiveUpPost(param.giveUpRequest,  options).toPromise();
    }

    /**
     * Give Up
     * @param param the request object
     */
    public giveUpApiV1CodeTutorialMoreQuestionsPost(param: CodeApiGiveUpApiV1CodeTutorialMoreQuestionsPostRequest, options?: Configuration): Promise<MoreQuestionsResponse> {
        return this.api.giveUpApiV1CodeTutorialMoreQuestionsPost(param.moreQuestionsRequest,  options).toPromise();
    }

    /**
     * Give Up
     * @param param the request object
     */
    public giveUpApiV1CodeTutorialReportQuestionPost(param: CodeApiGiveUpApiV1CodeTutorialReportQuestionPostRequest, options?: Configuration): Promise<ReportQuestionResponse> {
        return this.api.giveUpApiV1CodeTutorialReportQuestionPost(param.reportQuestionRequest,  options).toPromise();
    }

    /**
     * Hint
     * @param param the request object
     */
    public hintApiV1CodeTutorialHintPost(param: CodeApiHintApiV1CodeTutorialHintPostRequest, options?: Configuration): Promise<HintResponse> {
        return this.api.hintApiV1CodeTutorialHintPost(param.hintRequest,  options).toPromise();
    }

    /**
     * New Code Tutorial
     * @param param the request object
     */
    public newCodeTutorialApiV1CodeTutorialNewCodeTutorialPost(param: CodeApiNewCodeTutorialApiV1CodeTutorialNewCodeTutorialPostRequest, options?: Configuration): Promise<NewCodeTutorialResponse> {
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

import { ObservableTutorialApi } from "./ObservableAPI";
import { TutorialApiRequestFactory, TutorialApiResponseProcessor} from "../apis/TutorialApi";

export interface TutorialApiAffirmationApiV1CodeTutorialAffirmationPostRequest {
    /**
     * 
     * @type PositiveAffirmationRequest
     * @memberof TutorialApiaffirmationApiV1CodeTutorialAffirmationPost
     */
    positiveAffirmationRequest: PositiveAffirmationRequest
}

export interface TutorialApiGiveUpApiV1CodeTutorialGiveUpPostRequest {
    /**
     * 
     * @type GiveUpRequest
     * @memberof TutorialApigiveUpApiV1CodeTutorialGiveUpPost
     */
    giveUpRequest: GiveUpRequest
}

export interface TutorialApiGiveUpApiV1CodeTutorialMoreQuestionsPostRequest {
    /**
     * 
     * @type MoreQuestionsRequest
     * @memberof TutorialApigiveUpApiV1CodeTutorialMoreQuestionsPost
     */
    moreQuestionsRequest: MoreQuestionsRequest
}

export interface TutorialApiGiveUpApiV1CodeTutorialReportQuestionPostRequest {
    /**
     * 
     * @type ReportQuestionRequest
     * @memberof TutorialApigiveUpApiV1CodeTutorialReportQuestionPost
     */
    reportQuestionRequest: ReportQuestionRequest
}

export interface TutorialApiHintApiV1CodeTutorialHintPostRequest {
    /**
     * 
     * @type HintRequest
     * @memberof TutorialApihintApiV1CodeTutorialHintPost
     */
    hintRequest: HintRequest
}

export interface TutorialApiNewCodeTutorialApiV1CodeTutorialNewCodeTutorialPostRequest {
    /**
     * 
     * @type NewTutorialRequest
     * @memberof TutorialApinewCodeTutorialApiV1CodeTutorialNewCodeTutorialPost
     */
    newTutorialRequest: NewTutorialRequest
}

export class ObjectTutorialApi {
    private api: ObservableTutorialApi

    public constructor(configuration: Configuration, requestFactory?: TutorialApiRequestFactory, responseProcessor?: TutorialApiResponseProcessor) {
        this.api = new ObservableTutorialApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Affirmation
     * @param param the request object
     */
    public affirmationApiV1CodeTutorialAffirmationPost(param: TutorialApiAffirmationApiV1CodeTutorialAffirmationPostRequest, options?: Configuration): Promise<PositiveAffirmationResponse> {
        return this.api.affirmationApiV1CodeTutorialAffirmationPost(param.positiveAffirmationRequest,  options).toPromise();
    }

    /**
     * Give Up
     * @param param the request object
     */
    public giveUpApiV1CodeTutorialGiveUpPost(param: TutorialApiGiveUpApiV1CodeTutorialGiveUpPostRequest, options?: Configuration): Promise<GiveUpResponse> {
        return this.api.giveUpApiV1CodeTutorialGiveUpPost(param.giveUpRequest,  options).toPromise();
    }

    /**
     * Give Up
     * @param param the request object
     */
    public giveUpApiV1CodeTutorialMoreQuestionsPost(param: TutorialApiGiveUpApiV1CodeTutorialMoreQuestionsPostRequest, options?: Configuration): Promise<MoreQuestionsResponse> {
        return this.api.giveUpApiV1CodeTutorialMoreQuestionsPost(param.moreQuestionsRequest,  options).toPromise();
    }

    /**
     * Give Up
     * @param param the request object
     */
    public giveUpApiV1CodeTutorialReportQuestionPost(param: TutorialApiGiveUpApiV1CodeTutorialReportQuestionPostRequest, options?: Configuration): Promise<ReportQuestionResponse> {
        return this.api.giveUpApiV1CodeTutorialReportQuestionPost(param.reportQuestionRequest,  options).toPromise();
    }

    /**
     * Hint
     * @param param the request object
     */
    public hintApiV1CodeTutorialHintPost(param: TutorialApiHintApiV1CodeTutorialHintPostRequest, options?: Configuration): Promise<HintResponse> {
        return this.api.hintApiV1CodeTutorialHintPost(param.hintRequest,  options).toPromise();
    }

    /**
     * New Code Tutorial
     * @param param the request object
     */
    public newCodeTutorialApiV1CodeTutorialNewCodeTutorialPost(param: TutorialApiNewCodeTutorialApiV1CodeTutorialNewCodeTutorialPostRequest, options?: Configuration): Promise<NewCodeTutorialResponse> {
        return this.api.newCodeTutorialApiV1CodeTutorialNewCodeTutorialPost(param.newTutorialRequest,  options).toPromise();
    }

}
