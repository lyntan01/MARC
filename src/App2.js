import React, { Component } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            formData: {
                imagefield: null,
            },
            result: "",
            points: 0
        };
    }

    handleChange = (event) => {
        const value = URL.createObjectURL(event.target.files[0]);
        const name = event.target.name;
        var formData = this.state.formData;
        formData[name] = value;
        this.setState({
            formData
        });
    }

    handlePredictClick = (event) => {
        const formData = this.state.formData;
        console.log(formData); // debugging
        this.setState({ isLoading: true });
        fetch('/prediction',
            {
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                method: 'POST',
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    result: response.result,
                    points: response.points,
                    isLoading: false
                });
                console.log(response);
            });
    }

    handleCancelClick = (event) => {
        this.setState({ result: "" });
    }

    render() {
        const isLoading = this.state.isLoading;
        const formData = this.state.formData;
        const result = this.state.result;
        const points = this.state.points;

        return (
            <Container>
                <div>
                    <h1 className="title">Massive Automated <br /> Recycling Classification</h1>
                </div>
                <div className="content">
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formFile">
                                <Form.Label>Upload image of trash item</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="imagefield"
                                    required
                                    accept="image/*"
                                    // value={formData.imagefield}
                                    onChange={this.handleChange} />
                            </Form.Group>
                        </Form.Row>

                        <Row>
                            <Col>
                                <Button
                                    block
                                    // type="submit"
                                    variant="success"
                                    disabled={isLoading}
                                    onClick={!isLoading ? this.handlePredictClick : null}>
                                    {isLoading ? 'Making prediction' : 'Predict'}
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    block
                                    variant="danger"
                                    disabled={isLoading}
                                    onClick={this.handleCancelClick}>
                                    Reset prediction
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    {result === "" ? null :
                        (<Row>
                            <Col className="result-container">
                                <h5 id="result">{result}</h5>
                                <h5 id="points">{points}</h5>
                            </Col>
                        </Row>)
                    }
                </div>
            </Container>
        );
    }
}

export default App;