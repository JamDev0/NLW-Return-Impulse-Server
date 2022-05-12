export interface FeedbackCreateValues {
    Type: string;
    Comment: string;
    Screenshot?: string;
}

export interface FeedbackRepository {
    create: (data: FeedbackCreateValues) => Promise<void>;
}