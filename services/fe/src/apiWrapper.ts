// client that wraps the API

import { NewTutorialRequest, NewTutorialResponse } from "./types";

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
                questions: [
                    {
                        title: "Question 1",
                        description: "Description 1",
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
                    {
                        title: "Question 2",
                        description: "Description 2",
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
                ],
            },
        });
    }
}

// TODO: Replace this with a real API wrapper
export { mockApiWrapper as api }
