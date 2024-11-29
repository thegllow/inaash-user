export interface Video {
    id: string
    video_url: string
    logo: string
    title: string
    description: string
    length: string
    deleted_at: null
    questions: Question[]
    scenes: Scene[]
}

export interface Question {
    id: string
    video_id: string
    question: string
    answers_a: string
    answers_b: string
    answers_c: string
    answers_d: string
    correct_answer: string
    allowed_time: string
    appears_at: string
    wrong_answer_audio_urls: WrongAnswerAudioUrls
}

export interface WrongAnswerAudioUrls {
    answer_a: string
    answer_b: string
    answer_c: string
    answer_d: string
}

export interface Scene {
    id: string
    video_id: string
    logo: string
    start_time: string
    length: string
    end_time: string
}