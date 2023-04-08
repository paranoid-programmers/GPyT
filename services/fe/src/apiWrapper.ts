// client that wraps the API

import {
    NewTutorialRequest,
    NewTutorialResponse,
    HintRequest,
    HintResponse,
} from "./models";

export interface ApiWrapper {
    getNewTutorial(request: NewTutorialRequest): Promise<NewTutorialResponse>;
    getHint(request: HintRequest): Promise<HintResponse>;
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
            hint_text: "This is a fake hint",
        });
    }
}

// TODO: Replace this with a real API wrapper
export { mockApiWrapper as api }
