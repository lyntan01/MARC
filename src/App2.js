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
            result: ""
        };
    }

    handleChange = (event) => {
        const value = event.target.files[0];
        const name = event.target.name;
        var formData = this.state.formData;
        this.setState({
            formData
        });
    }

    handlePredictClick = (event) => {
        const formData = this.state.formData;
        console.log(formData); // debugging
        this.setState({ isLoading: true });
        fetch('http://127.0.0.1:5000/prediction/',
            {
                //   headers: {
                //     'Accept': 'application/json',
                //     'Content-Type': 'application/json'
                //   },
                method: 'POST',
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    result: response.result,
                    isLoading: false
                });
                console.log(response);
            });
    }

    handleCancelClick = (event) => {
        this.setState({ result: "" });
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);

        const Upload = async () => {
            await fetch('/prediction', {
                method: 'POST',
                body: formData
            }).then(resp => {
                resp.json().then(data => { console.log(data) })
            })
        }
        Upload();
    }

    render() {
        const isLoading = this.state.isLoading;
        const formData = this.state.formData;
        const result = this.state.result;

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
                                    class="form-control-file"
                                    name="imagefield"
                                    required
                                    accept="image/*"
                                    value={formData.imagefield}
                                    onChange={this.handleChange} />
                            </Form.Group>
                        </Form.Row>

                        <Row>
                            <Col>
                                <Button
                                    block
                                    type="submit"
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
                            </Col>
                        </Row>)
                    }
                </div>
            </Container>
        );
    }
}

export default App;