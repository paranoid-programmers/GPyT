// Core stuff

export interface CodeBlock {
    code: string;
    language: string;
}

export interface CodeQuestion {
    title: string;
    description: string;
    skeleton_code: CodeBlock;
    solution_code: CodeBlock;
    test_cases: any[][];
}

export interface Tutorial {
    questions: CodeQuestion[];
}

export interface QuestionContext {
    theme: string;
}


// API stuff
export interface NewTutorialRequest {
    context: QuestionContext;
    concept: string;
}

export interface NewTutorialResponse {
    uuid: string;
    tutorial: Tutorial;
}
