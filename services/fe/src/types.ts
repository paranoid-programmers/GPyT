export interface CodeBlock {
    code: string;
    language: string;
}

export interface Question {
    uuid: string; // Assuming UUID is in string format
    title: string;
    description: string;
    partial_code: CodeBlock;
    expected_output: string;
}

export interface PythonConcept {
    name: string;
}

export interface QuestionContext {
    theme: string;
}

export interface NewTutorialRequest {
    context: QuestionContext;
    concepts_to_learn: PythonConcept[];
}

export interface NewTutorialResponse {
    uuid: string; // Assuming UUID is in string format
    questions: Question[];
}

export interface PositiveAffirmationRequest {
    context: QuestionContext;
    full_code: CodeBlock;
}

export interface PositiveAffirmationResponse {
    happy_text: string;
}

export interface HintRequest {
    context: QuestionContext;
    full_code: CodeBlock;
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

export interface MoreQuestionsRequest {
    tutorial_uuid: string; // Assuming UUID is in string format
}

export interface MoreQuestionsResponse {
    questions: Question[];
}

export interface ReportQuestionRequest {
    question_uuid: string; // Assuming UUID is in string format
    category: string;
    details: string;
    should_regenerate: boolean;
}

export interface ReportQuestionResponse {
    question: Question;
}
