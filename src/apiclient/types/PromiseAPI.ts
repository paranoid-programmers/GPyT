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
import { ObservableAuthApi } from './ObservableAPI';

import { AuthApiRequestFactory, AuthApiResponseProcessor} from "../apis/AuthApi";
export class PromiseAuthApi {
    private api: ObservableAuthApi

    public constructor(
        configuration: Configuration,
        requestFactory?: AuthApiRequestFactory,
        responseProcessor?: AuthApiResponseProcessor
    ) {
        this.api = new ObservableAuthApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Login Via Github
     */
    public loginViaGithubApiV1AuthLoginViaGithubPost(_options?: Configuration): Promise<any> {
        const result = this.api.loginViaGithubApiV1AuthLoginViaGithubPost(_options);
        return result.toPromise();
    }

    /**
     * Protected
     * @param token 
     */
    public protectedApiV1AuthProtectedGet(token: string, _options?: Configuration): Promise<any> {
        const result = this.api.protectedApiV1AuthProtectedGet(token, _options);
        return result.toPromise();
    }


}



import { ObservableCodeTutorialApi } from './ObservableAPI';

import { CodeTutorialApiRequestFactory, CodeTutorialApiResponseProcessor} from "../apis/CodeTutorialApi";
export class PromiseCodeTutorialApi {
    private api: ObservableCodeTutorialApi

    public constructor(
        configuration: Configuration,
        requestFactory?: CodeTutorialApiRequestFactory,
        responseProcessor?: CodeTutorialApiResponseProcessor
    ) {
        this.api = new ObservableCodeTutorialApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Affirmation
     * @param positiveAffirmationRequest 
     */
    public affirmationApiV1CodeTutorialAffirmationPost(positiveAffirmationRequest: PositiveAffirmationRequest, _options?: Configuration): Promise<PositiveAffirmationResponse> {
        const result = this.api.affirmationApiV1CodeTutorialAffirmationPost(positiveAffirmationRequest, _options);
        return result.toPromise();
    }

    /**
     * Give Up
     * @param giveUpRequest 
     */
    public giveUpApiV1CodeTutorialGiveUpPost(giveUpRequest: GiveUpRequest, _options?: Configuration): Promise<GiveUpResponse> {
        const result = this.api.giveUpApiV1CodeTutorialGiveUpPost(giveUpRequest, _options);
        return result.toPromise();
    }

    /**
     * Give Up
     * @param moreQuestionsRequest 
     */
    public giveUpApiV1CodeTutorialMoreQuestionsPost(moreQuestionsRequest: MoreQuestionsRequest, _options?: Configuration): Promise<MoreQuestionsResponse> {
        const result = this.api.giveUpApiV1CodeTutorialMoreQuestionsPost(moreQuestionsRequest, _options);
        return result.toPromise();
    }

    /**
     * Give Up
     * @param reportQuestionRequest 
     */
    public giveUpApiV1CodeTutorialReportQuestionPost(reportQuestionRequest: ReportQuestionRequest, _options?: Configuration): Promise<ReportQuestionResponse> {
        const result = this.api.giveUpApiV1CodeTutorialReportQuestionPost(reportQuestionRequest, _options);
        return result.toPromise();
    }

    /**
     * Hint
     * @param hintRequest 
     */
    public hintApiV1CodeTutorialHintPost(hintRequest: HintRequest, _options?: Configuration): Promise<HintResponse> {
        const result = this.api.hintApiV1CodeTutorialHintPost(hintRequest, _options);
        return result.toPromise();
    }

    /**
     * New Code Tutorial
     * @param newTutorialRequest 
     */
    public newCodeTutorialApiV1CodeTutorialNewCodeTutorialPost(newTutorialRequest: NewTutorialRequest, _options?: Configuration): Promise<NewCodeTutorialResponse> {
        const result = this.api.newCodeTutorialApiV1CodeTutorialNewCodeTutorialPost(newTutorialRequest, _options);
        return result.toPromise();
    }


}



import { ObservableDefaultApi } from './ObservableAPI';

import { DefaultApiRequestFactory, DefaultApiResponseProcessor} from "../apis/DefaultApi";
export class PromiseDefaultApi {
    private api: ObservableDefaultApi

    public constructor(
        configuration: Configuration,
        requestFactory?: DefaultApiRequestFactory,
        responseProcessor?: DefaultApiResponseProcessor
    ) {
        this.api = new ObservableDefaultApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Check if the service is alive, always returns true
     * Alive
     */
    public aliveApiV1AliveGet(_options?: Configuration): Promise<boolean> {
        const result = this.api.aliveApiV1AliveGet(_options);
        return result.toPromise();
    }


}



