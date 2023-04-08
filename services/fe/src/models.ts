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
    questions: Record<string, CodeQuestion>;
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

export interface HintRequest {
    question: CodeQuestion;
    context: QuestionContext;
}

export interface HintResponse {
    hint_text: string;
}

export interface GiveUpRequest {
    context: QuestionContext;
    full_code: CodeBlock;
}

export interface GiveUpResponse {
    example_solution: string;
    explanation: string;
    additional_info: string;
}

export interface PositiveAffirmationRequest {
    // Context?
    full_code: CodeBlock;
}


export interface PositiveAffirmationResponse {
    happy_text: string;
}

export interface ReportQuestionRequest {
    uuid: string;
    category: string;
    details: string;
    should_regenerate: boolean;
}

export interface ReportQuestionResponse {
    question?: CodeQuestion;
}
