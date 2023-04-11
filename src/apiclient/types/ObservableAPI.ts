import { ResponseContext, RequestContext, HttpFile } from '../http/http';
import { Configuration} from '../configuration'
import { Observable, of, from } from '../rxjsStub';
import {mergeMap, map} from  '../rxjsStub';
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
import { OAuthLoginRequest } from '../models/OAuthLoginRequest';
import { OAuthLoginResponse } from '../models/OAuthLoginResponse';
import { PositiveAffirmationRequest } from '../models/PositiveAffirmationRequest';
import { PositiveAffirmationResponse } from '../models/PositiveAffirmationResponse';
import { ReportQuestionRequest } from '../models/ReportQuestionRequest';
import { ReportQuestionResponse } from '../models/ReportQuestionResponse';
import { TutorialContext } from '../models/TutorialContext';
import { UniqueCodeQuestion } from '../models/UniqueCodeQuestion';
import { ValidationError } from '../models/ValidationError';

import { AuthApiRequestFactory, AuthApiResponseProcessor} from "../apis/AuthApi";
export class ObservableAuthApi {
    private requestFactory: AuthApiRequestFactory;
    private responseProcessor: AuthApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: AuthApiRequestFactory,
        responseProcessor?: AuthApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new AuthApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new AuthApiResponseProcessor();
    }

    /**
     * Login Via Oauth
     * @param oAuthLoginRequest 
     */
    public loginViaOauthApiV1AuthLoginViaOauthPost(oAuthLoginRequest: OAuthLoginRequest, _options?: Configuration): Observable<OAuthLoginResponse> {
        const requestContextPromise = this.requestFactory.loginViaOauthApiV1AuthLoginViaOauthPost(oAuthLoginRequest, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.loginViaOauthApiV1AuthLoginViaOauthPost(rsp)));
            }));
    }

    /**
     * Protected
     * @param token 
     */
    public protectedApiV1AuthProtectedGet(token: string, _options?: Configuration): Observable<any> {
        const requestContextPromise = this.requestFactory.protectedApiV1AuthProtectedGet(token, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.protectedApiV1AuthProtectedGet(rsp)));
            }));
    }

}

import { CodeTutorialApiRequestFactory, CodeTutorialApiResponseProcessor} from "../apis/CodeTutorialApi";
export class ObservableCodeTutorialApi {
    private requestFactory: CodeTutorialApiRequestFactory;
    private responseProcessor: CodeTutorialApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: CodeTutorialApiRequestFactory,
        responseProcessor?: CodeTutorialApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new CodeTutorialApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new CodeTutorialApiResponseProcessor();
    }

    /**
     * Affirmation
     * @param positiveAffirmationRequest 
     */
    public affirmationApiV1CodeTutorialAffirmationPost(positiveAffirmationRequest: PositiveAffirmationRequest, _options?: Configuration): Observable<PositiveAffirmationResponse> {
        const requestContextPromise = this.requestFactory.affirmationApiV1CodeTutorialAffirmationPost(positiveAffirmationRequest, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.affirmationApiV1CodeTutorialAffirmationPost(rsp)));
            }));
    }

    /**
     * Give Up
     * @param giveUpRequest 
     */
    public giveUpApiV1CodeTutorialGiveUpPost(giveUpRequest: GiveUpRequest, _options?: Configuration): Observable<GiveUpResponse> {
        const requestContextPromise = this.requestFactory.giveUpApiV1CodeTutorialGiveUpPost(giveUpRequest, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.giveUpApiV1CodeTutorialGiveUpPost(rsp)));
            }));
    }

    /**
     * Give Up
     * @param moreQuestionsRequest 
     */
    public giveUpApiV1CodeTutorialMoreQuestionsPost(moreQuestionsRequest: MoreQuestionsRequest, _options?: Configuration): Observable<MoreQuestionsResponse> {
        const requestContextPromise = this.requestFactory.giveUpApiV1CodeTutorialMoreQuestionsPost(moreQuestionsRequest, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.giveUpApiV1CodeTutorialMoreQuestionsPost(rsp)));
            }));
    }

    /**
     * Give Up
     * @param reportQuestionRequest 
     */
    public giveUpApiV1CodeTutorialReportQuestionPost(reportQuestionRequest: ReportQuestionRequest, _options?: Configuration): Observable<ReportQuestionResponse> {
        const requestContextPromise = this.requestFactory.giveUpApiV1CodeTutorialReportQuestionPost(reportQuestionRequest, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.giveUpApiV1CodeTutorialReportQuestionPost(rsp)));
            }));
    }

    /**
     * Hint
     * @param hintRequest 
     */
    public hintApiV1CodeTutorialHintPost(hintRequest: HintRequest, _options?: Configuration): Observable<HintResponse> {
        const requestContextPromise = this.requestFactory.hintApiV1CodeTutorialHintPost(hintRequest, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.hintApiV1CodeTutorialHintPost(rsp)));
            }));
    }

    /**
     * New Code Tutorial
     * @param newTutorialRequest 
     */
    public newCodeTutorialApiV1CodeTutorialNewCodeTutorialPost(newTutorialRequest: NewTutorialRequest, _options?: Configuration): Observable<NewCodeTutorialResponse> {
        const requestContextPromise = this.requestFactory.newCodeTutorialApiV1CodeTutorialNewCodeTutorialPost(newTutorialRequest, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.newCodeTutorialApiV1CodeTutorialNewCodeTutorialPost(rsp)));
            }));
    }

}

import { DefaultApiRequestFactory, DefaultApiResponseProcessor} from "../apis/DefaultApi";
export class ObservableDefaultApi {
    private requestFactory: DefaultApiRequestFactory;
    private responseProcessor: DefaultApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: DefaultApiRequestFactory,
        responseProcessor?: DefaultApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new DefaultApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new DefaultApiResponseProcessor();
    }

    /**
     * Check if the service is alive, always returns true
     * Alive
     */
    public aliveApiV1AliveGet(_options?: Configuration): Observable<boolean> {
        const requestContextPromise = this.requestFactory.aliveApiV1AliveGet(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.aliveApiV1AliveGet(rsp)));
            }));
    }

}
