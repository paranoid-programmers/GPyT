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
            questions: [
                {
                    uuid: "123",
                    title: "Question 1",
                    description: "Description 1",
                    partial_code: {
                        code: "print('Hello World')",
                        language: "python",
                    },
                    expected_output: "Hello World",
                },
                {
                    uuid: "1234",
                    title: "Question 2",
                    description: "Description 2",
                    partial_code: {
                        code: "print('Hello World')",
                        language: "python",
                    },
                    expected_output: "Hello World",
                },
            ],
        });
    }
}

// TODO: Replace this with a real API wrapper
export { mockApiWrapper as api }
