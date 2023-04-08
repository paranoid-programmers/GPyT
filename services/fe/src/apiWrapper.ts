// client that wraps the API

import {
    NewTutorialRequest,
    NewTutorialResponse,
    HintRequest,
    HintResponse,
    GiveUpRequest,
    GiveUpResponse,
    PositiveAffirmationRequest,
    PositiveAffirmationResponse,
    ReportQuestionRequest,
    ReportQuestionResponse,
} from "./models";

import * as apiclient from "gpyt";

const config = apiclient.createConfiguration({
    baseServer: {
        makeRequestContext: (endpoint: string, httpMethod: apiclient.HttpMethod) => {
            return new apiclient.RequestContext(
                `http://localhost:3000${endpoint}`,
                httpMethod,
            );
        }
    }
})

const api = new apiclient.CodeApi(config)
const resp = api.giveUpApiV1CodeTutorialGiveUpPost({
    questionUuid: "0d498d08-abfe-46f0-9021-91071039c405",
    tutorialUuid: "4d16e0d1-ce8c-4c1b-b25b-e877509b7eca",
    userCode: {
        code: "print('jerome loves windows')",
        language: "python",
    }
}).then((resp) => {
    console.log(resp)
})

export interface ApiWrapper {
    getNewTutorial(request: NewTutorialRequest): Promise<NewTutorialResponse>;
    getHint(request: HintRequest): Promise<HintResponse>;
    giveUp(request: GiveUpRequest): Promise<GiveUpResponse>;
    getPositiveAffirmation(request: PositiveAffirmationRequest): Promise<PositiveAffirmationResponse>;
    reportQuestion(request: ReportQuestionRequest): Promise<ReportQuestionResponse>;
}

export class mockApiWrapper implements ApiWrapper {
    id_counter: number;
    constructor() {
        console.log("API Wrapper initialized");
        this.id_counter = 0;
    }

    getNewTutorial(request: NewTutorialRequest): Promise<NewTutorialResponse> {
        return Promise.resolve({
            uuid: `${this.id_counter++}`,
            tutorial: {
                questions: {
                    [`${this.id_counter++}`]: {
                        title: `Question 1: Fake question about ${request.concept}`,
                        description: `Do some list stuff, in the theme of ${request.context.theme}`,
                        skeleton_code: {
                            code: "print('Hello World')",
                            language: "python",
                        },
                        solution_code: {
                            code: "print('Hello World')",
                            language: "python",
                        },
                        test_cases: [],
                    },
                    [`${this.id_counter++}`]: {
                        title: `Question 2: more ${request.context.theme}`,
                        description: `But it's still about ${request.concept}`,
                        skeleton_code: {
                            code: "print('Hello World')",
                            language: "python",
                        },
                        solution_code: {
                            code: "print('Hello World')",
                            language: "python",
                        },
                        test_cases: [],
                    },
                },
            },
        });
    }

    getHint(request: HintRequest): Promise<HintResponse> {
        return Promise.resolve({
            hint_text: `This is a fake hint, but it's about ${request.question.title}`,
        });
    }

    giveUp(request: GiveUpRequest): Promise<GiveUpResponse> {
        return Promise.resolve({
            example_solution: "print('Hello World')",
            explanation: "This is a fake explanation",
            additional_info: "This is fake additional info",
        });
    }

    getPositiveAffirmation(request: PositiveAffirmationRequest): Promise<PositiveAffirmationResponse> {
        return Promise.resolve({
            happy_text: "This is a fake affirmation",
        });
    }

    reportQuestion(request: ReportQuestionRequest): Promise<ReportQuestionResponse> {
        if (request.should_regenerate) {
            return Promise.resolve({
                question: {
                    title: "New question 1",
                    description: "Do some list stuff",
                    skeleton_code: {
                        code: "print('Hello World')",
                        language: "python",
                    },
                    solution_code: {
                        code: "print('Hello World')",
                        language: "python",
                    },
                    test_cases: [],
                }
            });
        } else {
            return Promise.resolve({});
        }
    }
}

// TODO: Replace this with a real API wrapper
export { mockApiWrapper as api }
