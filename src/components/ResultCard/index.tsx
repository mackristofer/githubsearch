import './styles.css';

type Props = {
    title?: string;
    description?: string;
    url?: string;
}

const ResultCard = ({ title, description, url }: Props) => {

    return (
        <div className="result-container">
            <div className="img-container"><img src={url} alt={title} /> </div>
            <div>
                <h3 className="result-title">{title}</h3>
                <p className="result-description">{description}</p>
            </div>
        </div>
    )
};

export default ResultCard;