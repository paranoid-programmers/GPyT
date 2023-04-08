// client that wraps the API

import {
    NewTutorialRequest,
    NewTutorialResponse,
    HintRequest,
    HintResponse,
    GiveUpRequest,
    GiveUpResponse,
} from "./models";

export interface ApiWrapper {
    getNewTutorial(request: NewTutorialRequest): Promise<NewTutorialResponse>;
    getHint(request: HintRequest): Promise<HintResponse>;
    giveUp(request: GiveUpRequest): Promise<GiveUpResponse>;
}


export class mockApiWrapper implements ApiWrapper {
    constructor() {
        console.log("API Wrapper initialized");
    }

    getNewTutorial(request: NewTutorialRequest): Promise<NewTutorialResponse> {
        return Promise.resolve({
            uuid: "12",
            tutorial: {
                questions: {
                    "234": {
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
                    "345": {
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
}

// TODO: Replace this with a real API wrapper
export { mockApiWrapper as api }
