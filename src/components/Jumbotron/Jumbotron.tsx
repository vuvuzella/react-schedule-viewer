import { Container } from 'react-bootstrap';

interface IJumbotron {
    title: string
    description: string
}

export function Jumbotron({ title, description }: IJumbotron) {
    return (
        <div className="p-3 mb-2 bg-light rounded-3">
            <Container fluid="md" className="py-3">
                <h1>{title}</h1>
                <p>{description}</p>
            </Container>
        </div>
    )
}
