export default interface Candidate {
    readonly avatar_url: string | null;
    readonly login: string;
    readonly location: string | null;
    readonly email: string | null;
    readonly company: string | null;
    readonly bio: string | null;
}