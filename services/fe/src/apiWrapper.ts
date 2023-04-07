// client that wraps the API

import { NewTutorialRequest, NewTutorialResponse } from "./models";

export interface ApiWrapper {
    getNewTutorial(request: NewTutorialRequest): Promise<NewTutorialResponse>;
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
                    },
                    "345": {
                        title: "Question 2: Even more fake question lol",
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
}

// TODO: Replace this with a real API wrapper
export { mockApiWrapper as api }
