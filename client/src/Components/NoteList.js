import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition,  TransitionGroup } from 'react-transition-group';
// import { v4 as uuid } from 'uuid';
import { connect } from 'react-redux';
import { getItems, deleteItem, editItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import {
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
 } from 'reactstrap';

class NoteList extends Component {
    componentDidMount() {
        this.props.getItems();
    };

    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    };
 
    // Edit item
    state = {
        modal: false,
        name:  ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const editItem = {
            name: this.state.name
        }

        // edit item via editItem action
        this.props.editItem(editItem);

        // Close modal
        this.toggle();
    }

    render() {
        // eslint-disable-next-line
        const { items } = this.props.item;
        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="note-list">
                        {items.map(({ _id, name }) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button 
                                        className="remove-btn" 
                                        color="danger" 
                                        size="sm" 
                                        onClick={this.onDeleteClick.bind(this, _id)}
                                        >&times;</Button>
                                    <Button 
                                        className="edit-btn" 
                                        color="success" 
                                        size="sm" 
                                        onClick={this.toggle}
                                        >edit</Button> 

<Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Edit Note List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Edit Item</Label>
                                <Input 
                                    type="text"
                                    name="name"
                                    id="item"
                                    // value={name}
                                    onChange={this.onChange}
            
                                />
                                <Button
                                    className="edit-btn"
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block
                                >Edit Item</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>

                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }

}

NoteList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item
});

export default connect(
    mapStateToProps,
    { getItems, deleteItem, editItem }
    )(NoteList);
