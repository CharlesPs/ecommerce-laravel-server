
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons'

import './ProductEditor.scss'

const ProductEditor = (props: any) => {

    const [ row, setRow ] = useState(props.row)

    useEffect(() => {

        setRow(props.row)
    }, [ props.row ])

    const handleField = (field: string, value: any) => {

        const _row = { ...row }
        _row[field] = value

        setRow(_row)
    }

    const handleSave = () => {

        props.onSave(row)
    }

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            dialogClassName="product-editor"
            backdrop="static"
            // keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {!row.id ? 'Crear nuevo producto' : `${row.name}`}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>Nombre</Form.Label>
                        <Col sm={8} md={7} lg={6}>
                            <Form.Control
                                type="text"
                                placeholder="Nombre del producto"
                                value={row.name}
                                onChange={(e: any) => handleField('name', e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>Descripción</Form.Label>
                        <Col sm={8} md={7} lg={6}>
                            <Form.Control
                                as="textarea"
                                placeholder="Descripción del producto"
                                value={row.description}
                                onChange={(e: any) => handleField('description', e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>Precio</Form.Label>
                        <Col sm={2}>
                            <Form.Control
                                type="text"
                                placeholder="0"
                                className="text-end"
                                value={row.price}
                                onChange={(e: any) => handleField('price', e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    <FontAwesomeIcon icon={faTimes} /> Cancelar
                </Button>
                <Button variant="primary" onClick={() => handleSave()} disabled={props.saving}>
                    <FontAwesomeIcon icon={faSave} /> {props.saving ? 'Guardando...' : 'Guardar'}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ProductEditor
