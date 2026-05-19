import { Psychologist } from "../../types/psychologist";

type PsychologistCardProps = {
    psychologist: Psychologist;
    isFavoriteActionDisabled: boolean;
    onToggleFavorite: (psychologist: Psychologist) => void;
    isFavorite: boolean;
};

export default function PsychologistCard({
    psychologist,
    isFavoriteActionDisabled,
    onToggleFavorite,
    isFavorite,
}: PsychologistCardProps) {
    return (
        <article>
            <h2>{psychologist.name}</h2>
            <p>Experience: {psychologist.experience}</p>
            <p>License: {psychologist.license}</p>
            <p>Initial consultation: {psychologist.initial_consultation}</p>
            <p>Specialization: {psychologist.specialization}</p>
            <p>Rating: {psychologist.rating} / 5</p>
            <p>Price per hour: ${psychologist.price_per_hour}</p>
            <button type="button">Read more</button>
            <button type="button"
                disabled={isFavoriteActionDisabled}
                onClick={() => onToggleFavorite(psychologist)}>
                {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </button>
            <hr />
        </article>
    );
}
